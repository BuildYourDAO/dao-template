import { Dispatch, FormEvent, SetStateAction } from 'react';
import { Button, Input, Modal } from 'react-daisyui';
import { toast } from 'react-hot-toast';

import { useAddDaoAsMember } from '@/hooks/messages';

import { AddDaoAsMemberInput } from '@/types/schemaTypes';

interface AddDaoProps {
  children?: React.ReactNode;
  toggleVisible: Dispatch<SetStateAction<boolean>>;
  refetchMembers: () => void;
}

export const AddDao: React.FC<AddDaoProps> = ({
  toggleVisible,
  refetchMembers,
}) => {
  // const { accounts } = useSubstrateState();
  const { loading, mutate, argValues, setArgValues } = useAddDaoAsMember({
    daoInfo: {},
  } as AddDaoAsMemberInput);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const mutateValue = await mutate();
    if (mutateValue) {
      if (mutateValue.isError)
        return toast.error(mutateValue.decodedOutput || 'An error occurred');

      toast.success('Dao added as member!');
      refetchMembers();
    }
    setArgValues({
      daoInfo: {},
    } as AddDaoAsMemberInput);
    toggleVisible(false);
  };

  return (
    <>
      <Modal.Header className='font-bold'>Add Dao as Member</Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <label className='label'>
            <span className='label-text'>Dao Name*</span>
            {/* <span className='label-text-alt'>Alt label</span> */}
          </label>
          <Input
            name='daoName'
            className='w-full'
            placeholder='daoName'
            value={argValues.daoInfo.daoName}
            onChange={(e) =>
              setArgValues({
                daoInfo: { ...argValues.daoInfo, daoName: e.target.value },
              })
            }
          />
          <label className='label'>
            <span className='label-text'>Description*</span>
          </label>
          <Input
            name='description'
            className='w-full'
            placeholder='description'
            value={argValues.daoInfo.description}
            onChange={(e) =>
              setArgValues({
                daoInfo: { ...argValues.daoInfo, description: e.target.value },
              })
            }
          />
          <label className='label'>
            <span className='label-text'>Profile</span>
          </label>
          <Input
            name='profile'
            className='w-full'
            placeholder='profile'
            value={argValues.daoInfo.profile || ''}
            onChange={(e) =>
              setArgValues({
                daoInfo: { ...argValues.daoInfo, profile: e.target.value },
              })
            }
          />
          <label className='label'>
            <span className='label-text'>Website</span>
          </label>
          <Input
            name='website'
            className='w-full'
            placeholder='website'
            value={argValues.daoInfo.website || ''}
            onChange={(e) =>
              setArgValues({
                daoInfo: { ...argValues.daoInfo, website: e.target.value },
              })
            }
          />
        </Modal.Body>

        <Modal.Actions>
          <Button loading={loading} type='submit'>
            Add Dao!
          </Button>
        </Modal.Actions>
      </form>
    </>
  );
};
