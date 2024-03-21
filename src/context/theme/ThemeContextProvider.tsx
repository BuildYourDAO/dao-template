import React, { useContext, useEffect, useState } from 'react';

import { getFromLocalStorage, setToLocalStorage } from '@/lib/helper';

import { ThemeContext } from '@/context/theme/ThemeContext';

interface ThemeContextProviderProps {
  children: React.ReactNode | null;
  [key: string]: unknown;
}

const ThemeContextProvider = (props: ThemeContextProviderProps) => {
  const [theme, setTheme] = useState(getFromLocalStorage('theme') || 'dark');

  //toggles the theme
  const toggleTheme = (newTheme: string) => {
    setTheme(newTheme);
    setToLocalStorage('theme', newTheme);
  };

  //modify data-theme attribute on document.body when theme changes
  useEffect(() => {
    const body = document.body;
    body.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => useContext(ThemeContext);

export { ThemeContext, ThemeContextProvider, useTheme };
