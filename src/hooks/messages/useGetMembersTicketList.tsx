import { useState } from 'react';
import { ValidationError } from 'yup';

import { useQuery } from '@/hooks/useQuery';

import { useContract } from '@/context/contract/ContractContextProvider';
import { getTaskInfoInputSchema } from '@/helpers/schemas';
import { validateSchema } from '@/helpers/validateSchema';

import { CONTRACT_MESSAGES } from '@/types/enums';
import { GetTaskInfoInput } from '@/types/schemaTypes';

export const useGetTaskOfMember = () => {
  const { contract } = useContract();
  const [validationErrors, setValidationErrors] =
    useState<ValidationError | null>(null);

  const messageInfo = contract?.abi?.findMessage(
    CONTRACT_MESSAGES.GET_TICKET_LIST_OF_MEMBER
  );
  const queryInfo = useQuery<unknown, GetTaskInfoInput>(messageInfo, {
    mutate: true,
  });

  const mutate = async () => {
    const validationError = await validateSchema(
      getTaskInfoInputSchema,
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
    schema: getTaskInfoInputSchema,
    validationErrors,
  };
};
