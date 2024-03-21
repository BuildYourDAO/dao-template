import { useQuery } from '@/hooks/useQuery';

import { useContract } from '@/context/contract/ContractContextProvider';

import { CONTRACT_MESSAGES } from '@/types/enums';

export interface IGetDaoInfo {
  daoName: string;
  description: string;
  website: string | null;
  profile: string | null;
  daoAddress: string | null;
  daoId: string;
  daoAdmin: string;
}

export const useGetDaoInfo = () => {
  const { contract } = useContract();

  const messageInfo = contract?.abi?.findMessage(
    CONTRACT_MESSAGES.GET_DAO_INFO
  );

  return useQuery<IGetDaoInfo, null>(messageInfo);
};
