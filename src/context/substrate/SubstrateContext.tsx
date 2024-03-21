import { ApiPromise } from '@polkadot/api';
import { keyring as Keyring } from '@polkadot/ui-keyring';
import { KeyringAddress } from '@polkadot/ui-keyring/types';
import { createContext } from 'react';

import { ApiChainProps } from '@/helpers/api/types';
export interface SubstrateState {
  [key: string]: unknown;
  socket: string;
  jsonrpc: unknown;
  keyring: typeof Keyring;
  keyringState: string;
  api: ApiPromise;
  apiError: string;
  apiState: string;
  accounts: KeyringAddress[];
  currentAccount?: KeyringAddress;
  chainProps: ApiChainProps;
}

export interface SubstrateContextType {
  state: SubstrateState;
  setCurrentAccount: (account?: KeyringAddress) => void;
  logout: () => void;
}

const SubstrateContextValues: SubstrateContextType =
  {} as unknown as SubstrateContextType;

export const SubstrateContext = createContext<SubstrateContextType>(
  SubstrateContextValues
);
