import { InferType } from 'yup';

import {
  addDaoAsMemberInputSchema,
  addDaoTokenInputSchema,
  addMemberInputSchema,
  addStakeForDaoSchema,
  addStakeInputSchema,
  calculateEfficiencyInputSchema,
  changeDaoAdminSchema,
  closeProjectInputSchema,
  closeTaskInputSchema,
  createProjectInputSchema,
  createSprintInputSchema,
  createTicketInputSchema,
  deleteMemberInputSchema,
  efficiencyPercentSchema,
  getAvalabilityInfoInputSchema,
  getMemberEfficiencySchema,
  getMemberInfoByAddressInputSchema,
  getMemberInfoInputSchema,
  getMemberListInputSchema,
  getMembersProjectInputSchema,
  getMembersTicketInputSchema,
  getProjectInputSchema,
  getSprintInfoInputSchema,
  getStakeForAccountInputSchema,
  getTaskInfoInputSchema,
  getTimeLoggedInputSchema,
  getTokenListInputSchema,
  isAdminInputSchema,
  isMemberInputSchema,
  sendFundsInputSchema,
  setCodeInputSchema,
  setConfidenceSchema,
  setDaoAdminInputSchema,
  timeLogInputSchema,
  transferBalanceSchema,
  updateMemberRoleInputSchema,
  updateProjectStatusInputSchema,
  updateTaskStatusInputSchema,
} from '@/helpers/schemas';

export type ADdMemberInput = InferType<typeof addMemberInputSchema>;
export type AddDaoTokenInput = InferType<typeof addDaoTokenInputSchema>;
export type GetTokenListInput = InferType<typeof getTokenListInputSchema>;
export type IsAdminInput = InferType<typeof isAdminInputSchema>;
export type DeleteMemberInput = InferType<typeof deleteMemberInputSchema>;
export type AddDaoAsMemberInput = InferType<typeof addDaoAsMemberInputSchema>;
export type GetMemberInfoInput = InferType<typeof getMemberInfoInputSchema>;
export type GetMemberTicketInput = InferType<
  typeof getMembersTicketInputSchema
>;
export type GetMembersProjectInput = InferType<
  typeof getMembersProjectInputSchema
>;
export type GetTimeLoggedInput = InferType<typeof getTimeLoggedInputSchema>;
export type getMemberInfoByAddressInput = InferType<
  typeof getMemberInfoByAddressInputSchema
>;
export type GetAvailabilityInfoInput = InferType<
  typeof getAvalabilityInfoInputSchema
>;
export type SetDaoAdminInput = InferType<typeof setDaoAdminInputSchema>;
export type IsMemberInput = InferType<typeof isMemberInputSchema>;
export type GetMemberListInput = InferType<typeof getMemberListInputSchema>;
export type UpdateMemberRoleInput = InferType<
  typeof updateMemberRoleInputSchema
>;
export type CreateProjectInput = InferType<typeof createProjectInputSchema>;
export type addStakeInput = InferType<typeof addStakeInputSchema>;
export type GetProjectInput = InferType<typeof getProjectInputSchema>;
export type UpdateProjectStatusInput = InferType<
  typeof updateProjectStatusInputSchema
>;
export type CloseProjectInput = InferType<typeof closeProjectInputSchema>;
export type CreateTicketInput = InferType<typeof createTicketInputSchema>;
export type UpdateTaskStatusInput = InferType<
  typeof updateTaskStatusInputSchema
>;
export type GetTaskInfoInput = InferType<typeof getTaskInfoInputSchema>;
export type GetSprintInput = InferType<typeof getSprintInfoInputSchema>;

export type CloseTaskInput = InferType<typeof closeTaskInputSchema>;
export type TimeLogInput = InferType<typeof timeLogInputSchema>;
export type CalculateEfficiencyInput = InferType<
  typeof calculateEfficiencyInputSchema
>;
export type GetStakeForAccountInput = InferType<
  typeof getStakeForAccountInputSchema
>;
export type SetCodeInput = InferType<typeof setCodeInputSchema>;
export type CreateSprintInput = InferType<typeof createSprintInputSchema>;
export type SendFundsInput = InferType<typeof sendFundsInputSchema>;
export type SetConfidenceInput = InferType<typeof setConfidenceSchema>;
export type EfficiencyPercentInput = InferType<typeof efficiencyPercentSchema>;
export type TransferBalanceInput = InferType<typeof transferBalanceSchema>;
export type AddStakeForDaoInput = InferType<typeof addStakeForDaoSchema>;
export type ChangeDaoAdminInput = InferType<typeof changeDaoAdminSchema>;
export type GetMemberEfficiencyInput = InferType<
  typeof getMemberEfficiencySchema
>;
