import { createContext } from 'react';

import { IGetMember } from '@/hooks/messages';

export interface UserContextType {
  user?: IGetMember;
  loading: boolean;
}

const UserContextValues = {} as UserContextType;

export const UserContext = createContext<UserContextType>(UserContextValues);
