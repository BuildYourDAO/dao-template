import { Abi, ContractPromise } from '@polkadot/api-contract';
import { createContext } from 'react';

import {
  AbiMessage,
  ContractExecResult,
  ContractOptions,
  ISubmittableResult,
  QueryMessageProps,
} from '@/types';

export interface ContractContextType {
  contract: ContractPromise;
  callMessage: <T>(
    message: AbiMessage,
    contractOptions: ContractOptions,
    argValues: T,
    cb: (result: ISubmittableResult) => unknown
  ) => Promise<void>;
  queryMessage: (...args: QueryMessageProps[]) => Promise<ContractExecResult>;
  contractLoading: boolean;
  handleSetContract: (
    address: string,
    abi: string | Abi | Record<string, unknown>
  ) => { success: boolean };
}

const ContractContextValues = {} as ContractContextType;

export const ContractContext = createContext<ContractContextType>(
  ContractContextValues
);
