// Copyright 2022 @paritytech/contracts-ui authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import { useMemo, useState } from 'react';

import { getInputData } from '@/helpers/getInputData';

import { AbiMessage, Registry, SetState } from '@/types';

// function fromArgs<T>(
//   registry: Registry,
//   accounts: Account[],
//   args: AbiParam[]
// ) {
//   const result = {} as T;

//   args?.forEach(({ name, type }) => {
//     result[name as keyof T] = getInitValue(
//       registry,
//       accounts,
//       type
//     ) as T[keyof T];
//   });

//   return result;
// }

//eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useArgValues<T>(
  message: AbiMessage | undefined,
  registry: Registry,
  initialArgValues?: T
): [T, SetState<T>, Uint8Array | undefined] {
  const [value, setValue] = useState<T>(initialArgValues || ({} as T));

  const inputData = useMemo(() => {
    return getInputData(message, registry, value);
  }, [value, registry, message]);

  return [value, setValue, inputData];
}
