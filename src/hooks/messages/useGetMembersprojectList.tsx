import { IGetProjectList } from '@/hooks/messages';
import { useQuery } from '@/hooks/useQuery';

import { useContract } from '@/context/contract/ContractContextProvider';

import { CONTRACT_MESSAGES } from '@/types/enums';
import { GetMembersProjectInput } from '@/types/schemaTypes';
export const useGetMembersProject = (
  initialArgValues: GetMembersProjectInput
) => {
  const { contract } = useContract();

  const projectList = contract?.abi?.findMessage(
    CONTRACT_MESSAGES.GET_PROJECT_LIST_OF_MEMBER
  );

  return useQuery<{ Ok: IGetProjectList }>(projectList, {
    initialArgValues,
    skip: !initialArgValues.memberId,
  });
};
