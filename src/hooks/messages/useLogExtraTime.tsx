import { useState } from 'react';
import { ValidationError } from 'yup';

import { useQuery } from '@/hooks/useQuery';

import { useContract } from '@/context/contract/ContractContextProvider';
import { timeLogInputSchema } from '@/helpers/schemas';
import { validateSchema } from '@/helpers/validateSchema';

import { CONTRACT_MESSAGES } from '@/types/enums';
import { TimeLogInput } from '@/types/schemaTypes';

export const useExtraTimeLog = (initialArgValues?: TimeLogInput) => {
  const { contract } = useContract();
  const [validationErrors, setValidationErrors] =
    useState<ValidationError | null>(null);

  const messageInfo = contract?.abi?.findMessage(
    CONTRACT_MESSAGES.TIME_EXTRA_LOG
  );

  const queryInfo = useQuery<unknown, TimeLogInput>(messageInfo, {
    mutate: true,
    initialArgValues,
  });

  const mutate = async () => {
    const validationError = await validateSchema(
      timeLogInputSchema,
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
    schema: timeLogInputSchema,
    validationErrors,
  };
};
