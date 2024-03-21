import React from 'react';
import { Button, Swap } from 'react-daisyui';
import { MdOutlineLightMode, MdOutlineModeNight } from 'react-icons/md';

import { useTheme } from '@/context/theme/ThemeContextProvider';

const ThemeSwitch = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Swap
      offElement={
        <Button
          onClick={() => {
            console.log('dark');
            toggleTheme('dark');
          }}
          shape='circle'
          startIcon={<MdOutlineLightMode />}
        />
      }
      onElement={
        <Button
          onClick={() => {
            console.log('light');
            toggleTheme('light');
          }}
          shape='circle'
          startIcon={<MdOutlineModeNight />}
        />
      }
      rotate
      active={theme === 'light'}
    />
  );
};

export default ThemeSwitch;
