// import { Dispatch, FormEvent, SetStateAction } from 'react';
// import { Button, Input, Modal } from 'react-daisyui';
// import { toast } from 'react-hot-toast';

// import { useRedeemStake } from '@/hooks/messages';

// // import { useSubstrateState } from '@/context/substrate/SubstrateContextProvider';
// import { addStakeInput } from '@/types/schemaTypes';
// // import {}

// interface UnStakeProsps {
//   children?: React.ReactNode;
//   toggleVisible: Dispatch<SetStateAction<boolean>>;
//   refetchStakes: () => void;
// }

// export const UnStake: React.FC<UnStakeProsps> = ({
//   toggleVisible,
//   refetchStakes,
// }) => {

//    // const { accounts } = useSubstrateState();
//    const { loading, } = useRedeemStake();
//    // console.log("loadingM",decodedOutput?.value);
//    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//      e.preventDefault();
//      // await mutate(e);
//      // alert(decodedOutput?.decodedOutput);
//     //  const mutateValue = await mutate();
//     //  if (mutateValue) {
//     //    if (mutateValue.isError)
//     //      return toast.error(mutateValue.decodedOutput || 'An error occurred');

//        toast.success('reddemed Stake!');
//        refetchStakes();
//      }
//     //  setArgValues({} as addStakeInput);

//      toggleVisible(false);
//    };

//    return (
//      <>
//        <Modal.Header className='font-bold'>Add Stake</Modal.Header>
//        <form onSubmit={handleSubmit}>
//          <Modal.Body>
//            <label className='label'>
//              <span className='label-text'>amount</span>
//            </label>
//            <Input
//              name='name'
//              className='w-full'
//              placeholder='amount'
//             //  value={argValues.amount}
//              onChange={(e) =>
//               //  setArgValues({
//               //    ...argValues,
//               //    amount: e.target.value as unknown as number,
//               //  })
//              }
//            />
//          </Modal.Body>

//          <Modal.Actions>
//            <Button loading={loading} type='submit'>
//              Add Stake!
//            </Button>
//          </Modal.Actions>
//        </form>
//      </>
//    );

// };
export {};
