// import {Routes, Route, useNavigate,Link} from 'react-router-dom';
import Link from 'next/link';
import { useState } from 'react';
import { Button, Modal, Table } from 'react-daisyui';
import { AiOutlinePlus } from 'react-icons/ai';

import { useGetMemberList } from '@/hooks/messages';
import { useGetDaoId } from '@/hooks/messages/useGetDaoId';

import { LoadingSpinner } from '@/components/loading/Loading';
import { CreateMember } from '@/components/members';
// import { UpdateMemberRole } from '@/components/members/updateMemberRole';
interface MemberListProps {
  children?: React.ReactNode;
}

export const MemberList: React.FC<MemberListProps> = () => {
  const { decodedOutput, loading, refetch } = useGetMemberList();
  const { decodedOutput: getDaoIdDecodedOutput, loading: getDaoIdLoading } =
    useGetDaoId();

  const [visible, setVisible] = useState<boolean>(false);
  const toggleVisible = () => {
    setVisible(!visible);
  };
  // const navigate = useNavigate();

  // This function navigates to the Home route.
  // const navigateHome = () => {
  //   navigate('/');
  // };

  return (
    <div className='w-full'>
      <Modal open={visible} onClickBackdrop={toggleVisible}>
        <CreateMember
          toggleVisible={toggleVisible}
          refetchMembers={() => refetch()}
        />
      </Modal>

      <div className='mb-3 flex items-center justify-between'>
        <h3>Your Members</h3>
        <Button onClick={toggleVisible} startIcon={<AiOutlinePlus />}>
          Add New
        </Button>
      </div>

      <div className='flex w-full overflow-x-auto'>
        <Table zebra={true} className='w-full'>
          <Table.Head>
            <span />
            <span>Name</span>
            <span>Status</span>
            <span>Joined On</span>
            <span>Role</span>
          </Table.Head>

          <Table.Body>
            {loading || getDaoIdLoading ? (
              <div className='flex items-center justify-center'>
                <LoadingSpinner />
              </div>
            ) : (
              <>
                {decodedOutput &&
                !decodedOutput.isError &&
                decodedOutput.value.length &&
                getDaoIdDecodedOutput &&
                !getDaoIdDecodedOutput.isError &&
                getDaoIdDecodedOutput.value &&
                getDaoIdDecodedOutput.value.length ? (
                  <>
                    {decodedOutput.value.map((member, index) => (
                      <Table.Row key={member.memberId}>
                        <span>{index + 1}</span>
                        <span>
                          <Link
                            href={`/member/${getDaoIdDecodedOutput.value}/${member.memberId}`}
                          >
                            <Button
                              onClick={() => {
                                console.log('logged');
                              }}
                            >
                              {member.name}
                            </Button>
                          </Link>
                        </span>
                        <span>{member.memberStatus}</span>
                        <span>
                          {new Date(parseInt(member.startTime)).toDateString()}
                        </span>
                        <span>
                          <Link
                            href={`/member/${getDaoIdDecodedOutput.value}/${member.memberId}`}
                          >
                            <Button
                              onClick={() => {
                                console.log('logged');
                              }}
                            >
                              {member.memberRole}
                            </Button>
                          </Link>
                        </span>
                      </Table.Row>
                    ))}
                  </>
                ) : (
                  'no data'
                )}
              </>
            )}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};
