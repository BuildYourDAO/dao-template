import { ContractPromise } from '@polkadot/api-contract';
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
}

const ContractContextValues = {} as ContractContextType;

export const ContractContext = createContext<ContractContextType>(
  ContractContextValues
);
