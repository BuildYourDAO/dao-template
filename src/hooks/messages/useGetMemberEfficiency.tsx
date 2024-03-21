import { useQuery } from '@/hooks/useQuery';

import { useContract } from '@/context/contract/ContractContextProvider';

import { CONTRACT_MESSAGES } from '@/types/enums';
import { GetMemberEfficiencyInput } from '@/types/schemaTypes';

export const useGetMemberEfficiency = (
  initialArgValues: GetMemberEfficiencyInput
) => {
  const { contract } = useContract();

  const messageInfo = contract?.abi?.findMessage(
    CONTRACT_MESSAGES.GET_MEMBER_INFO
  );

  return useQuery<unknown, GetMemberEfficiencyInput>(messageInfo, {
    initialArgValues,
    skip: !initialArgValues.member_address,
  });
};
