import type BN from 'bn.js';
import { useEffect, useState } from 'react';
import { BN_ZERO } from 'src/helpers/bn';
import type { OrFalsy, UseStorageDepositLimit } from 'src/types';

import { useSubstrateState } from '@/context/substrate/SubstrateContextProvider';

import { useBalance } from './useBalance';

export function useStorageDepositLimit(
  accountId: OrFalsy<string>
): UseStorageDepositLimit {
  const { api } = useSubstrateState();
  const [maximum, setMaximum] = useState<BN>();

  const storageDepositLimit = useBalance(BN_ZERO, { maxValue: maximum });

  useEffect((): void => {
    accountId &&
      api.derive.balances
        .account(accountId)
        .then(({ freeBalance }) => setMaximum(freeBalance))
        .catch(console.error);
  }, [accountId, api]);

  return {
    ...storageDepositLimit,
    maximum,
  };
}
