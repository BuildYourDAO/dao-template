import { useCallback, useEffect, useMemo, useState } from 'react';
import { BN_ZERO } from 'src/helpers/bn';
import type {
  AbiMessage,
  Balance,
  BN,
  ContractExecResult,
  ContractOptions,
  ISubmittableResult,
  QueryMessageProps,
} from 'src/types';

import { useArgValues } from '@/hooks/useArgValues';
import { useBalance } from '@/hooks/useBalance';
import { useStorageDepositLimit } from '@/hooks/useStorageDepositLimit';
import { useWeight } from '@/hooks/useWeight';

import { useContract } from '@/context/contract/ContractContextProvider';
import { useSubstrateState } from '@/context/substrate/SubstrateContextProvider';
import { getDecodedOutput } from '@/helpers/api/output';
import {
  decodeStorageDeposit,
  getGasLimit,
  getStorageDepositLimit,
} from '@/helpers/callOptions';
import { getInputData } from '@/helpers/getInputData';

type QueryOptions<T> = {
  mutate?: boolean;
  initialArgValues?: T;
  skip?: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useQuery<DecodedValueType = unknown, ArgValueType = unknown>(
  argMessage?: AbiMessage,
  queryOptions: QueryOptions<ArgValueType> = { mutate: false }
) {
  const { currentAccount, api } = useSubstrateState();
  const { callMessage, queryMessage, contract } = useContract();
  const { value: balanceValue, onChange: setBalanceValue } = useBalance();

  const [message, setMessage] = useState<AbiMessage>();
  const [outcome, setOutcome] = useState<ContractExecResult>(
    {} as ContractExecResult
  );
  const [result, setResult] = useState<ISubmittableResult>();
  const [argValues, setArgValues, inputData] = useArgValues<ArgValueType>(
    message,
    api?.registry,
    queryOptions.initialArgValues
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>();
  const storageDepositLimit = useStorageDepositLimit(currentAccount?.address);
  const refTime = useWeight(outcome.gasRequired?.refTime.toBn());
  const proofSize = useWeight(outcome.gasRequired?.proofSize.toBn());
  const isCustom = refTime.mode === 'custom' || proofSize.mode === 'custom';

  const decodedOutput = useMemo(() => {
    if (message && Object.keys(outcome).length && contract?.abi?.registry) {
      return getDecodedOutput<DecodedValueType>(
        outcome,
        message,
        contract.abi.registry
      );
    }

    return null; // Return null if decoding is not possible yet
  }, [message, outcome, contract]);

  const params: QueryMessageProps = useMemo(() => {
    return {
      currentAccountAddress: currentAccount?.address as string,
      contractAddress: contract?.address?.toString(),
      balance: message?.isPayable
        ? api.registry.createType<Balance>('Balance', 1)
        : api.registry.createType<Balance>('Balance', BN_ZERO),
      gasLimit: getGasLimit(
        isCustom,
        refTime.limit,
        proofSize.limit,
        api.registry
      ),
      storageDepositLimit: getStorageDepositLimit(
        false,
        storageDepositLimit.value,
        api.registry
      ),
      value: inputData ?? '',
    };
  }, [
    currentAccount,
    contract,
    proofSize.limit,
    refTime.limit,
    storageDepositLimit.value,
    api.registry,
    isCustom,
    inputData,
    message,
  ]);

  const dryRun = useCallback(
    async (message: AbiMessage, args?: ArgValueType) => {
      const manualArgValueInputData = args
        ? getInputData(message, api.registry, args)
        : undefined;

      const o = await queryMessage({
        ...params,
        value: manualArgValueInputData || params.value,
      });
      setOutcome(o);
      return o;
    },
    [queryMessage, params, api.registry]
  );

  const call = useCallback(
    async (
      message: AbiMessage,
      outcome: ContractExecResult,
      balanceValue: BN,
      manualArgs?: ArgValueType
    ) => {
      if (!message) return setError({ message: 'Message was not selected' });
      const { storageDeposit, gasRequired } = outcome;
      const { value: userInput } = storageDepositLimit;
      const predictedStorageDeposit = decodeStorageDeposit(storageDeposit);

      const options: ContractOptions = {
        gasLimit:
          getGasLimit(isCustom, refTime.limit, proofSize.limit, api.registry) ??
          gasRequired,
        storageDepositLimit: getStorageDepositLimit(
          false,
          userInput,
          api.registry,
          predictedStorageDeposit
        ),
        value: message?.isPayable ? balanceValue : undefined,
      };

      if (queryOptions.mutate) {
        await callMessage<ArgValueType>(
          message,
          options,
          manualArgs || argValues,
          (res) => setResult(res)
        );
      }
    },
    [
      storageDepositLimit,
      callMessage,
      api.registry,
      params,
      proofSize.limit,
      refTime.limit,
      isCustom,
      argValues,
      queryOptions.mutate,
    ]
  );

  const query = useCallback(
    async (message: AbiMessage, args?: ArgValueType) => {
      let o;

      try {
        o = await dryRun(message, args);
        setLoading(true);
        await call(message, o, balanceValue, args);
        setLoading(false);

        return getDecodedOutput<DecodedValueType>(
          o,
          message,
          contract?.abi.registry
        );
      } catch (error) {
        setError(error);
        setLoading(false);

        console.log('error ', error);

        if (o) {
          return getDecodedOutput<DecodedValueType>(
            o,
            message,
            contract?.abi.registry
          );
        }
      }
    },
    [call, dryRun, contract, decodedOutput]
  );

  useEffect(() => {
    if (argMessage && contract?.abi) {
      setMessage(argMessage);
    }
  }, [argMessage, contract?.abi]);

  useEffect(() => {
    if (queryOptions.skip) return;

    if (message && !queryOptions.mutate && !decodedOutput) {
      setLoading(true);
      query(message)
        .then(() => setLoading(false))
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message, queryOptions.mutate, queryOptions.skip, decodedOutput, query]);

  const refetch = () => {
    setLoading(true);
    query(message!)
      .then(() => setLoading(false))
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  const returnValues = {
    outcome,
    result,
    loading,
    error,
    storageDepositLimit,
    refTime,
    proofSize,
    message,
    setMessage,
    query,
    decodedOutput,
    argValues,
    setArgValues,
    inputData,
    refetch,
    balanceValue,
    setBalanceValue,
  };

  return returnValues;
}
