import { useState } from 'react';
import { Button, Modal } from 'react-daisyui';

import { useGetAdmin, useGetDaoInfo } from '@/hooks/messages';
import { useGetContractAddress } from '@/hooks/messages/useGetContractaddress';
import { useGetDaoId } from '@/hooks/messages/useGetDaoId';

import { ChangeDaoAdmin } from '@/components/dao/ChangeDaoAdmin';
import { LoadingSpinner } from '@/components/loading';

export const DaoInfo = () => {
  const [visible, setVisible] = useState(false);

  const { loading, decodedOutput } = useGetDaoInfo();
  const { loading: getDaoIdLoading, decodedOutput: getDaoIdOutput } =
    useGetDaoId();
  const { loading: getAdminLoading, decodedOutput: getAdminDecodedOutput } =
    useGetAdmin();

  const {
    loading: getDaoAddressLoading,
    decodedOutput: getDaoAddressDecodedOutput,
  } = useGetContractAddress();

  return (
    <>
      <Modal
        open={visible}
        onClickBackdrop={() => {
          setVisible(false);
        }}
      >
        <ChangeDaoAdmin toggleVisible={() => setVisible(!visible)} />
      </Modal>

      <div className='flex-1'>
        <div className='flex justify-between'>
          <div className='px-4 sm:px-0'>
            <h3>DAO Information</h3>
            <p className='mt-1 max-w-2xl text-sm leading-6'>
              DAO details and info.
            </p>
          </div>

          <Button onClick={() => setVisible(true)}>Change DAO Admin</Button>
        </div>
        <div className='mt-6 border-t'>
          <dl className='divide-y'>
            <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
              <dt className='text-sm font-medium leading-6'>Dao name</dt>
              <div className='mt-1 text-sm leading-6'>
                {loading ? (
                  <LoadingSpinner />
                ) : (
                  <>
                    {decodedOutput &&
                    !decodedOutput.isError &&
                    decodedOutput.value ? (
                      <p>{decodedOutput.value.daoName}</p>
                    ) : (
                      'no'
                    )}
                  </>
                )}
              </div>
            </div>
            <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
              <p className='text-sm font-medium leading-6'>Description</p>
              <div className='mt-1 text-sm leading-6'>
                {loading ? (
                  <LoadingSpinner />
                ) : (
                  <>
                    {decodedOutput &&
                    !decodedOutput.isError &&
                    decodedOutput.value ? (
                      <p>{decodedOutput.value.description}</p>
                    ) : (
                      'no'
                    )}
                  </>
                )}
              </div>
            </div>
            {/* <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
              <dt className='text-sm font-medium leading-6'>Profile</dt>
              <div className='mt-1 text-sm leading-6'>
                {loading ? (
                  <LoadingSpinner />
                ) : (
                  <>
                    {decodedOutput &&
                    !decodedOutput.isError &&
                    decodedOutput.value ? (
                      <p>{decodedOutput.value.profile}</p>
                    ) : (
                      'no'
                    )}
                  </>
                )}
              </div>
            </div> */}
            {/* <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
              <dt className='text-sm font-medium leading-6'>Website</dt>
              <div className='mt-1 text-sm leading-6 '>
                {loading ? (
                  <LoadingSpinner />
                ) : (
                  <>
                    {decodedOutput &&
                    !decodedOutput.isError &&
                    decodedOutput.value ? (
                      <p>{decodedOutput.value.website}</p>
                    ) : (
                      'no'
                    )}
                  </>
                )}
              </div>
            </div> */}
            <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
              <dt className='text-sm font-medium leading-6'>Admin</dt>
              <div className='mt-1 text-sm leading-6'>
                {getAdminLoading ? (
                  <LoadingSpinner />
                ) : (
                  <>
                    {getAdminDecodedOutput &&
                    !getAdminDecodedOutput.isError &&
                    getAdminDecodedOutput.value ? (
                      <p>{getAdminDecodedOutput.value}</p>
                    ) : (
                      'no'
                    )}
                  </>
                )}
              </div>
            </div>
            <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
              <dt className='text-sm font-medium leading-6'>DaoId</dt>
              <div className='mt-1 text-sm leading-6'>
                {getDaoIdLoading ? (
                  <LoadingSpinner />
                ) : (
                  <>
                    {getDaoIdOutput &&
                    !getDaoIdOutput.isError &&
                    getDaoIdOutput.value ? (
                      <p>{getDaoIdOutput.value}</p>
                    ) : (
                      'no'
                    )}
                  </>
                )}
              </div>
            </div>
            <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
              <dt className='text-sm font-medium leading-6'>Dao Address</dt>
              <div className='mt-1 text-sm leading-6'>
                {getDaoAddressLoading ? (
                  <LoadingSpinner />
                ) : (
                  <>
                    {getDaoAddressDecodedOutput &&
                    !getDaoAddressDecodedOutput.isError &&
                    getDaoAddressDecodedOutput.value ? (
                      <p>{getDaoAddressDecodedOutput.value}</p>
                    ) : (
                      'no'
                    )}
                  </>
                )}
              </div>
            </div>
          </dl>
        </div>
      </div>
    </>
  );
};
