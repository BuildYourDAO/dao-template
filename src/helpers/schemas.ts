import { number, object, string } from 'yup';
export const addMemberInputSchema = object({
  memberAddress: string().required(),
  name: string().optional(),
});

export const addDaoTokenInputSchema = object({
  daoAddress: string().required(),
  tokenType: string().required(),
  tokenAddress: string().required(),
});

export const getTokenListInputSchema = object({
  tokenAddress: string().required(),
});

export const isAdminInputSchema = object({
  admin: string().required(),
});

export const deleteMemberInputSchema = object({
  daoAddress: string().required(),
  memberAddress: string().required(),
});

export const addDaoAsMemberInputSchema = object({
  daoInfo: object({
    daoName: string().required(),
    description: string().required(),
    website: string().nullable(),
    profile: string().nullable(),
  }),
});

export const getMemberInfoInputSchema = object({
  memberId: number().required(),
});

export const getMembersProjectInputSchema = object({
  memberId: number().required(),
});

export const getMembersTicketInputSchema = object({
  memberId: number().required(),
});

export const getTimeLoggedInputSchema = object({
  ticketId: number().required(),
});

export const getMemberInfoByAddressInputSchema = object({
  memberAddress: string().required(),
});

export const getAvalabilityInfoInputSchema = object({
  memberAddress: string().required(),
});

export const setDaoAdminInputSchema = object({
  memberAddress: string().required(),
});

export const isMemberInputSchema = object({
  account: string().required(),
});

export const getMemberListInputSchema = object({
  daoAddress: string().required(),
});

export const updateMemberRoleInputSchema = object({
  memberId: string().required(),
  role: string().required(),
});

export const createProjectInputSchema = object({
  assignedTo: string().required(),
  name: string().required(),
  projectDescription: string().required(),
});

export const addStakeInputSchema = object({
  amount: number().required(),
});

export const getProjectInputSchema = object({
  projectId: number().required(),
});

export const updateProjectStatusInputSchema = object({
  projectId: string().required(),
  daoAddress: string().required(),
  status: string().required(),
});

export const closeProjectInputSchema = object({
  projectId: string().required(),
  daoAddress: string().required(),
});

export const createTicketInputSchema = object({
  name: string().required(),
  projectId: string().required(),
  assignedTo: string().required(),
  ticketType: string().required(),
});

export const updateTaskStatusInputSchema = object({
  ticketId: string().required(),
  ticketStatus: string().required(),
});

export const getTaskInfoInputSchema = object({
  ticketId: number().required(),
});

export const getSprintInfoInputSchema = object({
  projectId: string().required(),
});

export const closeTaskInputSchema = object({
  ticketId: string().required(),
  daoAddress: string().required(),
});

export const timeLogInputSchema = object({
  ticketId: number().required(),
  hours: number().required(),
  minutes: number().required(),
});

export const calculateEfficiencyInputSchema = object({
  memberAddress: string().required(),
});

export const getStakeForAccountInputSchema = object({
  accountId: string().required(),
});

export const setCodeInputSchema = object({
  code: string().required(),
});

export const createSprintInputSchema = object({
  projectId: string().required(),
  startDate: string().required(),
  endDate: string().required(),
});

export const sendFundsInputSchema = object({
  amount: number().required(),
});

export const setConfidenceSchema = object({
  confidence_level: number().required(),
});

export const efficiencyPercentSchema = object({
  member_address: string().required(),
});

export const transferBalanceSchema = object({
  account: string().required(),
  balance: number().required(),
});

export const addStakeForDaoSchema = object({
  amount: number().required(),
});

export const changeDaoAdminSchema = object({
  member_address: string().required(),
});

export const getMemberEfficiencySchema = object({
  member_address: string().required(),
});
