import { useState } from 'react';
import { ValidationError } from 'yup';

import { useQuery } from '@/hooks/useQuery';

import { useContract } from '@/context/contract/ContractContextProvider';
import { closeTaskInputSchema } from '@/helpers/schemas';

import { CONTRACT_MESSAGES } from '@/types/enums';
import { CloseTaskInput } from '@/types/schemaTypes';

export const useCloseTicket = () => {
  const { contract } = useContract();
  const [validationErrors, setValidationErrors] =
    useState<ValidationError | null>(null);

  const messageInfo = contract?.abi?.findMessage(CONTRACT_MESSAGES.CLOSE_TASK);

  const queryInfo = useQuery<CloseTaskInput>(messageInfo, { mutate: true });

  const mutate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationError = await validateSchema(
      closeTaskInputSchema,
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
    schema: closeTaskInputSchema,
    validationErrors,
  };
};
