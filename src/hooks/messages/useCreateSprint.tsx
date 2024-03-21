import { useState } from 'react';
import { ValidationError } from 'yup';

import { useQuery } from '@/hooks/useQuery';

import { useContract } from '@/context/contract/ContractContextProvider';
import { createSprintInputSchema } from '@/helpers/schemas';

import { CONTRACT_MESSAGES } from '@/types/enums';
import { CreateSprintInput } from '@/types/schemaTypes';

export const UseCreateSprint = () => {
  const { contract } = useContract();
  const [validationErrors, setValidationErrors] =
    useState<ValidationError | null>(null);

  const messageInfo = contract?.abi?.findMessage(
    CONTRACT_MESSAGES.CREATE_SPRINT
  );

  const queryInfo = useQuery<CreateSprintInput>(messageInfo, { mutate: true });

  const mutate = async () => {
    const validationError = await validateSchema(
      createSprintInputSchema,
      queryInfo.argValues
    );

    if (validationError) {
      return setValidationErrors(validationError);
    }

    await queryInfo.query(messageInfo);
  };

  return {
    ...queryInfo,
    mutate,
    schema: createSprintInputSchema,
    validationErrors,
  };
};
