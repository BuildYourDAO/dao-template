import { IGetTicket } from '@/hooks/messages/useGetTicketList';
import { useQuery } from '@/hooks/useQuery';

import { useContract } from '@/context/contract/ContractContextProvider';

import { CONTRACT_MESSAGES } from '@/types/enums';
import { GetTaskInfoInput } from '@/types/schemaTypes';
export const useGetTaskInfo = (initialArgValues: GetTaskInfoInput) => {
  const { contract } = useContract();

  const messageInfo = contract?.abi?.findMessage(
    CONTRACT_MESSAGES.GET_TASK_INFO
  );

  return useQuery<{ Ok: IGetTicket }, GetTaskInfoInput>(messageInfo, {
    initialArgValues,
    skip: !initialArgValues.ticketId,
  });
};
