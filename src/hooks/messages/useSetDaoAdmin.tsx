import { useState } from 'react';
import { ValidationError } from 'yup';

import { useQuery } from '@/hooks/useQuery';

import { useContract } from '@/context/contract/ContractContextProvider';
import { setDaoAdminInputSchema } from '@/helpers/schemas';

import { CONTRACT_MESSAGES } from '@/types/enums';
import { SetDaoAdminInput } from '@/types/schemaTypes';

export const useSetDaoAdmin = () => {
  const { contract } = useContract();
  const [validationErrors, setValidationErrors] =
    useState<ValidationError | null>(null);

  const messageInfo = contract?.abi?.findMessage(
    CONTRACT_MESSAGES.SET_DAO_ADMIN
  );

  const queryInfo = useQuery<SetDaoAdminInput>(messageInfo, { mutate: true });

  const mutate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationError = await validateSchema(
      setDaoAdminInputSchema,
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
    schema: setDaoAdminInputSchema,
    validationErrors,
  };
};
