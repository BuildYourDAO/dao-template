import React, { useContext, useEffect } from 'react';

import { useAddStakeForOwner, useSetDaoId } from '@/hooks/messages';

import { useContract } from '@/context/contract/ContractContextProvider';
import { OnContractLoadContext } from '@/context/OnContractLoad/OnContractLoadContext';

interface OnContractLoadContextProviderProps {
  children: React.ReactNode | null;
  [key: string]: unknown;
}

const OnContractLoadContextProvider = (
  props: OnContractLoadContextProviderProps
) => {
  const { contract } = useContract();

  const { mutate: addStakeForOwnerMutate } = useAddStakeForOwner();
  const { mutate: setDaoIdMutate } = useSetDaoId();

  useEffect(() => {
    if (contract) {
      addStakeForOwnerMutate();
      setDaoIdMutate();
    }
  }, [contract]);
  return (
    <OnContractLoadContext.Provider value={{}}>
      {props.children}
    </OnContractLoadContext.Provider>
  );
};

const useOnContractLoad = () => useContext(OnContractLoadContext);

export {
  OnContractLoadContext,
  OnContractLoadContextProvider,
  useOnContractLoad,
};
