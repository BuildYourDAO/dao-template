import { Dispatch, FormEvent, SetStateAction } from 'react';
import { Button, Input, Modal, Select } from 'react-daisyui';
import toast from 'react-hot-toast';

import { useCreateProject } from '@/hooks/messages';

import { useSubstrateState } from '@/context/substrate/SubstrateContextProvider';

interface CreateProjectProps {
  children?: React.ReactNode;
  toggleVisible: Dispatch<SetStateAction<boolean>>;
  refetchProjects: () => void;
}

export const CreateProject: React.FC<CreateProjectProps> = ({
  toggleVisible,
  refetchProjects,
}) => {
  const { accounts } = useSubstrateState();
  const { loading, mutate, argValues, setArgValues } = useCreateProject({
    assignedTo: accounts[0]?.address,
    name: '',
    projectDescription: '',
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const mutateValue = await mutate();
    if (mutateValue) {
      if (mutateValue.isError)
        return toast.error(mutateValue.decodedOutput || 'An error occurred');

      toast.success('Project created!');
      refetchProjects();
    }
    toggleVisible(false);
  };

  return (
    <>
      <Modal.Header className='font-bold'>Create Project</Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <label className='label'>
            <span className='label-text'>Project Name</span>
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
          <Select
            placeholder='Account Address'
            className='w-full'
            onChange={(event) =>
              setArgValues({ ...argValues, assignedTo: event.target.value })
            }
            value={argValues.assignedTo}
          >
            {accounts &&
              accounts.map((account) => (
                <option key={account.address} value={account.address}>
                  {account.meta.name}
                </option>
              ))}
          </Select>

          <label className='label'>
            <span className='label-text'>Project Description</span>
          </label>
          <Input
            name='name'
            className='w-full'
            placeholder='Project Description'
            value={argValues.projectDescription}
            onChange={(e) =>
              setArgValues({ ...argValues, projectDescription: e.target.value })
            }
          />
        </Modal.Body>

        <Modal.Actions>
          <Button loading={loading} type='submit'>
            Add Project!
          </Button>
        </Modal.Actions>
      </form>
    </>
  );
};
