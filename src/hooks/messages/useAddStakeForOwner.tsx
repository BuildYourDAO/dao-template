import { useQuery } from '@/hooks/useQuery';

import { useContract } from '@/context/contract/ContractContextProvider';
import { addStakeInputSchema } from '@/helpers/schemas';

import { CONTRACT_MESSAGES } from '@/types/enums';

export const useAddStakeForOwner = () => {
  const { contract } = useContract();

  const messageInfo = contract?.abi?.findMessage(
    CONTRACT_MESSAGES.ADD_STAKE_FOR_OWNER
  );

  const queryInfo = useQuery(messageInfo, {
    mutate: true,
  });

  const mutate = async () => {
    return await queryInfo.query(messageInfo);
  };

  return {
    ...queryInfo,
    mutate,
    schema: addStakeInputSchema,
  };
};
