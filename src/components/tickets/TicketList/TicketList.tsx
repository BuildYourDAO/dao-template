import Link from 'next/link';
import { useState } from 'react';
import { Button, Modal, Table } from 'react-daisyui';
import { AiOutlinePlus } from 'react-icons/ai';
import { TfiCup } from 'react-icons/tfi';

import { useGetAdmin } from '@/hooks/messages';
import {
  IGetTicket,
  IGetTicketList,
  useGetTicketList,
} from '@/hooks/messages/useGetTicketList';
import { useGetMembersTicket } from '@/hooks/useGetMembersTicketList';

import { LoadingSpinner } from '@/components/loading';
import { CreateTicket } from '@/components/tickets/CreateTicket';
import { SetConfidence } from '@/components/tickets/SetConfidence';
import { calculateAvailabilityAndEfficiency } from '@/components/tickets/TicketList/timelog';
import { UpdateTicketStatus } from '@/components/tickets/TicketStatus';

import { useSubstrateState } from '@/context/substrate/SubstrateContextProvider';
import { useUser } from '@/context/user/UserContextProvider';

interface MemberLog {
  date: string; // Date format: "YYYY-MM-DD"
  hoursLogged: number; // Hours logged by the member on that date
}

interface TicketListProps {
  children?: React.ReactNode;
}

export const TicketList: React.FC<TicketListProps> = () => {
  const { decodedOutput, loading, refetch } = useGetTicketList();
  const [createTicketModalVisible, setCreateTicketModalVisible] =
    useState(false);
  const [updateTicketModalVisible, setUpdateTicketModalVisible] =
    useState(false);
  const [setConfidenceModalVisible, setSetConfidenceModalVisible] =
    useState(false);

  const { user } = useUser();
  const { decodedOutput: getAdminDecodedOutput } = useGetAdmin();

  const { currentAccount } = useSubstrateState();

  const isAdmin = getAdminDecodedOutput?.value == currentAccount?.address;
  const logs: MemberLog[] = [
    { date: '2023-07-22', hoursLogged: 6 },
    { date: '2023-07-23', hoursLogged: 7 },
    { date: '2023-07-24', hoursLogged: 8 },
    { date: '2023-07-25', hoursLogged: 6 },
    { date: '2023-07-26', hoursLogged: 7 },
    { date: '2023-07-27', hoursLogged: 6 },
    { date: '2023-07-28', hoursLogged: 5 },
  ];

  const { availability, efficiency } = calculateAvailabilityAndEfficiency(logs);
  console.log('Availability:', availability * 100);
  console.log('Efficiency:', efficiency * 100);
  const [selectedTicket, setSelectedTicket] = useState<IGetTicket>();
  const {
    loading: getMembersTicketListLoading,
    decodedOutput: getMembersTicketListdecodeOutput,
  } = useGetMembersTicket({
    memberId: user?.memberId as unknown as number,
  });

  let ticketListToMap: IGetTicketList | undefined;
  if (isAdmin) {
    ticketListToMap = decodedOutput?.value as unknown as IGetTicketList;
  } else {
    ticketListToMap = getMembersTicketListdecodeOutput?.value.Ok;
  }

  return (
    <div>
      <Modal
        open={createTicketModalVisible}
        onClickBackdrop={() => setCreateTicketModalVisible(false)}
      >
        <CreateTicket
          toggleVisible={() =>
            setCreateTicketModalVisible(!createTicketModalVisible)
          }
          refetchTickets={() => refetch()}
        />
      </Modal>

      <Modal
        open={setConfidenceModalVisible}
        onClickBackdrop={() => setSetConfidenceModalVisible(false)}
      >
        <SetConfidence
          toggleVisible={() =>
            setSetConfidenceModalVisible(!createTicketModalVisible)
          }
        />
      </Modal>

      {selectedTicket && (
        <Modal
          open={updateTicketModalVisible}
          onClickBackdrop={() => {
            setUpdateTicketModalVisible(false);
            setSelectedTicket(undefined);
          }}
        >
          <UpdateTicketStatus
            ticket={selectedTicket!}
            toggleVisible={() => {
              setUpdateTicketModalVisible(!updateTicketModalVisible);
              setSelectedTicket(undefined);
            }}
            refetchTickets={() => refetch()}
          />
        </Modal>
      )}

      <div className='mb-3 flex items-center justify-between'>
        <h3>Your Tickets</h3>
        <div>
          <Button
            className='mr-2'
            onClick={() => setSetConfidenceModalVisible(true)}
            startIcon={<TfiCup />}
            variant='outline'
          >
            Set Confidence
          </Button>

          <Button
            onClick={() => setCreateTicketModalVisible(true)}
            startIcon={<AiOutlinePlus />}
          >
            Add New
          </Button>
        </div>
      </div>

      <div className='overflow-x-auto'>
        <Table zebra={true} className='w-full'>
          <Table.Head>
            <span />
            <span>Name</span>
            <span>Status</span>
            <span>Created At</span>
            <span>Ticket Id</span>
            <span>Ticket Type</span>
          </Table.Head>

          <Table.Body>
            {loading && getMembersTicketListLoading ? (
              <div className='flex items-center justify-center'>
                <LoadingSpinner />
              </div>
            ) : (
              <>
                {ticketListToMap && ticketListToMap.length ? (
                  <>
                    {(ticketListToMap as unknown as IGetTicketList).map(
                      (ticket, index) => (
                        <Table.Row key={ticket.ticketId}>
                          <span>{index + 1}</span>
                          <span>
                            <Link href={`/ticket/${ticket.ticketId}`}>
                              <Button
                                onClick={() => {
                                  console.log('logged');
                                }}
                              >
                                {ticket.name}
                              </Button>
                            </Link>
                          </span>
                          <span>
                            {' '}
                            <Button
                              onClick={() => {
                                setSelectedTicket(ticket);
                                setUpdateTicketModalVisible(true);
                              }}
                              startIcon={<AiOutlinePlus />}
                            >
                              {ticket.ticketStatus}
                            </Button>
                          </span>
                          <span>
                            {new Date(
                              parseInt(ticket.startTime)
                            ).toDateString()}
                          </span>
                          <span>{ticket.ticketId}</span>
                          <span>{ticket.taskType}</span>
                        </Table.Row>
                      )
                    )}
                  </>
                ) : (
                  'no data'
                )}
              </>
            )}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};
