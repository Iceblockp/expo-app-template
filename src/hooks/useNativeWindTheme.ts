import { useColorScheme } from 'react-native';
import { useTheme } from '@/theme/provider';

/**
 * Hook that provides NativeWind classes that are aware of the current theme
 */
export const useNativeWindTheme = () => {
  const { isDark } = useTheme();
  const systemColorScheme = useColorScheme();

  // Determine if we should use dark classes
  const useDarkClasses = isDark || systemColorScheme === 'dark';

  return {
    // Background utilities
    bg: {
      primary: useDarkClasses ? 'bg-primary-400' : 'bg-primary-500',
      secondary: useDarkClasses ? 'bg-secondary-400' : 'bg-secondary-500',
      success: useDarkClasses ? 'bg-success-400' : 'bg-success-500',
      warning: useDarkClasses ? 'bg-warning-400' : 'bg-warning-500',
      error: useDarkClasses ? 'bg-error-400' : 'bg-error-500',
      background: useDarkClasses ? 'bg-neutral-950' : 'bg-white',
      surface: useDarkClasses ? 'bg-neutral-900' : 'bg-white',
      muted: useDarkClasses ? 'bg-neutral-800' : 'bg-neutral-100',
    },

    // Text utilities
    text: {
      primary: useDarkClasses ? 'text-neutral-50' : 'text-neutral-900',
      secondary: useDarkClasses ? 'text-neutral-300' : 'text-neutral-600',
      tertiary: useDarkClasses ? 'text-neutral-400' : 'text-neutral-500',
      inverse: useDarkClasses ? 'text-neutral-900' : 'text-white',
      disabled: useDarkClasses ? 'text-neutral-600' : 'text-neutral-400',
      accent: useDarkClasses ? 'text-primary-400' : 'text-primary-600',
      success: useDarkClasses ? 'text-success-400' : 'text-success-600',
      warning: useDarkClasses ? 'text-warning-400' : 'text-warning-600',
      error: useDarkClasses ? 'text-error-400' : 'text-error-600',
    },

    // Border utilities
    border: {
      primary: useDarkClasses ? 'border-neutral-700' : 'border-neutral-300',
      secondary: useDarkClasses ? 'border-neutral-800' : 'border-neutral-200',
      accent: useDarkClasses ? 'border-primary-400' : 'border-primary-500',
      success: useDarkClasses ? 'border-success-400' : 'border-success-500',
      warning: useDarkClasses ? 'border-warning-400' : 'border-warning-500',
      error: useDarkClasses ? 'border-error-400' : 'border-error-500',
    },

    // Component variants
    card: {
      elevated: useDarkClasses
        ? 'bg-neutral-900 shadow-lg border border-neutral-800'
        : 'bg-white shadow-md',
      outlined: useDarkClasses
        ? 'bg-neutral-900 border border-neutral-700'
        : 'bg-white border border-neutral-200',
      filled: useDarkClasses ? 'bg-neutral-800' : 'bg-neutral-50',
    },

    // Button variants
    button: {
      primary: {
        base: useDarkClasses
          ? 'bg-primary-500 border-primary-500'
          : 'bg-primary-600 border-primary-600',
        text: 'text-white',
        pressed: useDarkClasses
          ? 'active:bg-primary-600'
          : 'active:bg-primary-700',
      },
      secondary: {
        base: useDarkClasses
          ? 'bg-neutral-700 border-neutral-700'
          : 'bg-neutral-200 border-neutral-200',
        text: useDarkClasses ? 'text-neutral-100' : 'text-neutral-900',
        pressed: useDarkClasses
          ? 'active:bg-neutral-600'
          : 'active:bg-neutral-300',
      },
      outline: {
        base: useDarkClasses
          ? 'bg-transparent border-primary-400'
          : 'bg-transparent border-primary-600',
        text: useDarkClasses ? 'text-primary-400' : 'text-primary-600',
        pressed: useDarkClasses
          ? 'active:bg-primary-950'
          : 'active:bg-primary-50',
      },
      ghost: {
        base: 'bg-transparent border-transparent',
        text: useDarkClasses ? 'text-primary-400' : 'text-primary-600',
        pressed: useDarkClasses
          ? 'active:bg-neutral-800'
          : 'active:bg-neutral-100',
      },
    },

    // Input variants
    input: {
      default: {
        base: useDarkClasses
          ? 'bg-neutral-900 border-neutral-700 text-neutral-100'
          : 'bg-white border-neutral-300 text-neutral-900',
        placeholder: useDarkClasses
          ? 'placeholder-neutral-500'
          : 'placeholder-neutral-400',
        focused: useDarkClasses
          ? 'focus:border-primary-400'
          : 'focus:border-primary-500',
        error: useDarkClasses ? 'border-error-400' : 'border-error-500',
      },
      filled: {
        base: useDarkClasses
          ? 'bg-neutral-800 border-transparent text-neutral-100'
          : 'bg-neutral-100 border-transparent text-neutral-900',
        placeholder: useDarkClasses
          ? 'placeholder-neutral-500'
          : 'placeholder-neutral-400',
        focused: useDarkClasses
          ? 'focus:bg-neutral-900 focus:border-primary-400'
          : 'focus:bg-white focus:border-primary-500',
        error: useDarkClasses
          ? 'bg-error-950 border-error-400'
          : 'bg-error-50 border-error-500',
      },
    },

    // Utility functions
    isDark: useDarkClasses,

    // Dynamic class generator
    dynamic: (lightClass: string, darkClass: string) =>
      useDarkClasses ? darkClass : lightClass,
  };
};

/**
 * Utility function to combine classes conditionally
 */
export const cn = (
  ...classes: (string | undefined | false | null)[]
): string => {
  return classes.filter(Boolean).join(' ');
};

/**
 * Responsive utility classes
 */
export const responsive = {
  sm: (classes: string) => `sm:${classes}`,
  md: (classes: string) => `md:${classes}`,
  lg: (classes: string) => `lg:${classes}`,
  xl: (classes: string) => `xl:${classes}`,
} as const;

/**
 * Common layout patterns
 */
export const layouts = {
  container: 'mx-auto px-4',
  flexCenter: 'flex items-center justify-center',
  flexBetween: 'flex items-center justify-between',
  flexCol: 'flex flex-col',
  flexRow: 'flex flex-row',
  absoluteFill: 'absolute inset-0',
  screenPadding: 'px-4 py-6',
} as const;
