import axios from 'axios';

import { CONTRACT_CID, PUBLIISH_URL } from '@/config';

export const getContractMatadata = async () => {
  const { data } = await axios.get(`${PUBLIISH_URL}/ipfs/${CONTRACT_CID}`);

  return data;
};
