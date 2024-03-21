import { createContext } from 'react';

export interface ThemeContextType {
  theme: string;
  toggleTheme: (theme: string) => void;
}

const ThemeContexttValues = {} as ThemeContextType;

export const ThemeContext =
  createContext<ThemeContextType>(ThemeContexttValues);
