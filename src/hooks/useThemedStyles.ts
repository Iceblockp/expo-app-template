import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme, ThemeContextType } from '../theme';

/**
 * Hook to create theme-aware styles
 * @param styleFactory Function that takes theme and returns styles
 * @returns Memoized styles that update when theme changes
 */
export function useThemedStyles<T extends StyleSheet.NamedStyles<T>>(
  styleFactory: (theme: ThemeContextType) => T
): T {
  const theme = useTheme();

  return useMemo(() => {
    return StyleSheet.create(styleFactory(theme));
  }, [theme, styleFactory]);
}
