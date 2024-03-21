import { useState } from 'react';
import { ValidationError } from 'yup';

import { useQuery } from '@/hooks/useQuery';

import { useContract } from '@/context/contract/ContractContextProvider';
import { addDaoAsMemberInputSchema } from '@/helpers/schemas';
import { validateSchema } from '@/helpers/validateSchema';

import { CONTRACT_MESSAGES } from '@/types/enums';
import { AddDaoAsMemberInput } from '@/types/schemaTypes';

export const useAddDaoAsMember = (initialArgValues?: AddDaoAsMemberInput) => {
  const { contract } = useContract();
  const [validationErrors, setValidationErrors] =
    useState<ValidationError | null>(null);

  const messageInfo = contract?.abi?.findMessage(
    CONTRACT_MESSAGES.ADD_DAO_AS_MEMBER
  );

  const queryInfo = useQuery<unknown, AddDaoAsMemberInput>(messageInfo, {
    mutate: true,
    initialArgValues,
  });

  const mutate = async () => {
    const validationError = await validateSchema(
      addDaoAsMemberInputSchema,
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
    schema: addDaoAsMemberInputSchema,
    validationErrors,
  };
};
