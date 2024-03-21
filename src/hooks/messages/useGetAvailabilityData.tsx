// import { useQuery } from '@/hooks/useQuery';

// import { useContract } from '@/context/contract/ContractContextProvider';

// import { CONTRACT_MESSAGES } from '@/types/enums';
// import { GetAvailabilityInfoInput } from '@/types/schemaTypes';

// export const useGetMemberInfo = (
//   initialArgValues: GetAvailabilityInfoInput
// ) => {
//   const { contract } = useContract();

//   const messageInfo = contract?.abi?.findMessage(
//     CONTRACT_MESSAGES.GET_AVAILABILITY_DATA
//   );

//   return useQuery<{ }, GetAvailabilityInfoInput>(messageInfo, {
//     initialArgValues,
//     skip: !initialArgValues.memberAddress,
//   });
// };
export {};
