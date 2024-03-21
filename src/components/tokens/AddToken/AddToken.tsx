import { Dispatch, FormEvent, SetStateAction } from 'react';
import { Button, Modal, Select } from 'react-daisyui';

import { useAddDaoToken } from '@/hooks/messages';

import { useSubstrateState } from '@/context/substrate/SubstrateContextProvider';

import { TokenTypeEnum } from '@/types/enums';

interface AddTokenProps {
  children?: React.ReactNode;
  toggleVisible: Dispatch<SetStateAction<boolean>>;
}

export const AddToken: React.FC<AddTokenProps> = ({ toggleVisible }) => {
  const { accounts } = useSubstrateState();
  const { loading, mutate, decodedOutput } = useAddDaoToken();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await mutate(e);
    alert(decodedOutput?.decodedOutput);
    toggleVisible(false);
  };

  return (
    <>
      <Modal.Header className='font-bold'>Add Token</Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <label className='label'>
            <span className='label-text'>Dao Address</span>
          </label>
          <Select
            placeholder='Dao Address'
            className='w-full'
            // onChange={(event) =>
            //   setArgValues({ ...argValues, daoAddress: event.target.value })
            // }
            defaultValue={accounts[0].address}
          >
            {accounts &&
              accounts.map((account) => (
                <option key={account.address} value={account.address}>
                  {account.meta.name}
                </option>
              ))}
          </Select>

          <label className='label'>
            <span className='label-text'>Token Type</span>
          </label>
          <Select
            placeholder='Account Address'
            className='w-full'
            // onChange={(event) =>
            //   setArgValues({ ...argValues, tokenType: event.target.value })
            // }
          >
            {Object.values(TokenTypeEnum).map((tokenType) => (
              <option key={tokenType}>{tokenType}</option>
            ))}
          </Select>

          <label className='label'>
            <span className='label-text'>Token Address</span>
          </label>
          <Select
            placeholder='Token Address'
            className='w-full'
            // onChange={(event) =>
            //   setArgValues({ ...argValues, tokenAddress: event.target.value })
            // }
          >
            {accounts &&
              accounts.map((account) => (
                <option key={account.address} value={account.address}>
                  {account.meta.name}
                </option>
              ))}
          </Select>
        </Modal.Body>

        <Modal.Actions>
          <Button loading={loading} type='submit'>
            Add Project!
          </Button>
        </Modal.Actions>
      </form>
    </>
  );
};
