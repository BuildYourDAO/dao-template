import { IGetDaoInfoList } from '@/hooks/messages';
import { useQuery } from '@/hooks/useQuery';

import { useContract } from '@/context/contract/ContractContextProvider';

import { CONTRACT_MESSAGES } from '@/types/enums';

export const useGetStakedDaoList = () => {
  const { contract } = useContract();

  const messageInfo = contract?.abi?.findMessage(
    CONTRACT_MESSAGES.GET_STAKED_DAO_LIST
  );

  return useQuery<null | IGetDaoInfoList>(messageInfo);
};
