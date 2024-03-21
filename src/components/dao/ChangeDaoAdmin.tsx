import { Dispatch, FormEvent, SetStateAction } from 'react';
import { Button, Input, Modal } from 'react-daisyui';
import { toast } from 'react-hot-toast';

import { useChangeDaoAdmin } from '@/hooks/messages';

interface ChangeDaoAdminProps {
  children?: React.ReactNode;
  toggleVisible: Dispatch<SetStateAction<boolean>>;
}

export const ChangeDaoAdmin: React.FC<ChangeDaoAdminProps> = ({
  toggleVisible,
}) => {
  // const { accounts } = useSubstrateState();
  const { loading, mutate, argValues, setArgValues } = useChangeDaoAdmin({
    member_address: '',
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const mutateValue = await mutate();
    if (mutateValue) {
      if (mutateValue.isError)
        return toast.error(mutateValue.decodedOutput || 'An error occurred');

      toast.success('Dao member changed!');
    }
    setArgValues({ member_address: '' });
    toggleVisible(false);
  };

  return (
    <>
      <Modal.Header className='font-bold'>Change DAO Admin</Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <label className='label'>
            <span className='label-text'>Address</span>
            {/* <span className='label-text-alt'>Alt label</span> */}
          </label>
          <Input
            name='member_address'
            className='w-full'
            placeholder='Member Address'
            value={argValues.member_address}
            onChange={(e) =>
              setArgValues({
                member_address: e.target.value,
              })
            }
          />
        </Modal.Body>

        <Modal.Actions>
          <Button loading={loading} type='submit'>
            Change Admin
          </Button>
        </Modal.Actions>
      </form>
    </>
  );
};
