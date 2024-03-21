import { Badge, Button, Divider, Modal, Progress, Select } from 'react-daisyui';
import { AiOutlineClockCircle, AiOutlineClose } from 'react-icons/ai';

import { IGetTicket } from '@/hooks/messages/useGetTicketList';

import { TimeLogAccordion } from '@/components/tickets/TicketBoard/components/TimeLogAccordion';

import { TOTAL_HOURS_PER_WEEEK } from '@/constant';
import { useSubstrateState } from '@/context/substrate/SubstrateContextProvider';

import { TaskStatusEnum } from '@/types/enums/taskStatus.enum';
interface TicketModalProps {
  children?: React.ReactNode;
  ticket: IGetTicket;
  closeModal: () => void;
  updateTicketStatus: (
    ticketId: string,
    ticketStatus: TaskStatusEnum
  ) => Promise<string | undefined>;
  updateStatusLoading: boolean;
}

export const TicketModal: React.FC<TicketModalProps> = ({
  ticket,
  closeModal,
  updateTicketStatus,
  updateStatusLoading,
}) => {
  const { currentAccount } = useSubstrateState();
  return (
    <>
      <Modal.Header>
        <div className='flex items-center justify-between font-bold'>
          <div>
            <Badge size='lg' className='mr-2' color='info'>
              D-12
            </Badge>
            <Badge size='lg'>
              {' '}
              {new Date(parseInt(ticket.startTime)).toDateString()}
            </Badge>
          </div>

          <Button
            onClick={closeModal}
            startIcon={<AiOutlineClose />}
            size='sm'
          />
        </div>

        <div className='mt-5 flex items-center justify-between text-sm'>
          <h5 className='text-md flex items-center gap-2'>
            Reporter:
            <Badge color='ghost' size='lg'>
              {ticket.creator?.slice(0, 2)}
            </Badge>
          </h5>
          <h5 className='text-md flex items-center gap-2'>
            Assignee:
            <Badge color='ghost' size='lg'>
              {ticket.assignedTo?.slice(0, 2)}
            </Badge>
          </h5>
        </div>
      </Modal.Header>
      <Divider />
      <Modal.Body>
        <div className='flex'>
          <div className='w-2/3 pr-4'>
            <h3 className='mb-2'>{ticket.name}</h3>

            <p>{ticket.ticketDescription}</p>
          </div>
          <div className='w-1/3'>
            <div>
              <label className='label'>
                <span className='label-text font-bold'>STATUS</span>
              </label>
              <Select
                value={String(ticket.ticketStatus)}
                color='info'
                placeholder='Ticket Type'
                className='w-full'
                onChange={(e) => {
                  updateTicketStatus(
                    ticket.ticketId,
                    e.target.value as TaskStatusEnum
                  );
                }}
                disabled={updateStatusLoading}
              >
                {Object.keys(TaskStatusEnum).map((ticketType) => (
                  <option value={ticketType} key={ticketType}>
                    {ticketType}
                  </option>
                ))}
              </Select>
            </div>
            <div className='mt-10'>
              <label className='label'>
                <span className='label-text font-bold'>TIME TRACKING</span>
              </label>
              <div className='flex items-center'>
                <AiOutlineClockCircle className='mr-2 text-4xl' />
                <div className='w-full'>
                  <Progress color='info' className='my-0 w-full' value={100} />
                  <p className='text-sm opacity-75'>4d 3h 30m logged in</p>
                </div>
              </div>

              {ticket.ticketStatus ===
                TaskStatusEnum.InProgress.replace(/\s/g, '') &&
                currentAccount?.address === ticket.assignedTo && (
                  <TimeLogAccordion
                    isExtraTime={
                      Number(ticket.totaltimeloggedin) === TOTAL_HOURS_PER_WEEEK
                    }
                    ticket={ticket}
                  />
                )}
            </div>
          </div>
        </div>
      </Modal.Body>

      <Modal.Actions></Modal.Actions>
    </>
  );
};
