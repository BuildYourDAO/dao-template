import { IGetProject } from '@/hooks/messages/useGetProjectList';
import { useQuery } from '@/hooks/useQuery';

import { useContract } from '@/context/contract/ContractContextProvider';

import { CONTRACT_MESSAGES } from '@/types/enums';
import { GetProjectInput } from '@/types/schemaTypes';
export const useGetProjectInfo = (initialArgValues: GetProjectInput) => {
  const { contract } = useContract();

  const messageInfo = contract?.abi?.findMessage(
    CONTRACT_MESSAGES.GET_PROJECT_INFO
  );

  return useQuery<{ Ok: IGetProject }, GetProjectInput>(messageInfo, {
    initialArgValues,
    skip: !initialArgValues.projectId,
  });
};
