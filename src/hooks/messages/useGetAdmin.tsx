import { useQuery } from '@/hooks/useQuery';

import { useContract } from '@/context/contract/ContractContextProvider';

import { CONTRACT_MESSAGES } from '@/types/enums';

export const useGetAdmin = () => {
  const { contract } = useContract();

  const messageInfo = contract?.abi?.findMessage(CONTRACT_MESSAGES.GET_ADMIN);

  return useQuery<string>(messageInfo);
};
