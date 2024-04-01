import { useRouter } from 'next/router';
import React from 'react';

import { useGetProjectInfo } from '@/hooks/messages';

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

export default function ProjectInfoPage() {
  const router = useRouter();
  const projectId = router.query.id![1] as unknown as number;
  const { loading, decodedOutput } = useGetProjectInfo({
    projectId: projectId,
  });

  // const project = decodedOutput!.value as IGetProject;
  // const sprint = project.sprint;
  // console.log("id", (decodedOutput?.value as unknown as IGetProject)
  // .projectId)
  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
        <h1 className='text-center'>Project Info</h1>

        {loading ? (
          <Skeleton />
        ) : (
          <>
            {!decodedOutput || !decodedOutput.value ? (
              'no data'
            ) : (
              <div className='mx-auto my-5 w-full max-w-[1000px]'>
                <div className='px-4 sm:px-0'>
                  <h3 className='text-base-content text-base font-semibold leading-7'>
                    Project Information
                  </h3>
                  <p className='text-base-content mt-1 max-w-2xl text-sm leading-6'></p>
                </div>
                <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                  <dt className='text-base-content text-sm font-medium leading-6'>
                    Project sprint
                  </dt>
                  <div>
                    <span>
                      Project ID: {decodedOutput.value.Ok.sprint.projectId}
                    </span>
                    <br />
                    <span>
                      Start Date:{' '}
                      {new Date(
                        parseInt(decodedOutput.value.Ok.sprint.startDate)
                      ).toDateString()}
                    </span>
                    <br />
                    <span>
                      End Date:{' '}
                      {new Date(
                        parseInt(decodedOutput.value.Ok.sprint.endDate)
                      ).toDateString()}
                    </span>
                    <br />
                    <span>Action: {decodedOutput.value.Ok.sprint.action}</span>
                  </div>
                </div>
                <div className='mt-6 border-t border-gray-100'>
                  <dl className='divide-y divide-gray-100'>
                    <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                      <dt className='text-base-content text-sm font-medium leading-6'>
                        Project Id
                      </dt>
                      <dd className='text-base-content mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0'>
                        {decodedOutput.value.Ok.projectId}
                      </dd>
                    </div>
                    <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                      <dt className='text-base-content text-sm font-medium leading-6'>
                        Assigned to
                      </dt>
                      <dd className='text-base-content mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0'>
                        {decodedOutput.value.Ok.assignedTo}
                      </dd>
                    </div>
                    <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                      <dt className='text-base-content text-sm font-medium leading-6'>
                        Creator
                      </dt>
                      <dd className='text-base-content mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0'>
                        {decodedOutput.value.Ok.creator}
                      </dd>
                    </div>
                    <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                      <dt className='text-base-content text-sm font-medium leading-6'>
                        StartTime
                      </dt>
                      <dd className='text-base-content mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0'>
                        {decodedOutput.value.Ok.startTime}
                      </dd>
                    </div>
                    <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                      <dt className='text-base-content text-sm font-medium leading-6'>
                        End Time
                      </dt>
                      <dd className='text-base-content mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0'>
                        {decodedOutput.value.Ok.endTime !== null ? (
                          new Date(
                            parseInt(decodedOutput.value.Ok.endTime)
                          ).toDateString()
                        ) : (
                          <span>Project is not closed yet</span>
                        )}
                      </dd>
                    </div>
                    <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                      <dt className='text-base-content text-sm font-medium leading-6'>
                        Project Status
                      </dt>
                      <dd className='text-base-content mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0'>
                        {decodedOutput.value.Ok.projectStatus}
                      </dd>
                    </div>
                    <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                      <dt className='text-base-content text-sm font-medium leading-6'>
                        Project Description
                      </dt>
                      <dd className='text-base-content mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0'>
                        {decodedOutput.value.Ok.description}
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
