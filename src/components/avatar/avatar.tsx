import React, { forwardRef } from 'react';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string | null;
  alt?: string;
  name?: string;
  size?: AvatarSize;
}

const sizeClasses: Record<AvatarSize, string> = {
  xs: 'h-6 w-6 text-xs',
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
  xl: 'h-16 w-16 text-xl',
};

function getInitials(name?: string): string {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return (parts[0]?.[0] ?? '?').toUpperCase();
  return ((parts[0]?.[0] ?? '') + (parts[parts.length - 1]?.[0] ?? '')).toUpperCase();
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, alt, name, size = 'md', className = '', ...props }, ref) => (
    <div
      ref={ref}
      role="img"
      aria-label={alt ?? name ?? 'Avatar'}
      className={[
        'relative flex items-center justify-center rounded-full overflow-hidden',
        'bg-gradient-to-br from-brand-primary to-brand-secondary',
        'font-semibold text-white shrink-0 select-none',
        sizeClasses[size],
        className,
      ].join(' ')}
      {...props}
    >
      {src ? (
        <img src={src} alt={alt ?? name ?? 'Avatar'} className="w-full h-full object-cover" />
      ) : (
        <span>{getInitials(name)}</span>
      )}
    </div>
  ),
);

Avatar.displayName = 'Avatar';
