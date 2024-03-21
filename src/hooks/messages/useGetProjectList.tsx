import { useQuery } from '@/hooks/useQuery';

import { useContract } from '@/context/contract/ContractContextProvider';

import { CONTRACT_MESSAGES } from '@/types/enums';
export interface Sprint {
  projectId: string;
  startDate: string;
  endDate: string;
  action: string;
}

export interface IGetProject {
  assignedTo: string | null;
  creator: string | null;
  description: string;
  endTime: string | null;
  projectId: string;
  name: string;
  projectStatus: string | null;
  sprint: {
    projectId: string;
    startDate: string;
    endDate: string;
    action: string;
  };
  startTime: string;
  taskList: [unknown];
}
export type IGetProjectList = IGetProject[];

export const useGetProjectList = () => {
  const { contract } = useContract();

  const messageInfo = contract?.abi?.findMessage(
    CONTRACT_MESSAGES.GET_PROJECT_LIST
  );

  return useQuery<IGetProjectList>(messageInfo);
};
