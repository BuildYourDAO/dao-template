import { useQuery } from '@/hooks/useQuery';

import { useContract } from '@/context/contract/ContractContextProvider';

import { CONTRACT_MESSAGES } from '@/types/enums';

export const useRedeemStake = () => {
  const { contract } = useContract();

  const messageInfo = contract?.abi?.findMessage(
    CONTRACT_MESSAGES.REDEEM_STAKE
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
  };
};
