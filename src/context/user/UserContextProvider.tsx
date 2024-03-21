import React, { useContext, useEffect, useState } from 'react';

import { IGetMember } from '@/hooks/messages';
import { useGetMemberInfoByAddress } from '@/hooks/messages/useGetMemberInfoByAddress';

import { useSubstrateState } from '@/context/substrate/SubstrateContextProvider';
import { UserContext } from '@/context/user/UserContext';

interface UserContextProviderProps {
  children: React.ReactNode | null;
  [key: string]: unknown;
}

const UserContextProvider = (props: UserContextProviderProps) => {
  const { currentAccount } = useSubstrateState();
  const [user, setUser] = useState<IGetMember>();

  const { decodedOutput, loading } = useGetMemberInfoByAddress({
    memberAddress: currentAccount?.address as string,
  });

  useEffect(() => {
    if (decodedOutput && !decodedOutput.isError && decodedOutput.value) {
      setUser(decodedOutput.value.Ok);
    }
  }, [decodedOutput]);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {props.children}
    </UserContext.Provider>
  );
};

const useUser = () => useContext(UserContext);

export { UserContext, UserContextProvider, useUser };
