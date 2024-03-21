import { ApiPromise, WsProvider } from '@polkadot/api';
import { WeightV2 } from '@polkadot/types/interfaces';
// import { TypeRegistry } from '@polkadot/types/create';
import { keyring as Keyring } from '@polkadot/ui-keyring';
import { KeyringAddress } from '@polkadot/ui-keyring/types';
import { isTestChain } from '@polkadot/util';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useReducer } from 'react';

import { getFromLocalStorage, removeFromLocalStorage } from '@/lib/helper';

import {
  SubstrateContext,
  SubstrateState,
} from '@/context/substrate/SubstrateContext';
import { getChainProperties } from '@/helpers/api/apiChainProperties';

import {
  APP_NAME,
  LOCAL_STORAGE_ADDRESS_KEY,
  PROVIDER_SOCKET,
} from '../../config';

// const registry = new TypeRegistry();

///
// Reducer function for `useReducer`

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const reducer = (
  state: SubstrateState,
  action: { type: string; payload?: SubstrateState }
): SubstrateState => {
  switch (action.type) {
    case 'CONNECT_INIT':
      return { ...state, apiState: 'CONNECT_INIT' };
    case 'CONNECT':
      return { ...state, api: action.payload!.api, apiState: 'CONNECTING' };
    case 'CONNECT_SUCCESS':
      return { ...state, apiState: 'READY' };
    case 'CONNECT_ERROR':
      return {
        ...state,
        apiState: 'ERROR',
        apiError: action.payload!.apiError,
      };
    case 'LOAD_KEYRING':
      return { ...state, keyringState: 'LOADING' };
    case 'SET_KEYRING':
      return {
        ...state,
        keyring: action.payload!.keyring,
        accounts: action.payload!.accounts,
        chainProps: action.payload!.chainProps,
        ...(action.payload!.currentAccount
          ? { currentAccount: action.payload!.currentAccount }
          : {}),
        keyringState: 'READY',
      };
    case 'KEYRING_ERROR':
      return { ...state, keyringState: 'ERROR' };
    case 'SET_CURRENT_ACCOUNT':
      return { ...state, currentAccount: action.payload!.currentAccount };
    default:
      throw new Error(`Unknown type: ${action.type}`);
  }
};

///
// Connecting to the Substrate node

const connect = async (
  state: SubstrateState,
  dispatch: React.Dispatch<{ type: string; payload?: SubstrateState }>
) => {
  const { apiState } = state;
  // We only want this function to be performed once
  if (apiState) return;

  dispatch({ type: 'CONNECT_INIT' });

  const wsProvider = new WsProvider(PROVIDER_SOCKET);
  const _api = await ApiPromise.create({ provider: wsProvider });

  await _api.isReady;

  _api.registry.createType<WeightV2>('Weight').proofSize;

  dispatch({ type: 'CONNECT', payload: { ...state, api: _api } });
  dispatch({ type: 'CONNECT_SUCCESS' });

  // Set listeners for disconnection and reconnection event.
  // _api.on('connected', () => {
  //   dispatch({ type: 'CONNECT', payload: _api });
  //   // `ready` event is not emitted upon reconnection and is checked explicitly here.
  //   _api.isReady.then((_api) => dispatch({ type: 'CONNECT_SUCCESS' }));
  // });
  _api.on('ready', () => dispatch({ type: 'CONNECT_SUCCESS' }));
  _api.on('error', (err) => dispatch({ type: 'CONNECT_ERROR', payload: err }));
};

// const retrieveChainInfo = async (api: ApiPromise) => {
//   const [systemChain, systemChainType] = await Promise.all([
//     api.rpc.system.chain(),
//     api.rpc.system.chainType
//       ? api.rpc.system.chainType()
//       : Promise.resolve(registry.createType('ChainType', 'Live')),
//   ]);

//   return {
//     systemChain: (systemChain || '<unknown>').toString(),
//     systemChainType,
//   };
// };

///
// Loading accounts from dev and polkadot-js extension
const loadAccounts = (
  state: SubstrateState,
  dispatch: React.Dispatch<{ type: string; payload?: SubstrateState }>
) => {
  const { api } = state;
  dispatch({ type: 'LOAD_KEYRING' });

  const asyncLoadAccounts = async () => {
    try {
      const { web3Accounts, web3Enable } = await import(
        '@polkadot/extension-dapp'
      );
      await web3Enable(APP_NAME);
      const allAccounts = await web3Accounts();

      const accounts = allAccounts.map(
        ({ address, meta, type }) =>
          ({
            type,
            address,
            meta: { ...meta, name: `${meta.name} (${meta.source})` },
          } as unknown)
      ) as KeyringAddress[];

      // Logics to check if the connecting chain is a dev chain, coming from polkadot-js Apps
      // ref: https://github.com/polkadot-js/apps/blob/15b8004b2791eced0dde425d5dc7231a5f86c682/packages/react-api/src/Api.tsx?_pjax=div%5Bitemtype%3D%22http%3A%2F%2Fschema.org%2FSoftwareSourceCode%22%5D%20%3E%20main#L101-L110
      const chainProps = await getChainProperties(api);
      const isDevelopment = isTestChain(chainProps.systemChain);

      Keyring.loadAll({ isDevelopment }, accounts);

      const allLoadedAccounts = Keyring.getAccounts();

      const address = getFromLocalStorage(LOCAL_STORAGE_ADDRESS_KEY);

      const previousAccount = address
        ? allLoadedAccounts.find((account) => account.address === address)
        : null;

      if (previousAccount) {
        const web3Acc = accounts.find(
          (acc) => acc.address === previousAccount.address
        );

        previousAccount.meta.source = web3Acc?.meta.source || 'polkadot-js';
      }

      console.log('allLoadasd ', allLoadedAccounts);

      dispatch({
        type: 'SET_KEYRING',
        payload: {
          ...state,
          keyring: Keyring,
          accounts: Keyring.getAccounts(),
          ...(previousAccount ? { currentAccount: previousAccount } : {}),
          chainProps,
        },
      });
    } catch (e) {
      dispatch({ type: 'KEYRING_ERROR' });
    }
  };
  asyncLoadAccounts();
};

let keyringLoadAll = false;

interface SubstrateContextProviderProps {
  children: React.ReactNode | null;
  [key: string]: unknown;
}

const SubstrateContextProvider = (props: SubstrateContextProviderProps) => {
  const [state, dispatch] = useReducer(reducer, {} as SubstrateState);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined' && state.apiState === undefined)
      connect(state, dispatch);
  }, [state]);

  useEffect(() => {
    const { apiState, keyringState } = state;

    if (apiState === 'READY' && !keyringState && !keyringLoadAll) {
      keyringLoadAll = true;
      loadAccounts(state, dispatch);
    }
  }, [state, dispatch]);

  function setCurrentAccount(acct?: KeyringAddress) {
    dispatch({
      type: 'SET_CURRENT_ACCOUNT',
      payload: { ...state, currentAccount: acct },
    });
  }

  const logout = () => {
    setCurrentAccount(undefined as unknown as KeyringAddress);
    removeFromLocalStorage(LOCAL_STORAGE_ADDRESS_KEY);
    router.push('/login');
  };

  return (
    <SubstrateContext.Provider value={{ state, setCurrentAccount, logout }}>
      {props.children}
    </SubstrateContext.Provider>
  );
};

// prop typechecking
SubstrateContextProvider.propTypes = {
  socket: PropTypes.string,
};

const useSubstrate = () => useContext(SubstrateContext);
const useSubstrateState = () => useContext(SubstrateContext).state;

export { SubstrateContextProvider, useSubstrate, useSubstrateState };
