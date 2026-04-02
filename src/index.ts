// ── Atoms ──────────────────────────────────────────────────────────────────
export { Button } from './components/button/button';
export type { ButtonProps, ButtonVariant, ButtonSize } from './components/button/button';

export { Input } from './components/input/input';
export type { InputProps, InputType } from './components/input/input';

export { Textarea } from './components/textarea/textarea';
export type { TextareaProps } from './components/textarea/textarea';

export { Select } from './components/select/select';
export type { SelectProps, SelectOption } from './components/select/select';

export { Badge } from './components/badge/badge';
export type { BadgeProps, BadgeVariant, BadgeSize } from './components/badge/badge';

export { Avatar } from './components/avatar/avatar';
export type { AvatarProps, AvatarSize } from './components/avatar/avatar';

export { Icon } from './components/icon/icon';
export type { IconProps } from './components/icon/icon';

export { Spinner } from './components/spinner/spinner';
export type { SpinnerProps, SpinnerSize } from './components/spinner/spinner';

export { Divider } from './components/divider/divider';
export type { DividerProps, DividerOrientation } from './components/divider/divider';

export { Switch } from './components/switch/switch';
export type { SwitchProps } from './components/switch/switch';

export {
  DatePicker,
  TimePicker,
  DateTimePicker,
  DateRangePicker,
  DateTimeRangePicker,
  TimeRangePicker,
} from './components/date-picker/date-picker';
export type {
  DateRange,
  TimeRange,
  DatePickerProps,
  TimePickerProps,
  DateTimePickerProps,
  DateRangePickerProps,
  DateTimeRangePickerProps,
  TimeRangePickerProps,
} from './components/date-picker/date-picker';

// ── Layout ─────────────────────────────────────────────────────────────────
export { Card } from './components/card/card';
export type { CardProps } from './components/card/card';

export { PageHeader } from './components/page-header/page-header';
export type { PageHeaderProps } from './components/page-header/page-header';

export { EmptyState } from './components/empty-state/empty-state';
export type { EmptyStateProps } from './components/empty-state/empty-state';

export { Skeleton } from './components/skeleton/skeleton';
export type { SkeletonProps, SkeletonVariant } from './components/skeleton/skeleton';

// ── Feedback ───────────────────────────────────────────────────────────────
export { Alert } from './components/alert/alert';
export type { AlertProps, AlertVariant } from './components/alert/alert';

export { ToastProvider } from './components/toast/toast';
export type { ToastProviderProps, ToastPosition } from './components/toast/toast';

export { Modal } from './components/modal/modal';
export type { ModalProps, ModalSize } from './components/modal/modal';

export { Tooltip } from './components/tooltip/tooltip';
export type { TooltipProps, TooltipPosition } from './components/tooltip/tooltip';

// ── Navigation ─────────────────────────────────────────────────────────────
export { Sidebar } from './components/sidebar/sidebar';
export type { SidebarProps, SidebarNavLink } from './components/sidebar/sidebar';

export { BottomNav } from './components/bottom-nav/bottom-nav';
export type { BottomNavProps, BottomNavItem } from './components/bottom-nav/bottom-nav';

export { NavItem } from './components/nav-item/nav-item';
export type { NavItemProps } from './components/nav-item/nav-item';

// ── Domain ─────────────────────────────────────────────────────────────────
export { ModuleCard } from './components/module-card/module-card';
export type { ModuleCardProps } from './components/module-card/module-card';

export { DataTable } from './components/data-table/data-table';
export type { DataTableProps, DataTableColumn } from './components/data-table/data-table';

// ── Hooks ──────────────────────────────────────────────────────────────────
export { useToast } from './hooks/use-toast';
export type { ToastItem, ToastVariant } from './hooks/use-toast';

export { useMediaQuery } from './hooks/use-media-query';
export { useTheme } from './hooks/use-theme';
export type { Theme } from './hooks/use-theme';

export { useDisclosure } from './hooks/use-disclosure';
export type { UseDisclosureReturn } from './hooks/use-disclosure';

// ── Config ─────────────────────────────────────────────────────────────────
export { nexusUiPreset } from './tailwind-preset';
