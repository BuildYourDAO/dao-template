import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Card, Form, Hero, Select } from 'react-daisyui';

import { setToLocalStorage } from '@/lib/helper';

import Button from '@/components/buttons/Button';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import { LOCAL_STORAGE_ADDRESS_KEY } from '@/config';
import {
  useSubstrate,
  useSubstrateState,
} from '@/context/substrate/SubstrateContextProvider';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  const router = useRouter();
  const { setCurrentAccount } = useSubstrate();
  const { keyring } = useSubstrateState();
  const { accounts } = useSubstrateState();

  const [address, setAddress] = useState<string>(accounts[0].address);

  const login = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (address) {
      const account = keyring.getAccount(address);
      setCurrentAccount(account!);
      setToLocalStorage(LOCAL_STORAGE_ADDRESS_KEY, account!.address);

      router.push('/');
    }
  };

  return (
    <Layout>
      <Seo templateTitle='Login' />

      <main>
        <Hero className='mt-28'>
          <Hero.Content className='flex-col items-center justify-center lg:flex-row-reverse'>
            <div className='text-center lg:text-left'>
              <h1 className='text-5xl font-bold'>Login now!</h1>
              <p className='py-6'>
                Provident cupiditate voluptatem et in. Quaerat fugiat ut
                assumenda excepturi exercitationem quasi. In deleniti eaque aut
                repudiandae et a id nisi.
              </p>
            </div>
            <Card className='bg-base-100 w-full max-w-sm flex-shrink-0 shadow-2xl'>
              <Card.Body>
                <Form onSubmit={(e) => login(e)}>
                  <label className='label'>
                    <span className='label-text'>Choose member account</span>
                  </label>
                  <Select
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder='Account Address'
                    className='w-full'
                    defaultValue={accounts[0]?.address}
                  >
                    {accounts &&
                      accounts.map((account) => (
                        <option key={account.address} value={account.address}>
                          {account.meta.name}
                        </option>
                      ))}
                  </Select>
                  <Button type='submit' className='mt-6'>
                    Login
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Hero.Content>
        </Hero>
      </main>
    </Layout>
  );
}
