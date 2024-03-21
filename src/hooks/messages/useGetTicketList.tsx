import { useQuery } from '@/hooks/useQuery';

import { useContract } from '@/context/contract/ContractContextProvider';

import { CONTRACT_MESSAGES } from '@/types/enums';

export interface IGetTicket {
  ticketId: string;
  projectId: string;
  name: string;
  creator: string | null;
  ticketStatus: string | null;
  assignedTo: string | null;
  taskType: string;
  startTime: string;
  endTime: string;
  review: string | null;
  totaltimeloggedin: string;
  ticketDescription: string;
}
export type IGetTicketList = IGetTicket[];
export const useGetTicketList = () => {
  const { contract } = useContract();

  const messageInfo = contract?.abi?.findMessage(
    CONTRACT_MESSAGES.GET_TICKET_LIST
  );

  return useQuery<IGetTicketList>(messageInfo);
};
