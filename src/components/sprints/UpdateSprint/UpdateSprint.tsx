// import { Dispatch, FormEvent, SetStateAction } from 'react';
// import { Button, Input, Modal, Select } from 'react-daisyui';

// import { UseCreateSprint } from '@/hooks/messages';

// import { useSubstrateState } from '@/context/substrate/SubstrateContextProvider';

// interface CreateSprintProps {
//   children?: React.ReactNode;
//   toggleVisible: Dispatch<SetStateAction<boolean>>;
// }

// export const UpdateSprint: React.FC<CreateSprintProps> = ({
//   toggleVisible,
// }) => {
//   const { accounts } = useSubstrateState();
//   const { loading, mutate, argValues, setArgValues, decodedOutput } =
//     UseCreateSprint();

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     await mutate();
//     alert(decodedOutput?.decodedOutput);
//     toggleVisible(false);
//   };

//   return (
//     <>
//       <Modal.Header className='font-bold'>Update Sprint</Modal.Header>
//       <form onSubmit={handleSubmit}>
//         <Modal.Body>
//           <label className='label'>
//             <span className='label-text'>Project Id</span>
//           </label>
//           <Input
//             name='name'
//             className='w-full'
//             placeholder='name'
//             value={argValues.projectId}
//             onChange={(e) =>
//               setArgValues({ ...argValues, projectId: e.target.value })
//             }
//           />
//           <label className='label'>
//             <span className='label-text'>StartDate</span>
//           </label>
//           <Select
//             placeholder='startDate'
//             className='w-full'
//             onChange={(event) =>
//               setArgValues({ ...argValues, startDate: event.target.value })
//             }
//           >
//             {accounts &&
//               accounts.map((account) => (
//                 <option key={account.address} value={account.address}>
//                   {account.meta.name}
//                 </option>
//               ))}
//           </Select>

//           <label className='label'>
//             <span className='label-text'>EndDate</span>
//           </label>
//           <Input
//             name='name'
//             className='w-full'
//             placeholder='EndDate'
//             value={argValues.endDate}
//             onChange={(e) =>
//               setArgValues({ ...argValues, endDate: e.target.value })
//             }
//           />
//         </Modal.Body>

//         <Modal.Actions>
//           <Button loading={loading} type='submit'>
//             Add Project!
//           </Button>
//         </Modal.Actions>
//       </form>
//     </>
//   );
// };
export {};
