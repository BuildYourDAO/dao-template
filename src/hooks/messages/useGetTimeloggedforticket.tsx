import { IGetMember } from '@/hooks/messages';
import { useQuery } from '@/hooks/useQuery';

import { useContract } from '@/context/contract/ContractContextProvider';

import { CONTRACT_MESSAGES } from '@/types/enums';
import { GetTimeLoggedInput } from '@/types/schemaTypes';

export const useGetMembersTimeLog = (initialArgValues: GetTimeLoggedInput) => {
  const { contract } = useContract();

  const projectList = contract?.abi?.findMessage(
    CONTRACT_MESSAGES.GET_TIME_LOGGED_DATA_FOR_TICKET
  );

  return useQuery<{ Ok: IGetMember }, GetTimeLoggedInput>(projectList, {
    initialArgValues,
    skip: !initialArgValues.ticketId,
  });
};
