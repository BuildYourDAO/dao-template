import { Dispatch, SetStateAction } from 'react';
import { Modal } from 'react-daisyui';
import { PieChart } from 'react-minimal-pie-chart';

import { IGetDaoInfo, useGetStakedDaoList } from '@/hooks/messages';

interface DaoDetailsProps {
  children?: React.ReactNode;
  toggleVisible: Dispatch<SetStateAction<boolean>>;
  selectedDao?: IGetDaoInfo;
}

export const DaoDetails: React.FC<DaoDetailsProps> = ({ selectedDao }) => {
  // const { accounts } = useSubstrateState();
  const { decodedOutput } = useGetStakedDaoList();

  console.log('decodedOutput ', decodedOutput);

  return (
    <>
      <Modal.Header className='font-bold'></Modal.Header>
      <Modal.Body>
        <div className='mx-auto w-full max-w-[1000px]'>
          <div className='px-4 sm:px-0'>
            <h3 className='text-base font-semibold leading-7'>
              Dao Information
            </h3>
            <p className='mt-1 max-w-2xl text-sm leading-6'>
              Dao details and specifications.
            </p>
          </div>
          <div className='mt-6 border-t border-gray-100'>
            <dl className='divide-y divide-gray-100'>
              <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                <dt className='text-sm font-medium leading-6'>Dao name</dt>
                <div className='mt-1 text-sm leading-6'>
                  <p>{selectedDao?.daoName}</p>
                </div>
              </div>

              <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                <dt className='text-sm font-medium leading-6'>Description</dt>
                <div className='mt-1 text-sm leading-6'>
                  <p>{selectedDao?.description}</p>
                </div>
              </div>
              <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                <dt className='text-sm font-medium leading-6'>Profile</dt>
                <div className='mt-1 text-sm leading-6'>
                  <p>{selectedDao?.profile}</p>
                </div>
              </div>
              <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                <dt className='text-sm font-medium leading-6'>Website</dt>
                <div className='mt-1 text-sm leading-6'>
                  <p>{selectedDao?.website}</p>
                </div>
              </div>
              <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                <dt className='text-sm font-medium leading-6'>Admin</dt>
                <div className='mt-1 text-sm leading-6'>
                  <p>{selectedDao?.daoAdmin}</p>
                </div>
              </div>
              <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                <dt className='text-sm font-medium leading-6'>Address</dt>
                <div className='mt-1 text-sm leading-6'>
                  <p>{selectedDao?.daoAddress}</p>
                </div>
              </div>
            </dl>
          </div>
        </div>

        <div className='rounded-xl p-3 shadow-2xl'>
          <h1 className='mb-2 text-2xl'>
            Ownership & DAO Membership Pie Chart
          </h1>

          <div>
            <PieChart
              className='w-64'
              data={[
                {
                  title: 'Ownership',
                  value: 20,
                  color: '#E38627',
                },
                {
                  title: 'Ownership',
                  value: 80,
                  color: '#666',
                },
              ]}
              background='#666'
              animate
            />
          </div>
        </div>
      </Modal.Body>
    </>
  );
};
