import { useState } from 'react';
import { ValidationError } from 'yup';

import { useQuery } from '@/hooks/useQuery';

import { useContract } from '@/context/contract/ContractContextProvider';
import { sendFundsInputSchema } from '@/helpers/schemas';
import { validateSchema } from '@/helpers/validateSchema';

import { CONTRACT_MESSAGES } from '@/types/enums';
import { SendFundsInput } from '@/types/schemaTypes';

export const useAddFunds = (initialArgValues?: SendFundsInput) => {
  const { contract } = useContract();
  const [validationErrors, setValidationErrors] =
    useState<ValidationError | null>(null);

  const messageInfo = contract?.abi?.findMessage(CONTRACT_MESSAGES.SEND_FUNDS);
  const queryInfo = useQuery<unknown, SendFundsInput>(messageInfo, {
    mutate: true,
    initialArgValues,
  });

  const mutate = async () => {
    const validationError = await validateSchema(
      sendFundsInputSchema,
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
    schema: sendFundsInputSchema,
    validationErrors,
  };
};
