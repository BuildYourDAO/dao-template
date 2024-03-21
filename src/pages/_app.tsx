import { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';

import '@/styles/globals.css';
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
import '@/styles/colors.css';

import { AwaitApis } from '@/components/AwaitApi';

import { ContractContextProvider } from '@/context/contract/ContractContextProvider';
import { SubstrateContextProvider } from '@/context/substrate/SubstrateContextProvider';
import { ThemeContextProvider } from '@/context/theme/ThemeContextProvider';
import { UserContextProvider } from '@/context/user/UserContextProvider';

/**
 * !STARTERCONF info
 * ? `Layout` component is called in every page using `np` snippets. If you have consistent layout across all page, you can add it here too
 */

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeContextProvider>
      <SubstrateContextProvider>
        <AwaitApis>
          <ContractContextProvider>
            {/* <OnContractLoadContextProvider> */}
            <UserContextProvider>
              {/* <PrivateRoute> */}
              <>
                <Toaster />
                <Component {...pageProps} />
              </>
              {/* </PrivateRoute> */}
            </UserContextProvider>
            {/* </OnContractLoadContextProvider> */}
          </ContractContextProvider>
        </AwaitApis>
      </SubstrateContextProvider>
    </ThemeContextProvider>
  );
}

export default MyApp;
