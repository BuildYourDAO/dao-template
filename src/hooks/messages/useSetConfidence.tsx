import { useState } from 'react';
import { ValidationError } from 'yup';

import { useQuery } from '@/hooks/useQuery';

import { useContract } from '@/context/contract/ContractContextProvider';
import { setConfidenceSchema } from '@/helpers/schemas';
import { validateSchema } from '@/helpers/validateSchema';

import { CONTRACT_MESSAGES } from '@/types/enums';
import { SetConfidenceInput } from '@/types/schemaTypes';

export const useSetConfidence = (initialArgValues?: SetConfidenceInput) => {
  const { contract } = useContract();
  const [validationErrors, setValidationErrors] =
    useState<ValidationError | null>(null);

  const messageInfo = contract?.abi?.findMessage(
    CONTRACT_MESSAGES.SET_CONFIDENCE
  );
  const queryInfo = useQuery<unknown, SetConfidenceInput>(messageInfo, {
    mutate: true,
    initialArgValues,
  });

  const mutate = async (manualArgs: SetConfidenceInput) => {
    const argValues = manualArgs || queryInfo.argValues;
    const validationError = await validateSchema(
      setConfidenceSchema,
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
    schema: setConfidenceSchema,
    validationErrors,
  };
};
