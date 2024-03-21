import { Dispatch, FormEvent, SetStateAction } from 'react';
import { Button, Modal, Select } from 'react-daisyui';
import { toast } from 'react-hot-toast';

import { useUpdateMemberRole } from '@/hooks/messages';
import { IGetMember } from '@/hooks/messages';

import { MemberRoleEnum } from '@/types/enums';
import { UpdateMemberRoleInput } from '@/types/schemaTypes';
interface UpdateMemberRoleProps {
  children?: React.ReactNode;
  member: IGetMember;
  toggleVisible: Dispatch<SetStateAction<boolean>>;
  refetchMember: () => void;
}

export const UpdateMemberRole: React.FC<UpdateMemberRoleProps> = ({
  toggleVisible,
  member,
  refetchMember,
}) => {
  const { loading, mutate, argValues, setArgValues } = useUpdateMemberRole({
    memberId: member.memberId,
    role: member.memberRole,
  } as UpdateMemberRoleInput);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const mutateValue = await mutate();

    if (mutateValue) {
      if (mutateValue.isError)
        return toast.error(mutateValue.decodedOutput || 'Something went wrong');

      toast.success('Member Role updated!');
      refetchMember();
    }
    toggleVisible(false);
  };

  return (
    <>
      <Modal.Header className='font-bold'>Update Member Role</Modal.Header>
      <h3>{member.name}</h3>

      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <label className='label'>
            <span className='label-text'>Role</span>
          </label>
          <Select
            placeholder='Status'
            className='w-full'
            onChange={(event) =>
              setArgValues({ ...argValues, role: event.target.value })
            }
          >
            {Object.keys(MemberRoleEnum).map((memberRole) => (
              <option
                value={memberRole}
                key={memberRole}
                selected={
                  memberRole === (member.memberRole as unknown as string)
                }
              >
                {MemberRoleEnum[memberRole as keyof typeof MemberRoleEnum]}
              </option>
            ))}
          </Select>
        </Modal.Body>

        <Modal.Actions>
          <Button loading={loading} type='submit'>
            Update Member Role
          </Button>
        </Modal.Actions>
      </form>
    </>
  );
};
