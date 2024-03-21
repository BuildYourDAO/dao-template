import { useCallback, useMemo, useState } from 'react';
import { Button, Divider, Input, Modal, Select } from 'react-daisyui';
import toast from 'react-hot-toast';
import { AiOutlinePlus } from 'react-icons/ai';
import { PieChart } from 'react-minimal-pie-chart';

import {
  useCheckContractBalance,
  useGetOwnership,
  useRedeemStake,
  useTransferBalance,
} from '@/hooks/messages';

import { AddStake } from '@/components/tokens/StakeToken';

import { useSubstrateState } from '@/context/substrate/SubstrateContextProvider';

const legendData = [
  {
    title: 'Ownership',
    color: '#E38627',
  },
  {
    title: 'Membership',
    color: '#6A2135',
  },
];

// import AnimatedPieChart from "./piechart";
// import AgeGraphic from './piechart';
interface TokenListProps {
  children?: React.ReactNode;
}

// ... (previous imports and code)
// ... (previous imports and code)

export const TokenList: React.FC<TokenListProps> = () => {
  const { accounts } = useSubstrateState();
  const { decodedOutput: ownershipDecodedOutput, refetch: ownershipRefetch } =
    useGetOwnership();
  const {
    decodedOutput: contractBalanceOutput,
    loading: checkContractBalanceLoading,
    refetch: checkContractBalanceRefetch,
  } = useCheckContractBalance();
  const {
    setArgValues,
    argValues,
    mutate: transferBalanceMutate,
    loading: transferBalanceLoading,
  } = useTransferBalance({
    account: accounts[0].address,
    balance: 0,
  });

  const { mutate, loading } = useRedeemStake();

  const [visible, setVisible] = useState<boolean>(false);
  const toggleVisible = () => {
    setVisible(!visible);
  };

  const { membershipPercentage, ownershipPercentage } = useMemo(() => {
    if (!ownershipDecodedOutput || ownershipDecodedOutput.isError)
      return {
        membershipPercentage: 0,
        ownershipPercentage: 0,
      };

    const ownershipPercentage = Number(ownershipDecodedOutput.value.Ok);
    const membershipPercentage =
      ownershipPercentage > 0 ? 100 - ownershipPercentage : 0;

    return { ownershipPercentage, membershipPercentage };
  }, [ownershipDecodedOutput]);

  const handleRedeem = useCallback(async () => {
    const mutateValue = await mutate();

    if (mutateValue) {
      if (mutateValue.isError)
        return toast.error(mutateValue.decodedOutput || 'An error occurred');

      ownershipRefetch();
      toast.success('Stake redeemed');
    }
  }, [mutate]);

  const tranferBalance = useCallback(async () => {
    const mutateValue = await transferBalanceMutate();

    if (mutateValue) {
      if (mutateValue.isError)
        return toast.error(mutateValue.decodedOutput || 'An error occurred');
    }
  }, []);

  return (
    <div>
      <Modal open={visible} onClickBackdrop={toggleVisible}>
        <AddStake
          toggleVisible={() => toggleVisible()}
          refetchStakes={() => ownershipRefetch()}
        />
      </Modal>
      <div className='bg-base-200 my-3 flex items-center justify-end rounded-xl p-3'>
        <div>
          <Button
            onClick={toggleVisible}
            startIcon={<AiOutlinePlus />}
            variant='outline'
            className='mr-2'
          >
            Add Stake
          </Button>
          <Button
            onClick={handleRedeem}
            loading={loading}
            startIcon={<AiOutlinePlus />}
          >
            Redeem Stake
          </Button>
        </div>
      </div>

      <Divider />

      <div className='flex flex-wrap items-start gap-3'>
        <div className='rounded-xl p-3 shadow-2xl'>
          <h1 className='mb-2 text-2xl'>
            Ownership & DAO Membership Pie Chart
          </h1>

          <div>
            <PieChart
              data={[
                {
                  title: 'Ownership',
                  value: ownershipPercentage,
                  color: '#E38627',
                },
                {
                  title: 'Membership',
                  value: membershipPercentage,
                  color: '#6A2135',
                },
              ]}
              radius={47}
              segmentsShift={(index) => (index === 0 ? 3 : 0.5)}
              label={({ dataEntry }) =>
                dataEntry.value != 0 ? `${dataEntry.value}%` : ''
              }
              labelStyle={{ fontSize: '4px' }}
              animate
              animationDuration={500}
              background='#777'
              className='h-[400px] w-[400px]'
            />

            <div>
              {legendData.map((legendItem) => (
                <div key={legendItem.title} className='mb-2 flex items-center'>
                  <div
                    className='mr-2 h-4 w-4'
                    style={{ backgroundColor: legendItem.color }}
                  ></div>
                  {legendItem.title}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='rounded-xl p-3 shadow-2xl'>
          <div className='flex justify-between'>
            <h1 className='mb-2 text-2xl'>Contract</h1>

            <Button
              onClick={checkContractBalanceRefetch}
              loading={checkContractBalanceLoading}
              disabled={checkContractBalanceLoading}
              variant='outline'
            >
              Check Balance
            </Button>
          </div>

          {contractBalanceOutput &&
          contractBalanceOutput.value &&
          !contractBalanceOutput.isError ? (
            <div>
              Contract Balance:{' '}
              <span className='font-bold'>
                {(contractBalanceOutput.value as { Ok: string }).Ok}
              </span>
            </div>
          ) : (
            ''
          )}

          <Divider />

          <div className='mb-3 rounded-xl p-3 shadow-2xl'>
            <h3 className='text-xl'>Transfers</h3>

            <div className='bg-base-200 mt-3 rounded-xl p-3 shadow-2xl'>
              <div className='flex space-x-2'>
                <Input
                  value={argValues.balance}
                  placeholder='balance'
                  type='number'
                  onChange={(e) =>
                    setArgValues((prevState) => ({
                      ...prevState,
                      balance: Number(e.target.value),
                    }))
                  }
                />
                <Select
                  placeholder='Assigned member'
                  onChange={(event) =>
                    setArgValues({ ...argValues, account: event.target.value })
                  }
                >
                  {accounts &&
                    accounts.map((account) => (
                      <option key={account.address} value={account.address}>
                        {account.meta.name}
                      </option>
                    ))}
                </Select>
              </div>
              <Button
                loading={transferBalanceLoading}
                disabled={transferBalanceLoading}
                onClick={tranferBalance}
                className='mt-2 w-full'
              >
                Transfer
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// {typeof percentageOwnership === 'number' || 'string'  ? (
//   <AnimatedPieChart data={data} />
// ) : (
//   <p>Ownership Percentage: N/A</p>
// )}
