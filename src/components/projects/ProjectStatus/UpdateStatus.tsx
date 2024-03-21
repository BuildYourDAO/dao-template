import { Dispatch, FormEvent, SetStateAction } from 'react';
import { Button, Modal, Select } from 'react-daisyui';
import { toast } from 'react-hot-toast';

import { IGetProject, useUpdateProjectStatus } from '@/hooks/messages';

import { useContract } from '@/context/contract/ContractContextProvider';

import { ProjectStatusEnum } from '@/types/enums';
interface UpdateProjectStatusProps {
  children?: React.ReactNode;
  toggleVisible: Dispatch<SetStateAction<boolean>>;
  refetchProjects: () => void;
  project: IGetProject;
}

export const UpdateProjectStatus: React.FC<UpdateProjectStatusProps> = ({
  toggleVisible,
  refetchProjects,
  project,
}) => {
  const { contract } = useContract();
  const { loading, mutate, argValues, setArgValues } = useUpdateProjectStatus({
    daoAddress: contract.address.toString(),
    projectId: project.projectId,
    status: project.projectStatus as string,
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const mutateValue = await mutate();
    if (mutateValue) {
      if (mutateValue.isError)
        return toast.error(mutateValue.decodedOutput || 'An error occurred');

      toast.success('Project status updated!');
      refetchProjects();
    }
    toggleVisible(false);
  };

  return (
    <>
      <Modal.Header className='font-bold'>Update Project Status</Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <h3>{project.name}</h3>

          <label className='label'>
            <span className='label-text'>Project Status</span>
          </label>
          <Select
            placeholder='Status'
            className='w-full'
            onChange={(event) =>
              setArgValues({ ...argValues, status: event.target.value })
            }
          >
            {Object.values(ProjectStatusEnum).map((ticketType) => (
              <option
                selected={ticketType === project.projectStatus}
                key={ticketType}
                value={ticketType}
              >
                {ticketType}
              </option>
            ))}
          </Select>
        </Modal.Body>

        <Modal.Actions>
          <Button loading={loading} type='submit'>
            Update Project Status
          </Button>
        </Modal.Actions>
      </form>
    </>
  );
};
