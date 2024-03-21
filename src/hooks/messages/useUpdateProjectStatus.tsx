import { useState } from 'react';
import { ValidationError } from 'yup';

import { useQuery } from '@/hooks/useQuery';

import { useContract } from '@/context/contract/ContractContextProvider';
import { updateProjectStatusInputSchema } from '@/helpers/schemas';
import { validateSchema } from '@/helpers/validateSchema';

import { CONTRACT_MESSAGES } from '@/types/enums';
import { UpdateProjectStatusInput } from '@/types/schemaTypes';

export const useUpdateProjectStatus = (
  initialArgValues?: UpdateProjectStatusInput
) => {
  const { contract } = useContract();
  const [validationErrors, setValidationErrors] =
    useState<ValidationError | null>(null);

  const messageInfo = contract?.abi?.findMessage(
    CONTRACT_MESSAGES.UPDATE_PROJECT_STATUS
  );

  const queryInfo = useQuery<unknown, UpdateProjectStatusInput>(messageInfo, {
    mutate: true,
    initialArgValues,
  });

  const mutate = async () => {
    const validationError = await validateSchema(
      updateProjectStatusInputSchema,
      queryInfo.argValues
    );

    if (validationError) {
      return setValidationErrors(validationError);
    }

    return await queryInfo.query(messageInfo);
  };
  return {
    ...queryInfo,
    mutate,
    schema: updateProjectStatusInputSchema,
    validationErrors,
  };
};
