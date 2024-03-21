import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { Button, Modal, Select } from 'react-daisyui';
import toast from 'react-hot-toast';
import { TfiCup } from 'react-icons/tfi';

import { useSetConfidence } from '@/hooks/messages';

interface SetConfidenceProps {
  toggleVisible: Dispatch<SetStateAction<boolean>>;
}

export const SetConfidence: React.FC<SetConfidenceProps> = ({
  toggleVisible,
}) => {
  const { mutate, loading, decodedOutput } = useSetConfidence();
  const [confidenceLevel, setConfidenceLevel] = useState(1);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const mutateValue = await mutate({
      confidence_level: confidenceLevel,
    });
    console.log('mutateValue ', mutateValue);

    if (mutateValue) {
      if (mutateValue.isError)
        return toast.error(mutateValue.decodedOutput || 'An error occurred');

      toast.success('Confidence level set');
    }

    // handle hook
    toggleVisible(false);
  };

  console.log('decodedOutput ', decodedOutput);

  return (
    <>
      <Modal.Header className='font-bold'>Set Confidence</Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <label className='label'>
            <span className='label-text'>Confidence level</span>
          </label>

          <Select
            value={confidenceLevel}
            onChange={(e) => setConfidenceLevel(Number(e.target.value))}
            placeholder='Ticket Type'
            className='w-full'
          >
            {[...new Array(11)].map((_, index) => (
              <option value={index} key={index}>
                {index}
              </option>
            ))}
          </Select>
        </Modal.Body>

        <Modal.Actions>
          <Button loading={loading} startIcon={<TfiCup />} type='submit'>
            Set Confidence
          </Button>
        </Modal.Actions>
      </form>
    </>
  );
};
