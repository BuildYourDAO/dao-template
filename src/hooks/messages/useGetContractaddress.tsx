import { useQuery } from '@/hooks/useQuery';

import { useContract } from '@/context/contract/ContractContextProvider';

import { CONTRACT_MESSAGES } from '@/types/enums';

export const useGetContractAddress = () => {
  const { contract } = useContract();

  const messageInfo = contract?.abi?.findMessage(
    CONTRACT_MESSAGES.GET_DAO_CONTRACT_ADDRESS
  );

  return useQuery<string>(messageInfo);
};
