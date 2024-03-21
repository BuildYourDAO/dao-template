import React, { useEffect } from 'react';
import { Hero } from 'react-daisyui';
import toast from 'react-hot-toast';

import { useIsMember } from '@/hooks/messages';

import { DaoStats } from '@/components/dao';
import { DaoInfo } from '@/components/dao/DaoInfo';
import Layout from '@/components/layout/Layout';
import { LoadingSpinner } from '@/components/loading';
import Seo from '@/components/Seo';

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
  const { loading, decodedOutput } = useIsMember();
  const { currentAccount } = useSubstrateState();
  const { logout } = useSubstrate();
  const isMember = decodedOutput?.value;

  useEffect(() => {
    if (currentAccount && !loading && decodedOutput?.value === false) {
      toast.error('not a member');

      // Check if the user is not a member before calling logout
      if (!isMember) {
        logout();
      }
    }
  }, [decodedOutput, logout, isMember, currentAccount, loading]);

  return (
    <Layout>
      <Seo templateTitle='Dashboard' />

      <main>
        <Hero>
          <Hero.Content className='text-center'>
            <div className='max-w-md'>
              <h1 className='text-5xl font-bold'>Dashboard</h1>
              <p className='py-6'>Welcome to your DAO dashboard</p>
            </div>
          </Hero.Content>
        </Hero>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {isMember ? (
              <div className='mt-10 w-full px-10'>
                <DaoStats />
                <DaoInfo />
              </div>
            ) : (
              <p>You are not a member.</p>
            )}
          </>
        )}
      </main>
    </Layout>
  );
}
