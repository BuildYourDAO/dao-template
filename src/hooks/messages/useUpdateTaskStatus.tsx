import { useState } from 'react';
import { ValidationError } from 'yup';

import { useQuery } from '@/hooks/useQuery';

import { useContract } from '@/context/contract/ContractContextProvider';
import { updateTaskStatusInputSchema } from '@/helpers/schemas';
import { validateSchema } from '@/helpers/validateSchema';

import { CONTRACT_MESSAGES } from '@/types/enums';
import { UpdateTaskStatusInput } from '@/types/schemaTypes';

export const useUpdateTaskStatus = (
  initialArgValues?: UpdateTaskStatusInput
) => {
  const { contract } = useContract();
  const [validationErrors, setValidationErrors] =
    useState<ValidationError | null>(null);

  const messageInfo = contract?.abi?.findMessage(
    CONTRACT_MESSAGES.UPDATE_TAKS_STATUS
  );

  const queryInfo = useQuery<unknown, UpdateTaskStatusInput>(messageInfo, {
    mutate: true,
    initialArgValues,
  });

  const mutate = async (manualArgs?: UpdateTaskStatusInput) => {
    const argValues = manualArgs || queryInfo.argValues;
    const validationError = await validateSchema(
      updateTaskStatusInputSchema,
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
    schema: updateTaskStatusInputSchema,
    validationErrors,
  };
};
