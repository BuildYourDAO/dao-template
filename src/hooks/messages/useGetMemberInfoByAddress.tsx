import { IGetMember } from '@/hooks/messages';
import { useQuery } from '@/hooks/useQuery';

import { useContract } from '@/context/contract/ContractContextProvider';

import { CONTRACT_MESSAGES } from '@/types/enums';
import { getMemberInfoByAddressInput } from '@/types/schemaTypes';

export const useGetMemberInfoByAddress = (
  initialArgValues: getMemberInfoByAddressInput
) => {
  const { contract } = useContract();

  const messageInfo = contract?.abi?.findMessage(
    CONTRACT_MESSAGES.GET_MEMBER_INFO_BY_ADDRESS
  );

  return useQuery<{ Ok: IGetMember }, getMemberInfoByAddressInput>(
    messageInfo,
    {
      initialArgValues,
      skip: !initialArgValues.memberAddress,
    }
  );
};
