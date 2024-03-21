import { FormEvent, useCallback, useState } from 'react';
import { Button, Input, Modal } from 'react-daisyui';
import { toast } from 'react-hot-toast';

import { useAddStake, UseTransfertocontract } from '@/hooks/messages';

import { useSubstrateState } from '@/context/substrate/SubstrateContextProvider';
import { toBalance } from '@/helpers/bn';

interface AddStakeProsps {
  children?: React.ReactNode;
  toggleVisible: () => void;
  refetchStakes: () => void;
}

export const AddStake: React.FC<AddStakeProsps> = ({
  toggleVisible,
  refetchStakes,
}) => {
  const { api } = useSubstrateState();
  const [amount, setAmount] = useState(0);
  const { loading: addStakeLoading, mutate: addStakeMutate } = useAddStake();
  const {
    mutate: tranferBalanceToContractMutate,
    loading: transferBalanceToContractLoading,
    setBalanceValue,
  } = UseTransfertocontract();

  const transferToContract = useCallback(async () => {
    const mutateValue = await tranferBalanceToContractMutate();

    if (mutateValue) {
      if (mutateValue.isError)
        return toast.error(mutateValue.decodedOutput || 'An error occurred');

      toast.success('Stake added');
      refetchStakes();
    }
  }, [tranferBalanceToContractMutate]);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const mutateValue = await addStakeMutate({ amount });

      if (mutateValue) {
        if (mutateValue.isError)
          return toast.error(mutateValue.decodedOutput || 'An error occurred');

        transferToContract();
      }

      toggleVisible();
    },
    [addStakeMutate, transferToContract, amount]
  );

  return (
    <>
      <Modal.Header className='font-bold'>Add Stake</Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <label className='label'>
            <span className='label-text'>amount</span>
          </label>
          <Input
            name='name'
            className='w-full'
            placeholder='amount'
            type='number'
            value={amount}
            onChange={(e) => {
              const numericValue = Number(e.target.value);
              const bn = toBalance(api, e.target.value);

              setAmount(numericValue);
              setBalanceValue(bn);
            }}
          />
        </Modal.Body>

        <Modal.Actions>
          <Button
            disabled={addStakeLoading || transferBalanceToContractLoading}
            loading={addStakeLoading || transferBalanceToContractLoading}
            type='submit'
          >
            Add Stake
          </Button>
        </Modal.Actions>
      </form>
    </>
  );
};
