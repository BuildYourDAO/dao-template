import { Dispatch, FormEvent, SetStateAction } from 'react';
import { Button, Input, Modal, Select } from 'react-daisyui';
import { toast } from 'react-hot-toast';

import { useCreateTicket } from '@/hooks/messages';

import { useSubstrateState } from '@/context/substrate/SubstrateContextProvider';

import { TicketTypeEnum } from '@/types/enums/ticketType.enum';

interface CreateTicketProps {
  children?: React.ReactNode;
  toggleVisible: Dispatch<SetStateAction<boolean>>;
  refetchTickets: () => void;
}

export const CreateTicket: React.FC<CreateTicketProps> = ({
  toggleVisible,
  refetchTickets,
}) => {
  const { accounts } = useSubstrateState();
  const { loading, mutate, argValues, setArgValues } = useCreateTicket({
    assignedTo: accounts[0]?.address,
    ticketType: TicketTypeEnum.Feature,
    name: '',
    projectId: '',
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const mutateValue = await mutate();

    if (mutateValue) {
      if (mutateValue.isError)
        return toast.error(mutateValue.decodedOutput || 'An error occurred');

      toast.success('Ticket created!');
      refetchTickets();
    }
    toggleVisible(false);
  };

  return (
    <>
      <Modal.Header className='font-bold'>Create Ticket</Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <label className='label'>
            <span className='label-text'>Ticket Name</span>
          </label>
          <Input
            name='name'
            className='w-full'
            placeholder='name'
            value={argValues.name}
            onChange={(e) =>
              setArgValues({ ...argValues, name: e.target.value })
            }
          />
          <label className='label'>
            <span className='label-text'>Ticket Type</span>
          </label>

          <Select
            placeholder='Ticket Type'
            className='w-full'
            value={argValues.ticketType}
            onChange={(event) =>
              setArgValues({ ...argValues, ticketType: event.target.value })
            }
          >
            {Object.keys(TicketTypeEnum).map((ticketType) => (
              <option
                selected={ticketType === TicketTypeEnum.Feature}
                value={ticketType}
                key={ticketType}
              >
                {ticketType}
              </option>
            ))}
          </Select>

          <label className='label'>
            <span className='label-text'>Assigned member</span>
          </label>
          <Select
            placeholder='Assigned member'
            className='w-full'
            onChange={(event) =>
              setArgValues({ ...argValues, assignedTo: event.target.value })
            }
            defaultValue={accounts[0].address}
          >
            {accounts &&
              accounts.map((account) => (
                <option key={account.address} value={account.address}>
                  {account.meta.name}
                </option>
              ))}
          </Select>

          <label className='label'>
            <span className='label-text'>ProjectId</span>
          </label>
          <Input
            name='name'
            className='w-full'
            placeholder='ProjectId'
            value={argValues.projectId}
            onChange={(e) =>
              setArgValues({ ...argValues, projectId: e.target.value })
            }
          />
        </Modal.Body>

        <Modal.Actions>
          <Button loading={loading} type='submit'>
            Add Ticket!
          </Button>
        </Modal.Actions>
      </form>
    </>
  );
};
