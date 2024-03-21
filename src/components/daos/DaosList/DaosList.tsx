import { useCallback, useState } from 'react';
import { Button, Modal, Table } from 'react-daisyui';
import toast from 'react-hot-toast';
import { AiOutlinePlus } from 'react-icons/ai';

import {
  IGetDaoInfo,
  useGetDaoInfoList,
  useRedeemDaoStake,
} from '@/hooks/messages';
import { useGetDaoId } from '@/hooks/messages/useGetDaoId';

import { AddDao } from '@/components/daos/DaosList/AddDao';
import { AddStakeForDao } from '@/components/daos/DaosList/AddStakeForDao';
import { DaoDetails } from '@/components/daos/DaosList/DaoDetails';
import { LoadingSpinner } from '@/components/loading/Loading';

interface DaosListProps {
  children?: React.ReactNode;
}

export const DaosList: React.FC<DaosListProps> = () => {
  const { decodedOutput, loading, refetch } = useGetDaoInfoList();
  const { decodedOutput: getDaoIdDecodedOutput, loading: getDaoIdLoading } =
    useGetDaoId();

  const { mutate, loading: mutateLoading } = useRedeemDaoStake();

  const [selectedDao, setSelectedDao] = useState<IGetDaoInfo>();

  const [visible, setVisible] = useState<boolean>(false);
  const [daoModalVisible, setDaoModalVisible] = useState<boolean>(false);
  const [addStakeForDaoVisible, setAddStakeForDaoVisible] =
    useState<boolean>(false);

  const toggleVisible = () => {
    setVisible(!visible);
  };

  const handleRedeem = useCallback(async () => {
    const mutateValue = await mutate();

    if (mutateValue) {
      if (mutateValue.isError)
        return toast.error(mutateValue.decodedOutput || 'An error occurred');

      toast.success('Stake redeemed');
    }
  }, [mutate]);

  return (
    <div className='w-full'>
      <Modal open={visible} onClickBackdrop={toggleVisible}>
        <AddDao
          toggleVisible={toggleVisible}
          refetchMembers={() => refetch()}
        />
      </Modal>

      <Modal
        open={addStakeForDaoVisible}
        onClickBackdrop={() => setAddStakeForDaoVisible(!addStakeForDaoVisible)}
      >
        <AddStakeForDao
          toggleVisible={() => setAddStakeForDaoVisible(!addStakeForDaoVisible)}
        />
      </Modal>

      <Modal
        className='w-11/12 max-w-5xl'
        open={daoModalVisible}
        onClickBackdrop={() => setDaoModalVisible(!daoModalVisible)}
      >
        <DaoDetails
          selectedDao={selectedDao}
          toggleVisible={() => setDaoModalVisible(!daoModalVisible)}
        />
      </Modal>

      <div className='bg-base-200 my-3 flex items-center justify-end rounded-xl p-3'>
        <div>
          <Button
            onClick={() => setAddStakeForDaoVisible(true)}
            startIcon={<AiOutlinePlus />}
            variant='outline'
            className='mr-2'
          >
            Add Stake for Dao
          </Button>
          <Button
            onClick={handleRedeem}
            loading={mutateLoading}
            startIcon={<AiOutlinePlus />}
          >
            Redeem Stake for Dao
          </Button>
        </div>
      </div>

      <div className='mb-3 flex items-center justify-between'>
        <h3>Your Dao's</h3>
        <Button onClick={toggleVisible} startIcon={<AiOutlinePlus />}>
          Add New
        </Button>
      </div>

      <div className='flex w-full overflow-x-auto'>
        <Table zebra={true} className='w-full'>
          <Table.Head>
            <span />
            <span>Name</span>
            <span>Description</span>
            <span>Admin</span>
            <span></span>
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
                decodedOutput.value &&
                decodedOutput.value.length &&
                getDaoIdDecodedOutput ? (
                  <>
                    {decodedOutput.value.map((dao, index) => (
                      <Table.Row key={dao.daoId}>
                        <span>{index + 1}</span>
                        <span>{dao.daoName}</span>
                        <span>{dao.description}</span>
                        <span>{dao.daoAdmin}</span>
                        <Button
                          onClick={() => {
                            setSelectedDao(dao);
                            setDaoModalVisible(true);
                          }}
                          variant='outline'
                        >
                          View
                        </Button>
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
