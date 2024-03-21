import { useState } from 'react';
import { ValidationError } from 'yup';

import { useQuery } from '@/hooks/useQuery';

import { useContract } from '@/context/contract/ContractContextProvider';
import { changeDaoAdminSchema } from '@/helpers/schemas';
import { validateSchema } from '@/helpers/validateSchema';

import { CONTRACT_MESSAGES } from '@/types/enums';
import { ChangeDaoAdminInput } from '@/types/schemaTypes';

export const useChangeDaoAdmin = (initialArgValues?: ChangeDaoAdminInput) => {
  const { contract } = useContract();
  const [validationErrors, setValidationErrors] =
    useState<ValidationError | null>(null);

  const messageInfo = contract?.abi?.findMessage(
    CONTRACT_MESSAGES.CHANGE_DAO_ADMIN
  );

  const queryInfo = useQuery<unknown, ChangeDaoAdminInput>(messageInfo, {
    mutate: true,
    initialArgValues,
  });

  const mutate = async () => {
    const validationError = await validateSchema(
      changeDaoAdminSchema,
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
    schema: changeDaoAdminSchema,
    validationErrors,
  };
};
