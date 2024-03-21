import { IGetDaoInfo } from '@/hooks/messages/useGetDaoInfo';
import { useQuery } from '@/hooks/useQuery';

import { useContract } from '@/context/contract/ContractContextProvider';

import { CONTRACT_MESSAGES } from '@/types/enums';

export type IGetDaoInfoList = IGetDaoInfo[];

export const useGetDaoInfoList = () => {
  const { contract } = useContract();

  const messageInfo = contract?.abi?.findMessage(
    CONTRACT_MESSAGES.GET_DAO_LIST
  );

  return useQuery<null | IGetDaoInfoList>(messageInfo);
};
