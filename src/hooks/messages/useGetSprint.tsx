import { useQuery } from '@/hooks/useQuery';

import { useContract } from '@/context/contract/ContractContextProvider';

import { CONTRACT_MESSAGES } from '@/types/enums';
import { GetSprintInput } from '@/types/schemaTypes';

export const useGetTaskInfo = (initialArgValues: GetSprintInput) => {
  const { contract } = useContract();

  const messageInfo = contract?.abi?.findMessage(CONTRACT_MESSAGES.GET_SPRINT);

  return useQuery<GetSprintInput>(messageInfo, {
    initialArgValues,
    skip: !initialArgValues.projectId,
  });
};
