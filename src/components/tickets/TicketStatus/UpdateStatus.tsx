import { Dispatch, FormEvent, SetStateAction } from 'react';
import { Button, Modal, Select } from 'react-daisyui';
import { toast } from 'react-hot-toast';

import { useUpdateTaskStatus } from '@/hooks/messages';
import { IGetTicket } from '@/hooks/messages/useGetTicketList';

import { TaskStatusEnum } from '@/types/enums/taskStatus.enum';
import { UpdateTaskStatusInput } from '@/types/schemaTypes';

interface UpdateTicketStatusProps {
  children?: React.ReactNode;
  ticket: IGetTicket;
  toggleVisible: Dispatch<SetStateAction<boolean>>;
  refetchTickets: () => void;
}

export const UpdateTicketStatus: React.FC<UpdateTicketStatusProps> = ({
  toggleVisible,
  ticket,
  refetchTickets,
}) => {
  const { loading, mutate, argValues, setArgValues } = useUpdateTaskStatus({
    ticketId: ticket.ticketId,
    ticketStatus: ticket.ticketStatus,
  } as UpdateTaskStatusInput);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const mutateValue = await mutate();
    if (mutateValue) {
      if (mutateValue.isError)
        return toast.error(mutateValue.decodedOutput || 'Something went wrong');

      toast.success('Ticket status updated!');
      refetchTickets();
    }
    toggleVisible(false);
  };

  return (
    <>
      <Modal.Header className='font-bold'>Update Ticket Status</Modal.Header>
      <h3>{ticket.name}</h3>

      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <label className='label'>
            <span className='label-text'> Status</span>
          </label>
          <Select
            placeholder='Status'
            className='w-full'
            onChange={(event) =>
              setArgValues({ ...argValues, ticketStatus: event.target.value })
            }
          >
            {Object.keys(TaskStatusEnum).map((ticketType) => (
              <option
                value={ticketType}
                key={ticketType}
                selected={ticketType === ticket.ticketStatus}
              >
                {TaskStatusEnum[ticketType as keyof typeof TaskStatusEnum]}
              </option>
            ))}
          </Select>
        </Modal.Body>

        <Modal.Actions>
          <Button loading={loading} type='submit'>
            Update Ticket Status
          </Button>
        </Modal.Actions>
      </form>
    </>
  );
};
