import React, { forwardRef } from 'react';
import { Badge, type BadgeProps } from '../badge/badge';

export interface PointsBadgeProps extends Omit<BadgeProps, 'children'> {
  points: number;
}

/**
 * Indicador compacto de pontuação (metas / gamificação).
 * Mostra só o valor numérico; use `variant` no pai para cor (ex.: success / danger).
 */
export const PointsBadge = forwardRef<HTMLSpanElement, PointsBadgeProps>(
  ({ points, variant = 'muted', size = 'sm', className = '', ...props }, ref) => (
    <Badge
      ref={ref}
      variant={variant}
      size={size}
      className={['shrink-0 tabular-nums', className].join(' ')}
      {...props}
    >
      {points}
    </Badge>
  ),
);

PointsBadge.displayName = 'PointsBadge';
