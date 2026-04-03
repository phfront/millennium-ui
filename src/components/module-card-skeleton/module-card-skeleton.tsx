import React from 'react';
import { Skeleton } from '../skeleton/skeleton';

export interface ModuleCardSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ModuleCardSkeleton({ className = '', ...props }: ModuleCardSkeletonProps) {
  return (
    <div
      className={['flex flex-col gap-3 rounded-xl p-5 bg-surface-2 border border-border', className].join(' ')}
      {...props}
    >
      <Skeleton variant="avatar" width="44px" height="44px" />
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Skeleton variant="text" width="120px" height="14px" />
          <Skeleton variant="button" width="48px" height="20px" />
        </div>
        <Skeleton variant="text" width="80%" height="12px" />
        <Skeleton variant="text" width="60%" height="12px" />
      </div>
    </div>
  );
}

ModuleCardSkeleton.displayName = 'ModuleCardSkeleton';

export interface ModuleGridSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  count?: number;
}

export function ModuleGridSkeleton({ count = 6, className = '', ...props }: ModuleGridSkeletonProps) {
  return (
    <div
      className={['grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4', className].join(' ')}
      {...props}
    >
      {Array.from({ length: count }).map((_, i) => (
        <ModuleCardSkeleton key={i} />
      ))}
    </div>
  );
}

ModuleGridSkeleton.displayName = 'ModuleGridSkeleton';
