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

export { NexusLogo } from './components/nexus-logo/nexus-logo';
export type { NexusLogoProps } from './components/nexus-logo/nexus-logo';

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

export { Tabs } from './components/tabs/tabs';
export type { TabsProps, TabsListProps, TabsTriggerProps, TabsContentProps } from './components/tabs/tabs';

export { Skeleton } from './components/skeleton/skeleton';
export type { SkeletonProps, SkeletonVariant } from './components/skeleton/skeleton';

export { StatCard } from './components/stat-card/stat-card';
export type { StatCardProps, StatCardValueTone } from './components/stat-card/stat-card';

export { MonthStepper } from './components/month-stepper/month-stepper';
export type { MonthStepperProps } from './components/month-stepper/month-stepper';

export { InlineAmountCell } from './components/inline-amount-cell/inline-amount-cell';
export type { InlineAmountCellProps } from './components/inline-amount-cell/inline-amount-cell';

export { ToggleStatusBadge } from './components/toggle-status-badge/toggle-status-badge';
export type { ToggleStatusBadgeProps } from './components/toggle-status-badge/toggle-status-badge';

export { CompactStatusCheckbox } from './components/compact-status-checkbox/compact-status-checkbox';
export type { CompactStatusCheckboxProps } from './components/compact-status-checkbox/compact-status-checkbox';

export { RangeProgressBar } from './components/range-progress-bar/range-progress-bar';
export type { RangeProgressBarProps } from './components/range-progress-bar/range-progress-bar';

export { DeltaBadge } from './components/delta-badge/delta-badge';
export type { DeltaBadgeProps } from './components/delta-badge/delta-badge';

export { StepperField } from './components/stepper-field/stepper-field';
export type { StepperFieldProps } from './components/stepper-field/stepper-field';

export { CircularProgress } from './components/circular-progress/circular-progress';
export type { CircularProgressProps } from './components/circular-progress/circular-progress';

export { StreakBadge } from './components/streak-badge/streak-badge';
export type { StreakBadgeProps } from './components/streak-badge/streak-badge';

export { CompletionToggle } from './components/completion-toggle/completion-toggle';
export type { CompletionToggleProps } from './components/completion-toggle/completion-toggle';

export { Checklist } from './components/checklist/checklist';
export type { ChecklistProps, ChecklistItemOption } from './components/checklist/checklist';

export { IntegerSlider } from './components/integer-slider/integer-slider';
export type { IntegerSliderProps } from './components/integer-slider/integer-slider';

export { HoldStepper } from './components/hold-stepper/hold-stepper';
export type { HoldStepperProps } from './components/hold-stepper/hold-stepper';

export { CalendarHeatmap } from './components/calendar-heatmap/calendar-heatmap';
export type { CalendarHeatmapProps, CalendarHeatmapDay } from './components/calendar-heatmap/calendar-heatmap';

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

export { ModuleCardSkeleton, ModuleGridSkeleton } from './components/module-card-skeleton/module-card-skeleton';
export type {
  ModuleCardSkeletonProps,
  ModuleGridSkeletonProps,
} from './components/module-card-skeleton/module-card-skeleton';

export { DataTable } from './components/data-table/data-table';
export type { DataTableProps, DataTableColumn } from './components/data-table/data-table';

export { ToggleMatrix } from './components/toggle-matrix/toggle-matrix';
export type {
  ToggleMatrixProps,
  ToggleMatrixRow,
  ToggleMatrixColumn,
} from './components/toggle-matrix/toggle-matrix';

export { LineChartPanel } from './components/line-chart-panel/line-chart-panel';
export type {
  LineChartPanelProps,
  LineChartSeriesConfig,
  LineChartPeriodOption,
  LineChartReferenceLineConfig,
} from './components/line-chart-panel/line-chart-panel';

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
