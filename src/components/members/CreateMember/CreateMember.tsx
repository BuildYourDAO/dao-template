import { Dispatch, FormEvent, SetStateAction } from 'react';
import { Button, Input, Modal } from 'react-daisyui';
import { toast } from 'react-hot-toast';

import { useAddMember } from '@/hooks/messages';

import { ADdMemberInput } from '@/types/schemaTypes';

interface CreateMemberProps {
  children?: React.ReactNode;
  toggleVisible: Dispatch<SetStateAction<boolean>>;
  refetchMembers: () => void;
}

export const CreateMember: React.FC<CreateMemberProps> = ({
  toggleVisible,
  refetchMembers,
}) => {
  // const { accounts } = useSubstrateState();
  const { loading, mutate, argValues, setArgValues } = useAddMember();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const mutateValue = await mutate();
    if (mutateValue) {
      if (mutateValue.isError)
        return toast.error(mutateValue.decodedOutput || 'An error occurred');

      toast.success('Member created!');
      refetchMembers();
    }
    setArgValues({} as ADdMemberInput);
    toggleVisible(false);
  };

  return (
    <>
      <Modal.Header className='font-bold'>Create Member</Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <label className='label'>
            <span className='label-text'>Member Name</span>
            {/* <span className='label-text-alt'>Alt label</span> */}
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
            <span className='label-text'>Choose member account</span>
          </label>
          <Input
            name='address'
            className='w-full'
            placeholder='address'
            value={argValues.memberAddress}
            onChange={(e) =>
              setArgValues({ ...argValues, memberAddress: e.target.value })
            }
          />
        </Modal.Body>

        <Modal.Actions>
          <Button loading={loading} type='submit'>
            Add Member!
          </Button>
        </Modal.Actions>
      </form>
    </>
  );
};
