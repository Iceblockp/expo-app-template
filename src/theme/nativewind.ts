import { useTheme } from './provider';

/**
 * NativeWind utility functions for theme-aware styling
 */

// Theme-aware color class generator
export const useThemeColors = () => {
  const { isDark } = useTheme();

  return {
    // Background colors
    background: isDark ? 'bg-background-dark' : 'bg-background-light',
    surface: isDark ? 'bg-surface-dark' : 'bg-surface-light',

    // Text colors
    textPrimary: isDark ? 'text-text-primary-dark' : 'text-text-primary-light',
    textSecondary: isDark
      ? 'text-text-secondary-dark'
      : 'text-text-secondary-light',
    textTertiary: isDark
      ? 'text-text-tertiary-dark'
      : 'text-text-tertiary-light',
    textInverse: isDark ? 'text-text-inverse-dark' : 'text-text-inverse-light',
    textDisabled: isDark
      ? 'text-text-disabled-dark'
      : 'text-text-disabled-light',

    // Border colors
    borderPrimary: isDark ? 'border-neutral-700' : 'border-neutral-300',
    borderSecondary: isDark ? 'border-neutral-800' : 'border-neutral-200',

    // Component variants
    cardElevated: isDark
      ? 'bg-surface-dark shadow-lg'
      : 'bg-surface-light shadow-md',
    cardOutlined: isDark
      ? 'bg-surface-dark border border-neutral-700'
      : 'bg-surface-light border border-neutral-200',

    // Interactive states
    pressable: isDark ? 'active:bg-neutral-800' : 'active:bg-neutral-100',
    hover: isDark ? 'hover:bg-neutral-800' : 'hover:bg-neutral-50',
  };
};

// Responsive breakpoint utilities
export const breakpoints = {
  sm: 'sm:', // 380px
  md: 'md:', // 420px
  lg: 'lg:', // 680px
  xl: 'xl:', // 960px
} as const;

// Component size variants
export const sizeVariants = {
  xs: {
    padding: 'px-2 py-1',
    text: 'text-xs',
    height: 'h-6',
  },
  sm: {
    padding: 'px-3 py-1.5',
    text: 'text-sm',
    height: 'h-8',
  },
  md: {
    padding: 'px-4 py-2',
    text: 'text-base',
    height: 'h-10',
  },
  lg: {
    padding: 'px-6 py-3',
    text: 'text-lg',
    height: 'h-12',
  },
  xl: {
    padding: 'px-8 py-4',
    text: 'text-xl',
    height: 'h-14',
  },
} as const;

// Button variant classes
export const buttonVariants = {
  primary: {
    base: 'bg-primary-500 border-primary-500',
    text: 'text-white',
    pressed: 'active:bg-primary-600 active:border-primary-600',
    disabled:
      'disabled:bg-neutral-300 disabled:border-neutral-300 disabled:text-neutral-500',
  },
  secondary: {
    base: 'bg-secondary-500 border-secondary-500',
    text: 'text-white',
    pressed: 'active:bg-secondary-600 active:border-secondary-600',
    disabled:
      'disabled:bg-neutral-300 disabled:border-neutral-300 disabled:text-neutral-500',
  },
  outline: {
    base: 'bg-transparent border-primary-500',
    text: 'text-primary-500',
    pressed: 'active:bg-primary-50 active:border-primary-600',
    disabled: 'disabled:border-neutral-300 disabled:text-neutral-400',
  },
  ghost: {
    base: 'bg-transparent border-transparent',
    text: 'text-primary-500',
    pressed: 'active:bg-primary-50',
    disabled: 'disabled:text-neutral-400',
  },
} as const;

// Input variant classes
export const inputVariants = {
  default: {
    base: 'border border-neutral-300 bg-white',
    focused: 'focus:border-primary-500',
    error: 'border-error-500',
    disabled: 'disabled:bg-neutral-100 disabled:text-neutral-400',
  },
  filled: {
    base: 'border-0 bg-neutral-100',
    focused: 'focus:bg-white focus:border focus:border-primary-500',
    error: 'bg-error-50 border border-error-500',
    disabled: 'disabled:bg-neutral-200 disabled:text-neutral-400',
  },
} as const;

// Card variant classes
export const cardVariants = {
  elevated: 'bg-white shadow-md',
  outlined: 'bg-white border border-neutral-200',
  filled: 'bg-neutral-50',
} as const;

// Typography classes
export const typographyVariants = {
  heading1: 'text-3xl font-bold leading-tight tracking-tight',
  heading2: 'text-2xl font-semibold leading-tight tracking-tight',
  heading3: 'text-xl font-semibold leading-normal',
  body: 'text-base font-normal leading-normal',
  caption: 'text-sm font-normal leading-normal',
  label: 'text-sm font-medium leading-normal tracking-wide',
} as const;

// Spacing utilities
export const spacing = {
  xs: 'p-1',
  sm: 'p-2',
  md: 'p-4',
  lg: 'p-6',
  xl: 'p-8',
} as const;

// Margin utilities
export const margin = {
  xs: 'm-1',
  sm: 'm-2',
  md: 'm-4',
  lg: 'm-6',
  xl: 'm-8',
} as const;

// Border radius utilities
export const borderRadius = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  '3xl': 'rounded-3xl',
  full: 'rounded-full',
} as const;

// Shadow utilities
export const shadows = {
  sm: 'shadow-sm',
  md: 'shadow',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
} as const;

// Utility function to combine classes
export const cn = (...classes: (string | undefined | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

// Theme-aware class generator (use within components only)
export const createThemeAwareClass = (
  lightClass: string,
  darkClass: string,
  isDark: boolean
) => {
  return isDark ? darkClass : lightClass;
};

// Responsive utility function
export const responsive = {
  sm: (classes: string) => `sm:${classes}`,
  md: (classes: string) => `md:${classes}`,
  lg: (classes: string) => `lg:${classes}`,
  xl: (classes: string) => `xl:${classes}`,
} as const;

// Animation classes
export const animations = {
  fadeIn: 'animate-fade-in',
  slideUp: 'animate-slide-up',
  slideDown: 'animate-slide-down',
  bounce: 'animate-bounce',
  pulse: 'animate-pulse',
  spin: 'animate-spin',
} as const;

// Layout utilities
export const layout = {
  container: 'mx-auto px-4',
  flexCenter: 'flex items-center justify-center',
  flexBetween: 'flex items-center justify-between',
  flexCol: 'flex flex-col',
  flexRow: 'flex flex-row',
  grid: 'grid',
  gridCols2: 'grid-cols-2',
  gridCols3: 'grid-cols-3',
  gridCols4: 'grid-cols-4',
} as const;
