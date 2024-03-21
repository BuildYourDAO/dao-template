import { useQuery } from '@/hooks/useQuery';

import { useContract } from '@/context/contract/ContractContextProvider';

import { CONTRACT_MESSAGES } from '@/types/enums';
export interface IGetToken {
  tokenType: string;
  tokenAddress: string;
}

export type IGetTokenList = IGetToken[];
export const useGetTokenList = () => {
  const { contract } = useContract();

  const messageInfo = contract?.abi?.findMessage(
    CONTRACT_MESSAGES.GET_TOKEN_LIST
  );

  return useQuery<IGetTokenList>(messageInfo);
};
