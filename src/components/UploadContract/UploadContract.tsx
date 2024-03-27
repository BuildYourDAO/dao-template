import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Button, FileInput, Input } from 'react-daisyui';
import toast from 'react-hot-toast';

import { useContract } from '@/context/contract/ContractContextProvider';

export const UploadContract: React.FC = () => {
  const [contractAddress, setContractAddress] = useState('');
  const [metadataContent, setMetadataContent] = useState<string | null>(null);
  const { handleSetContract, contractLoading } = useContract();

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContractAddress(e.target.value);
  };

  const handleMetadataChangeWrapper = (e: ChangeEvent<HTMLInputElement>) => {
    // The actual FileInput component doesn't provide File[] directly, so we need to extract it.
    const files = Array.from(e.target.files || []);
    handleMetadataChange(files);
  };

  const handleMetadataChange = async (files: File[]) => {
    const file = files[0];
    if (file && file.type === 'application/json') {
      const reader = new FileReader();
      reader.onload = () => {
        const content = reader.result as string;
        setMetadataContent(content);
      };
      reader.readAsText(file);
    } else {
      alert('Please upload a valid JSON file.');
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!contractAddress) return toast.error('Please provide contract address');
    if (!metadataContent)
      return toast.error('Please provide contract metadata');

    const result = handleSetContract(contractAddress, metadataContent);

    if (result?.success) toast.success('Contract set!');
  };

  return (
    <div className='bg-base-200 mt-4 rounded-2xl p-4'>
      <h3 className='mt-4 text-center text-lg'>
        Upload contract metadata and input your contract address
      </h3>

      <form className='rounded-2xl shadow-xl' onSubmit={handleSubmit}>
        <div className='flex w-full items-center justify-center gap-2 p-4 font-sans'>
          <div className='form-control w-full max-w-xs'>
            <label className='label'>
              <span className='label-text'>Your contract address</span>
            </label>
            <Input
              placeholder='address'
              name='address'
              value={contractAddress}
              onChange={handleAddressChange}
            />
          </div>
        </div>

        <div className='flex w-full items-center justify-center gap-2 p-4 font-sans'>
          <div className='form-control w-full max-w-xs'>
            <label className='label'>
              <span className='label-text'>Your contract metadata</span>
            </label>
            <FileInput
              placeholder='metadata.json'
              name='metadata'
              onChange={handleMetadataChangeWrapper}
              accept='.json'
            />
          </div>
        </div>

        <div className='flex w-full items-center justify-center gap-2 p-4 font-sans'>
          <Button
            loading={contractLoading}
            disabled={contractLoading}
            type='submit'
            className='flex'
          >
            Set Contract
          </Button>
        </div>
      </form>
    </div>
  );
};
