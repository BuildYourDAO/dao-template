// import { FormEvent } from 'react';
// import { Modal, Select } from 'react-daisyui';

// import { useGetMemberInfo } from '@/hooks/messages';

// import { useSubstrateState } from '@/context/substrate/SubstrateContextProvider';

// interface getMemberInfoProps {
//   children?: React.ReactNode;
//   // toggleVisible: Dispatch<SetStateAction<boolean>>;
// }

// export const GetMemberInfo: React.FC<getMemberInfoProps> = ({

// }) => {
//   const { accounts } = useSubstrateState();
//   const { loading, mutate, argValues, setArgValues, decodedOutput } =
//   useGetMemberInfo();
//   console.log("getMemberInfo",decodedOutput );
//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     await mutate();
//     alert(decodedOutput?.decodedOutput);
//     // toggleVisible(false);
//   };

//   return (
//     <>
//       <Modal.Header className='font-bold'>Get Member Info</Modal.Header>
//       {/* <form onSubmit={handleSubmit}> */}
//         <Modal.Body>

//           <label className='label'>
//             <span className='label-text'>Choose member account</span>
//           </label>
//           <Select
//             placeholder='Account Address'
//             className='w-full'
//             onChange={(event) =>
//               setArgValues({ ...argValues, memberAddress: event.target.value })
//             }
//           >
//             {accounts &&
//               accounts.map((account) => (
//                 <option key={account.address} value={account.address}>
//                   {account.meta.name}
//                 </option>
//               ))}
//           </Select>
//         </Modal.Body>

//         {/* <Modal.Actions>
//           <Button loading={loading} type='submit'>
//             Get Member
//           </Button>
//         </Modal.Actions> */}
//       {/* </form> */}
//     </>
//   );
// };

export {};
