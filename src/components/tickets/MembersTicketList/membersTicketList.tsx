import Link from 'next/link';
import { useState } from 'react';
import { Button, Modal, Table } from 'react-daisyui';
import { AiOutlinePlus } from 'react-icons/ai';

import {
  IGetTicket,
  IGetTicketList,
  useGetTicketList,
} from '@/hooks/messages/useGetTicketList';

import { LoadingSpinner } from '@/components/loading';
import { CreateTicket } from '@/components/tickets/CreateTicket';
import { UpdateTicketStatus } from '@/components/tickets/TicketStatus';

interface TicketListProps {
  children?: React.ReactNode;
}

export const TicketList: React.FC<TicketListProps> = () => {
  const { decodedOutput, loading, refetch } = useGetTicketList();
  const [createTicketModalVisible, setCreateTicketModalVisible] =
    useState(false);
  const [updateTicketModalVisible, setUpdateTicketModalVisible] =
    useState(false);

  const [selectedTicket, setSelectedTicket] = useState<IGetTicket>();

  return (
    <div>
      <Modal
        open={createTicketModalVisible}
        onClickBackdrop={() => setCreateTicketModalVisible(!false)}
      >
        <CreateTicket
          toggleVisible={() =>
            setCreateTicketModalVisible(!createTicketModalVisible)
          }
          refetchTickets={() => refetch()}
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
        <Button
          onClick={() => setCreateTicketModalVisible(true)}
          startIcon={<AiOutlinePlus />}
        >
          Add New
        </Button>
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
            {loading ? (
              <div className='flex items-center justify-center'>
                <LoadingSpinner />
              </div>
            ) : (
              <>
                {decodedOutput &&
                decodedOutput.value &&
                !decodedOutput.isError &&
                decodedOutput.value.length ? (
                  <>
                    {(decodedOutput.value as unknown as IGetTicketList).map(
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
