import classnames from 'classnames';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

interface LoadingSpinnerProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

const spinnerSizes = {
  xs: 'w-6 h-6',
  sm: 'w-14 h-14',
  md: 'w-24 h-24',
  lg: 'w-52 h-52',
};

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'sm',
}) => {
  const spinnerSize = spinnerSizes[size];

  const spinnerClasses = classnames(
    `${spinnerSize}`,
    `${spinnerSize}`,
    'animate-spin',
    'rounded-full',
    'border-b-2',
    'border-t-2',
    'border-gray-900',
    'dark:border-gray-400'
  );

  return <div className={spinnerClasses}></div>;
};
