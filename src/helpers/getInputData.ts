import { AbiMessage } from '@polkadot/api-contract/types';

import { transformUserInput } from '@/helpers/callOptions';

import { Registry } from '@/types';

export const getInputData = <T>(
  message: AbiMessage | undefined,
  registry: Registry,
  value: T
) => {
  let data: Uint8Array | undefined;
  try {
    data = message?.toU8a(transformUserInput(registry, message.args, value));
  } catch (e) {
    console.error(e);
  }
  return data;
};
