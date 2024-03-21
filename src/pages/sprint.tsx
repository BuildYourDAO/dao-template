import React, { useEffect } from 'react';
import toast from 'react-hot-toast';

import { useIsMember } from '@/hooks/messages';

import Layout from '@/components/layout/Layout';
import { LoadingSpinner } from '@/components/loading';
import Seo from '@/components/Seo';
import { SprintList } from '@/components/sprints/SprintList';

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

export default function SprintssPage() {
  const { loading, decodedOutput } = useIsMember();
  const isMember = decodedOutput?.value;

  const { logout } = useSubstrate();
  const { currentAccount } = useSubstrateState();

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <Seo templateTitle='Sprint' />

      <main>
        <h1 className='text-center'>Projects</h1>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <>{isMember ? <SprintList /> : <p>You are not a member.</p>}</>
        )}
      </main>
    </Layout>
  );
}
