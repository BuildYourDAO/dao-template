import { useState } from 'react';
import { ValidationError } from 'yup';

import { useQuery } from '@/hooks/useQuery';

import { useContract } from '@/context/contract/ContractContextProvider';
import { addStakeInputSchema } from '@/helpers/schemas';
import { validateSchema } from '@/helpers/validateSchema';

import { CONTRACT_MESSAGES } from '@/types/enums';
import { addStakeInput } from '@/types/schemaTypes';

export const useAddStake = (initialArgValues?: addStakeInput) => {
  const { contract } = useContract();
  const [validationErrors, setValidationErrors] =
    useState<ValidationError | null>(null);

  const messageInfo = contract?.abi?.findMessage(CONTRACT_MESSAGES.ADD_STAKE);
  const queryInfo = useQuery<unknown, addStakeInput>(messageInfo, {
    mutate: true,
    initialArgValues,
  });

  const mutate = async (manualArgs?: addStakeInput) => {
    const argValues = manualArgs || queryInfo.argValues;
    const validationError = await validateSchema(
      addStakeInputSchema,
      argValues
    );

    if (validationError) {
      return setValidationErrors(validationError);
    }

    return await queryInfo.query(messageInfo, argValues || undefined);
  };

  return {
    ...queryInfo,
    mutate,
    schema: addStakeInputSchema,
    validationErrors,
  };
};
