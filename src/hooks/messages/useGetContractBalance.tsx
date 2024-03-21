import { useQuery } from '@/hooks/useQuery';

import { useContract } from '@/context/contract/ContractContextProvider';

import { CONTRACT_MESSAGES } from '@/types/enums';

export const useGetContractBalance = () => {
  const { contract } = useContract();

  const messageInfo = contract?.abi?.findMessage(
    CONTRACT_MESSAGES.GET_CONTRACT_BALANCE
  );

  return useQuery<string>(messageInfo);
};
