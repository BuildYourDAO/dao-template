import { useRouter } from 'next/router';
import React from 'react';

import { useGetTaskInfo } from '@/hooks/messages';

// import { IGetTicket } from '@/hooks/messages/useGetTicketList';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Skeleton from '@/components/Skeleton';
/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function TicketInfoPage() {
  const router = useRouter();
  const ticketId = router.query.id![0] as unknown as number;
  const { loading, decodedOutput } = useGetTaskInfo({ ticketId });

  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
        <h1 className='text-center'>Ticket Info</h1>

        {loading ? (
          <Skeleton />
        ) : (
          <>
            {!decodedOutput || !decodedOutput.value ? (
              'no data'
            ) : (
              <div className='mx-auto my-5 w-full max-w-[1000px]'>
                <div className='px-4 sm:px-0'>
                  <h3 className='text-base font-semibold leading-7 text-gray-900'>
                    Ticket Information
                  </h3>
                  <p className='mt-1 max-w-2xl text-sm leading-6 text-gray-500'></p>
                </div>
                <div className='mt-6 border-t border-gray-100'>
                  <dl className='divide-y divide-gray-100'>
                    <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                      <dt className='text-sm font-medium leading-6 text-gray-900'>
                        Ticket Id
                      </dt>
                      <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                        {decodedOutput.value.Ok.ticketId}
                      </dd>
                    </div>
                    <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                      <dt className='text-sm font-medium leading-6 text-gray-900'>
                        Assigned to
                      </dt>
                      <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                        {decodedOutput.value.Ok.assignedTo}
                      </dd>
                    </div>
                    <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                      <dt className='text-sm font-medium leading-6 text-gray-900'>
                        Creator
                      </dt>
                      <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                        {decodedOutput.value.Ok.creator}
                      </dd>
                    </div>
                    <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                      <dt className='text-sm font-medium leading-6 text-gray-900'>
                        Project Id
                      </dt>
                      <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                        {decodedOutput.value.Ok.projectId}
                      </dd>
                    </div>
                    <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                      <dt className='text-sm font-medium leading-6 text-gray-900'>
                        StartTime
                      </dt>
                      <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                        {new Date(
                          parseInt(decodedOutput.value.Ok.startTime)
                        ).toDateString()}
                      </dd>
                    </div>
                    <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                      <dt className='text-sm font-medium leading-6 text-gray-900'>
                        End Time
                      </dt>
                      <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                        {decodedOutput.value.Ok.endTime !== null ? (
                          new Date(
                            parseInt(decodedOutput.value.Ok.endTime)
                          ).toDateString()
                        ) : (
                          <span>Ticket is not closed yet</span>
                        )}
                      </dd>
                    </div>
                    <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                      <dt className='text-sm font-medium leading-6 text-gray-900'>
                        Review
                      </dt>
                      <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                        {decodedOutput.value.Ok.review}
                      </dd>
                    </div>
                    <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                      <dt className='text-sm font-medium leading-6 text-gray-900'>
                        Ticket Status
                      </dt>
                      <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                        {decodedOutput.value.Ok.ticketStatus}
                      </dd>
                    </div>
                    <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                      <dt className='text-sm font-medium leading-6 text-gray-900'>
                        ticketType
                      </dt>
                      <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                        {decodedOutput.value.Ok.taskType}
                      </dd>
                    </div>
                    <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                      <dt className='text-sm font-medium leading-6 text-gray-900'>
                        Total Time Logged In
                      </dt>
                      <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                        {decodedOutput.value.Ok.totaltimeloggedin}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </Layout>
  );
}
