import { ContractPromise } from '@polkadot/api-contract';
import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { CONTRACT_ADDRESS } from '@/config';
import { ContractContext } from '@/context/contract/ContractContext';
import { useSubstrateState } from '@/context/substrate/SubstrateContextProvider';
import { transformUserInput } from '@/helpers/callOptions';

import data from '../../../felidaeDAO.contract.json';

import {
  AbiMessage,
  ContractExecResult,
  ContractOptions,
  ISubmittableResult,
  QueryMessageProps,
} from '@/types';

interface ContractContextProviderProps {
  children: React.ReactNode | null;
  [key: string]: unknown;
}

const ContractContextProvider = (props: ContractContextProviderProps) => {
  const { api, currentAccount, chainProps, keyring } = useSubstrateState();
  const [contract, setContract] = useState<ContractPromise>(
    {} as ContractPromise
  );
  const [contractLoading, setContractLoading] = useState(true);

  useEffect(() => {
    if (api) {
      try {
        const address = CONTRACT_ADDRESS as string;
        const contract = new ContractPromise(api, data, address);

        setContract(contract);
        setContractLoading(false);

        // eslint-disable-next-line react-hooks/exhaustive-deps
      } catch (error: unknown) {
        setContractLoading(false);
        alert(error);
      }
    }
  }, [api]);

  const callMessage = async <T,>(
    message: AbiMessage,
    contractOptions: ContractOptions,
    argValues: T,
    cb: (result: ISubmittableResult) => unknown
  ) => {
    const { web3FromSource } = await import('@polkadot/extension-dapp');

    const injector = chainProps.systemChainType.isDevelopment
      ? undefined
      : await web3FromSource(currentAccount?.meta.source as string);

    const account = chainProps.systemChainType.isDevelopment
      ? keyring.getPair(currentAccount?.address as string)
      : (currentAccount?.address as string);

    const value = contract.tx[message.method](
      contractOptions,
      ...transformUserInput(contract.registry, message.args, argValues)
    );

    // eslint-disable-next-line no-async-promise-executor
    await new Promise(async (resolve, reject) => {
      try {
        await value.signAndSend(
          account,
          {
            signer: injector?.signer || undefined,
          },
          async (result) => {
            if (result.isFinalized || result.isInBlock) {
              await cb(result);
              resolve(true);
            }
          }
        );
      } catch (error) {
        reject(error);
        toast.error('Transaction cancelled');
      }
    });
  };

  const queryMessage = async (args: QueryMessageProps) => {
    const outcome = (await api.call.contractsApi.call(
      ...Object.keys(args).map((key) => args[key as keyof QueryMessageProps])
    )) as ContractExecResult;

    return outcome;
  };

  return (
    <ContractContext.Provider
      value={{ contract, callMessage, queryMessage, contractLoading }}
    >
      {props.children}
    </ContractContext.Provider>
  );
};

const useContract = () => useContext(ContractContext);

export { ContractContext, ContractContextProvider, useContract };
