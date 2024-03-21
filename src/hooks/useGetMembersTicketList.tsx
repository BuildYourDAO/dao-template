import { IGetTicketList } from '@/hooks/messages/useGetTicketList';
import { useQuery } from '@/hooks/useQuery';

import { useContract } from '@/context/contract/ContractContextProvider';

import { CONTRACT_MESSAGES } from '@/types/enums';
import { GetMemberTicketInput } from '@/types/schemaTypes';
export const useGetMembersTicket = (initialArgValues: GetMemberTicketInput) => {
  const { contract } = useContract();

  const projectList = contract?.abi?.findMessage(
    CONTRACT_MESSAGES.GET_TICKET_LIST_OF_MEMBER
  );

  return useQuery<{ Ok: IGetTicketList }, GetMemberTicketInput>(projectList, {
    initialArgValues,
    skip: !initialArgValues.memberId,
  });
};
