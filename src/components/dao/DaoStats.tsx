import Link from 'next/link';
import numeral from 'numeral';
import { Stats } from 'react-daisyui';
import { FaExternalLinkAlt } from 'react-icons/fa';

import { useGetContractBalance, useGetMemberList } from '@/hooks/messages';

import { LoadingSpinner } from '@/components/loading';

export const DaoStats = () => {
  const {
    loading: getMembersListLoading,
    decodedOutput: getMembersListDecodedOutput,
  } = useGetMemberList();

  const { loading: getBalanceLoading, decodedOutput: getBalanceOutput } =
    useGetContractBalance();

  return (
    <Stats className='mb-16 w-full shadow'>
      <Stats.Stat>
        <Stats.Stat.Item variant='title'>Members count</Stats.Stat.Item>
        <Stats.Stat.Item variant='value'>
          {getMembersListLoading ? (
            <LoadingSpinner />
          ) : (
            <div className='flex w-full items-center justify-between'>
              <span>
                {getMembersListDecodedOutput &&
                getMembersListDecodedOutput.value ? (
                  <> {getMembersListDecodedOutput.value.length}</>
                ) : (
                  'no data'
                )}
              </span>

              <Link className='link text-primary text-sm' href='/members'>
                <FaExternalLinkAlt />
              </Link>
            </div>
          )}
        </Stats.Stat.Item>
      </Stats.Stat>

      <Stats.Stat>
        <Stats.Stat.Item variant='title'>Project Count</Stats.Stat.Item>
        <Stats.Stat.Item variant='value'>
          <div className='flex w-full items-center justify-between'>
            <span>{getBalanceLoading ? <LoadingSpinner /> : <>4</>}</span>

            <Link className='link text-primary text-sm' href='/members'>
              <FaExternalLinkAlt />
            </Link>
          </div>
        </Stats.Stat.Item>
      </Stats.Stat>

      <Stats.Stat>
        <Stats.Stat.Item variant='title'>Contract Balance</Stats.Stat.Item>
        <Stats.Stat.Item variant='value'>
          {getBalanceLoading ? (
            <LoadingSpinner />
          ) : (
            <div className='flex w-full items-center justify-between'>
              <span>
                {getBalanceOutput && getBalanceOutput.value ? (
                  <>
                    {numeral(
                      parseFloat(getBalanceOutput.value.replace(/,/g, ''))
                    ).format('0.0a')}
                  </>
                ) : (
                  'no data'
                )}
              </span>

              <Link className='link text-primary text-sm' href='/token'>
                <FaExternalLinkAlt />
              </Link>
            </div>
          )}
        </Stats.Stat.Item>
      </Stats.Stat>
    </Stats>
  );
};
