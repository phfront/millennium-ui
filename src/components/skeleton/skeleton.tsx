import React, { forwardRef } from 'react';

export type SkeletonVariant = 'text' | 'avatar' | 'card' | 'button';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant;
  count?: number;
  width?: string;
  height?: string;
}

const shimmerClass =
  'animate-[skeleton-shimmer_1.5s_linear_infinite] bg-[length:200%_100%] ' +
  'bg-gradient-to-r from-surface-3 via-surface-2 to-surface-3 dark:from-[#1e2a3a] dark:via-[#253346] dark:to-[#1e2a3a]';

function SkeletonItem({
  variant,
  width,
  height,
  className = '',
}: {
  variant: SkeletonVariant;
  width?: string;
  height?: string;
  className?: string;
}) {
  if (variant === 'avatar') {
    return (
      <div
        style={{ width: width ?? '40px', height: height ?? '40px' }}
        className={['rounded-full', shimmerClass, className].join(' ')}
      />
    );
  }
  if (variant === 'card') {
    return (
      <div
        style={{ width: width ?? '100%', height: height ?? '120px' }}
        className={['rounded-lg', shimmerClass, className].join(' ')}
      />
    );
  }
  if (variant === 'button') {
    return (
      <div
        style={{ width: width ?? '96px', height: height ?? '36px' }}
        className={['rounded-md', shimmerClass, className].join(' ')}
      />
    );
  }
  // text
  return (
    <div
      style={{ width: width ?? '100%', height: height ?? '16px' }}
      className={['rounded', shimmerClass, className].join(' ')}
    />
  );
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ variant = 'text', count = 1, width, height, className = '', ...props }, ref) => {
    const items = Array.from({ length: count }, (_, i) => i);
    if (count === 1) {
      return (
        <div ref={ref} className={className} {...props}>
          <SkeletonItem variant={variant} width={width} height={height} />
        </div>
      );
    }
    return (
      <div ref={ref} className={['flex flex-col gap-2', className].join(' ')} {...props}>
        {items.map((i) => (
          <SkeletonItem key={i} variant={variant} width={width} height={height} />
        ))}
      </div>
    );
  },
);

Skeleton.displayName = 'Skeleton';
