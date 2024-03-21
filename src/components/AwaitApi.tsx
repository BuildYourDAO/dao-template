// Copyright 2022 @paritytech/contracts-ui authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import { HTMLAttributes, useEffect, useState } from 'react';
import { Kbd } from 'react-daisyui';
import { isKeyringLoaded } from 'src/helpers/util';

import { LoadingSpinner } from '@/components/loading/Loading';

import { useContract } from '@/context/contract/ContractContextProvider';
import { useSubstrateState } from '@/context/substrate/SubstrateContextProvider';

export function AwaitApis({
  children,
}: HTMLAttributes<HTMLDivElement>): React.ReactElement {
  const { accounts, chainProps, apiState } = useSubstrateState();
  const { contractLoading } = useContract();
  const [web3Injected, setWeb3Injected] = useState(false);

  useEffect(() => {
    (async () => {
      const { isWeb3Injected } = await import('@polkadot/extension-dapp');

      setWeb3Injected(isWeb3Injected);
    })();
  }, [web3Injected]);

  if (apiState === 'ERROR') {
    return <h1>error connection</h1>;
  }

  if (
    !web3Injected &&
    apiState === 'READY' &&
    !chainProps?.systemChainType.isDevelopment &&
    isKeyringLoaded()
  ) {
    return <h1>extension error</h1>;
  }

  if (isKeyringLoaded() && accounts?.length === 0) {
    return <h1>accounts error</h1>;
  }

  return (
    <>
      {apiState !== 'READY' || contractLoading || !isKeyringLoaded() ? (
        <div className='flex h-screen w-screen items-center justify-center'>
          <div className='flex flex-col items-center rounded-lg p-8 shadow-md'>
            <div className='mb-10'>
              <Kbd className='text-3xl' size='lg'>
                D
              </Kbd>
              <Kbd className='mx-5 text-3xl' size='lg'>
                A
              </Kbd>
              <Kbd className='text-3xl' size='lg'>
                O
              </Kbd>
            </div>
            <LoadingSpinner size='md' />
          </div>
        </div>
      ) : (
        children
      )}
    </>
  );
}
