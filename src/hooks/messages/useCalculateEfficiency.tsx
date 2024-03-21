import { useState } from 'react';
import { ValidationError } from 'yup';

import { useQuery } from '@/hooks/useQuery';

import { useContract } from '@/context/contract/ContractContextProvider';
import { calculateEfficiencyInputSchema } from '@/helpers/schemas';

import { CONTRACT_MESSAGES } from '@/types/enums';
import { CalculateEfficiencyInput } from '@/types/schemaTypes';

export const useCalculateEfficiency = () => {
  const { contract } = useContract();
  const [validationErrors, setValidationErrors] =
    useState<ValidationError | null>(null);

  const messageInfo = contract?.abi?.findMessage(
    CONTRACT_MESSAGES.CALCULATE_EFFICIENCY
  );

  const queryInfo = useQuery<CalculateEfficiencyInput>(messageInfo, {
    mutate: true,
  });

  const mutate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationError = await validateSchema(
      calculateEfficiencyInputSchema,
      queryInfo.argValues
    );

    if (validationError) {
      return setValidationErrors(validationError);
    }

    queryInfo.query(messageInfo);
  };

  return {
    ...queryInfo,
    mutate,
    schema: calculateEfficiencyInputSchema,
    validationErrors,
  };
};
