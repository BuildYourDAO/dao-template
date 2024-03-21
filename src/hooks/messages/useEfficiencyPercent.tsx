import { useQuery } from '@/hooks/useQuery';

import { useContract } from '@/context/contract/ContractContextProvider';

import { CONTRACT_MESSAGES } from '@/types/enums';
import { EfficiencyPercentInput } from '@/types/schemaTypes';

export const useEfficiencyPercent = (
  initialArgValues: EfficiencyPercentInput
) => {
  const { contract } = useContract();

  const messageInfo = contract?.abi?.findMessage(
    CONTRACT_MESSAGES.EFFICIENCY_PERCENT
  );

  return useQuery<unknown, EfficiencyPercentInput>(messageInfo, {
    initialArgValues,
    skip: !initialArgValues.member_address,
  });
};
