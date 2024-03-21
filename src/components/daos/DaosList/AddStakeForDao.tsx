import { FormEvent, useCallback, useState } from 'react';
import { Button, Input, Modal } from 'react-daisyui';
import { toast } from 'react-hot-toast';

import { useAddStakeForDao, UseTransfertocontract } from '@/hooks/messages';

interface AddStakeForDaoProsps {
  children?: React.ReactNode;
  toggleVisible: () => void;
}

export const AddStakeForDao: React.FC<AddStakeForDaoProsps> = ({
  toggleVisible,
}) => {
  const [amount, setAmount] = useState(0);
  const { loading: addStakeLoading, mutate: addStakeMutate } =
    useAddStakeForDao();
  const { mutate: tranferBalanceToContractMutate } = UseTransfertocontract();

  const transferToContract = useCallback(async () => {
    const mutateValue = await tranferBalanceToContractMutate();

    if (mutateValue) {
      if (mutateValue.isError)
        return toast.error(mutateValue.decodedOutput || 'An error occurred');

      toast.success('Stake added');
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
      <Modal.Header className='font-bold'>Add Stake For Dao</Modal.Header>
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
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </Modal.Body>

        <Modal.Actions>
          <Button
            disabled={addStakeLoading}
            loading={addStakeLoading}
            type='submit'
          >
            Add Stake
          </Button>
        </Modal.Actions>
      </form>
    </>
  );
};
