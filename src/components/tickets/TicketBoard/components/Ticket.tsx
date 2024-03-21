import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { DraggableProvided } from 'react-beautiful-dnd';
import { Avatar, Badge, Divider } from 'react-daisyui';

import { IGetTicket } from '@/hooks/messages/useGetTicketList';

import { TicketTypeEnum } from '@/types/enums/ticketType.enum';

export interface TicketProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  provided: DraggableProvided;
  ticket: IGetTicket;
  openTicketModal: () => void;
}

export const Ticket: React.FC<TicketProps> = ({
  provided,
  ticket,
  openTicketModal,
}) => {
  return (
    <div
      onClick={openTicketModal}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className='bg-base-300 mb-4 rounded p-2 shadow-md'
    >
      <Divider className='my-0' />
      <div>
        <div className='flex items-center justify-between'>
          <h4>{ticket.name}</h4>
          <Badge
            color={ticket.taskType === TicketTypeEnum.Bug ? 'error' : 'success'}
            size='md'
          >
            {ticket.taskType.charAt(0)}
          </Badge>
        </div>
        <h6 className='text-xs'>
          {new Date(parseInt(ticket.startTime)).toDateString()}
        </h6>

        <h6 className='mt-3 flex items-end justify-between'>
          <div>
            <Badge size='sm' color='ghost'>
              D-12
            </Badge>
          </div>
          <Avatar
            shape='circle'
            size='xs'
            letters={ticket.assignedTo?.substring(0, 2)}
          />
        </h6>
      </div>

      <Divider className='my-0' />
    </div>
  );
};
