// SprintList.tsx

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Button, Modal, Table } from 'react-daisyui';
import { AiOutlinePlus } from 'react-icons/ai';

import {
  IGetProject,
  useGetProjectInfo,
  useGetProjectList,
} from '@/hooks/messages';
import { Sprint } from '@/hooks/messages';
import { useGetDaoId } from '@/hooks/messages/useGetDaoId';

import { LoadingSpinner } from '@/components/loading';
import { CreateProject } from '@/components/projects/CreateProject';
interface SprintListProps {
  children?: React.ReactNode;
}

function update_sprint(sprint: Sprint): { startDate: number; endDate: number } {
  if (!sprint) {
    console.error('Sprint information is not available.'); // let number: u32 = u32::from_le_bytes(end_date.as_slice().try_into().expect("Invalid byte length"));
    // let s = Self::convert_bytes_to_number(end_date);
    // let integer_value: i32 = end_date.parse().unwrap();
    // let start_date = number + one_day_in_milliseconds;
    // let new_end_date = start_date + seven_days_in_milliseconds ;
    // project_info.sprint.start_date = start_date.to_string().into() ;
    // project_info.sprint.end_date = new_end_date.to_string().into() ;
    return { startDate: 0, endDate: 0 };
  }

  // Constants
  const one_day_in_milliseconds = 24 * 60 * 60 * 1000;
  const seven_days_in_milliseconds = 7 * 24 * 60 * 60 * 1000;

  // Calculate new dates
  const new_start_date = sprint.endDate + one_day_in_milliseconds;
  const final_end_date = new_start_date + seven_days_in_milliseconds;

  // Return updated sprint information
  return {
    startDate: new_start_date as unknown as number,
    endDate: final_end_date as unknown as number,
  };
}

export const SprintList: React.FC<SprintListProps> = () => {
  const { decodedOutput, loading, refetch } = useGetProjectList();
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
  const { decodedOutput: getDaoIdDecodedOutput, loading: getDaoIdLoading } =
    useGetDaoId();

  // Call useGetProjectInfo directly inside the component
  const {
    loading: projectInfoLoading,
    decodedOutput: projectInfoDecodedOutput,
  } = useGetProjectInfo({
    projectId: 1, // Replace with the actual projectId you want to use
  });
  console.log('projectInfoLoading', projectInfoLoading);
  // Function to update the sprint dates and refetch the project information
  const _updateSprintDates = (projectInfo: IGetProject) => {
    // If projectInfo is not loaded or there's an error, return
    if (!projectInfo) {
      console.error('Project information is not available.');
      return;
    }

    // Get the current sprint from projectInfo
    const sprint = projectInfo.sprint;

    // Calculate updated dates
    const updatedSprint = update_sprint(sprint);

    // Update the sprint start and end dates
    sprint.startDate = updatedSprint.startDate as unknown as string;
    sprint.endDate = updatedSprint.endDate as unknown as string;

    // Perform any other actions needed after updating the dates
    // For example, you might want to save the updated sprint information back to the server.

    // Refetch the project information to update the UI with the new dates
    refetch();
  };

  // Call the updateSprintDates function periodically (every week)
  useEffect(() => {
    const interval = setInterval(() => {
      // updateSprintDates(projectInfoDecodedOutput);
    }, 7 * 24 * 60 * 60 * 1000); // 7 days in milliseconds

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, [projectInfoDecodedOutput]);

  // Function to calculate updated sprint information and format the sprint name
  const getFormattedSprintName = (
    project: IGetProject,
    projectInfo: IGetProject
  ): string => {
    if (!projectInfo) {
      console.error('Project information is not available.');
      return '';
    }

    const sprint = projectInfo.sprint;
    const updatedSprint = update_sprint(sprint);

    return `Sprint_${new Date(
      updatedSprint.startDate
    ).toDateString()}_${new Date(updatedSprint.endDate).toDateString()}`;
  };

  return (
    <div>
      <Modal
        open={createModalOpen}
        onClickBackdrop={() => setCreateModalOpen(false)}
      >
        <CreateProject
          toggleVisible={() => setCreateModalOpen(!createModalOpen)}
          refetchProjects={() => refetch()}
        />
      </Modal>

      <div className='mb-3 flex items-center justify-between'>
        <h3>Your Sprints</h3>
        <Button
          onClick={() => setCreateModalOpen(true)}
          startIcon={<AiOutlinePlus />}
        >
          Add New
        </Button>
      </div>

      <div className='overflow-x-auto'>
        <Table zebra={true} className='w-full'>
          <Table.Head>
            <span />
            <span>Name</span>
            <span>Sprint</span>
            <span>Start Date</span>
            <span>End Date</span>
            <span>Action</span>
          </Table.Head>

          <Table.Body>
            {loading && getDaoIdLoading ? (
              <div className='flex items-center justify-center'>
                <LoadingSpinner />
              </div>
            ) : (
              <>
                {decodedOutput &&
                decodedOutput.value &&
                !decodedOutput.isError &&
                decodedOutput.value.length &&
                getDaoIdDecodedOutput &&
                !getDaoIdDecodedOutput.isError &&
                getDaoIdDecodedOutput.value ? (
                  <>
                    {decodedOutput.value.map((project, index) => (
                      <Table.Row key={project.projectId}>
                        <span>{index + 1}</span>
                        <span>
                          {' '}
                          <Link
                            href={`/project/${getDaoIdDecodedOutput.value}/${project.projectId}`}
                          >
                            <Button
                              onClick={() => {
                                console.log('logged');
                              }}
                            >
                              {project.name}
                            </Button>
                          </Link>
                        </span>
                        <span>{getFormattedSprintName(project, project)}</span>
                        <span>
                          {new Date(
                            parseInt(project.sprint.startDate)
                          ).toDateString()}
                        </span>
                        <span>
                          {new Date(
                            parseInt(project.sprint.endDate)
                          ).toDateString()}
                        </span>
                        <span>{project.sprint.action}</span>
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
