import React, { forwardRef } from 'react';

export type SkeletonVariant = 'text' | 'avatar' | 'card' | 'button' | 'block';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant;
  count?: number;
  width?: string;
  height?: string;
}

const shimmerClass =
  'animate-[skeleton-shimmer_1.6s_ease-in-out_infinite] bg-[length:300%_100%] ' +
  'bg-gradient-to-r from-surface-3 via-brand-primary/10 to-surface-3 ' +
  'dark:from-[var(--color-surface-3)] dark:via-[var(--color-border-strong)]/45 dark:to-[var(--color-surface-3)]';

type SkeletonItemProps = {
  variant: SkeletonVariant;
  width?: string;
  height?: string;
  className?: string;
};

function SkeletonItem({ variant, width, height, className = '' }: SkeletonItemProps) {
  const base = [shimmerClass, className].join(' ');

  if (variant === 'avatar') {
    return (
      <div
        style={{ width: width ?? '40px', height: height ?? '40px' }}
        className={['rounded-full shrink-0', base].join(' ')}
      />
    );
  }

  if (variant === 'button') {
    return (
      <div
        style={{ width: width ?? '96px', height: height ?? '36px' }}
        className={['rounded-md', base].join(' ')}
      />
    );
  }

  if (variant === 'block') {
    // Ocupa 100% do container pai — dimensões controladas via className/style do wrapper
    return <div className={['rounded-xl w-full h-full', base].join(' ')} />;
  }

  if (variant === 'card') {
    return (
      <div className={['rounded-xl w-full flex flex-col gap-3 p-4', shimmerClass, className].join(' ')}
        style={{ height: height ?? '120px', width: width ?? '100%' }}
      />
    );
  }

  // text (default)
  return (
    <div
      style={{ width: width ?? '100%', height: height ?? '14px' }}
      className={['rounded-full', base].join(' ')}
    />
  );
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ variant = 'text', count = 1, width, height, className = '', style, ...props }, ref) => {
    const items = Array.from({ length: count }, (_, i) => i);

    if (count === 1) {
      // Para 'block', o wrapper carrega as dimensões via className/style
      if (variant === 'block') {
        return (
          <div ref={ref} className={className} style={style} {...props}>
            <SkeletonItem variant={variant} width={width} height={height} />
          </div>
        );
      }
      return (
        <div ref={ref} className={className} style={style} {...props}>
          <SkeletonItem variant={variant} width={width} height={height} />
        </div>
      );
    }

    return (
      <div ref={ref} className={['flex flex-col gap-2', className].join(' ')} style={style} {...props}>
        {items.map((i) => (
          <SkeletonItem key={i} variant={variant} width={width} height={height} />
        ))}
      </div>
    );
  },
);

Skeleton.displayName = 'Skeleton';
