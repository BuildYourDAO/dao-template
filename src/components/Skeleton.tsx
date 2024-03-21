import * as React from 'react';

import clsxm from '@/lib/clsxm';

type SkeletonProps = React.ComponentPropsWithoutRef<'div'>;

export default function Skeleton({ className, ...rest }: SkeletonProps) {
  return (
    <div
      className={clsxm('animate-shimmer bg-base-200', className)}
      style={{
        backgroundImage: 'bg-base-200',
        backgroundSize: '700px 100%',
        backgroundRepeat: 'no-repeat',
      }}
      {...rest}
    />
  );
}
