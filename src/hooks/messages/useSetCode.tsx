import { useState } from 'react';
import { ValidationError } from 'yup';

import { useQuery } from '@/hooks/useQuery';

import { useContract } from '@/context/contract/ContractContextProvider';
import { setCodeInputSchema } from '@/helpers/schemas';
import { validateSchema } from '@/helpers/validateSchema';

import { CONTRACT_MESSAGES } from '@/types/enums';
import { SetCodeInput } from '@/types/schemaTypes';

export const useSetCode = () => {
  const { contract } = useContract();
  const [validationErrors, setValidationErrors] =
    useState<ValidationError | null>(null);

  const messageInfo = contract?.abi?.findMessage(CONTRACT_MESSAGES.SET_CODE);

  const queryInfo = useQuery<unknown, SetCodeInput>(messageInfo, {
    mutate: true,
  });

  const mutate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationError = await validateSchema(
      setCodeInputSchema,
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
    schema: setCodeInputSchema,
    validationErrors,
  };
};
