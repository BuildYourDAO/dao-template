// Copyright 2022 @paritytech/contracts-ui authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import { DecodedEvent } from '@polkadot/api-contract/types';
import { keyring } from '@polkadot/ui-keyring';
import BN from 'bn.js';

import type {
  AbiMessage,
  Balance,
  ContractPromise,
  EventRecord,
  RegistryError,
  WeightV2,
} from '../substrate';

export interface ContractDryRunParams {
  contract: ContractPromise;
  message: AbiMessage;
  payment: BN;
  address: string;
  argValues?: Record<string, unknown>;
}

export interface CallResult {
  id: number;
  events: EventRecord[];
  contractEvents?: DecodedEvent[];
  message: AbiMessage;
  error?: RegistryError;
  time: number;
}

export type UIStorageDeposit = {
  value?: Balance;
  type: 'charge' | 'refund' | 'empty';
};

export interface QueryMessageProps {
  currentAccountAddress: string;
  contractAddress: string;
  balance: Balance;
  gasLimit: WeightV2 | null;
  storageDepositLimit: Balance | null;
  value: unknown;
}

export type Flatten<Type> = Type extends Array<infer Item> ? Item : Type;
export type Account = Flatten<Awaited<ReturnType<typeof keyring.getAccounts>>>;
