import { useQuery } from '@/hooks/useQuery';

import { useContract } from '@/context/contract/ContractContextProvider';

import { CONTRACT_MESSAGES } from '@/types/enums';

export const useGetDaoId = () => {
  const { contract } = useContract();

  const messageInfo = contract?.abi?.findMessage(CONTRACT_MESSAGES.GET_DAO_ID);

  return useQuery<string>(messageInfo);
};
