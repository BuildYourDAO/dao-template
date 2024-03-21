import { IGetMember } from '@/hooks/messages';
import { useQuery } from '@/hooks/useQuery';

import { useContract } from '@/context/contract/ContractContextProvider';

import { CONTRACT_MESSAGES } from '@/types/enums';
import { GetMemberInfoInput } from '@/types/schemaTypes';

export const useGetMemberInfo = (initialArgValues: GetMemberInfoInput) => {
  const { contract } = useContract();

  const messageInfo = contract?.abi?.findMessage(
    CONTRACT_MESSAGES.GET_MEMBER_INFO
  );

  return useQuery<{ Ok: IGetMember }, GetMemberInfoInput>(messageInfo, {
    initialArgValues,
    skip: !initialArgValues.memberId,
  });
};
