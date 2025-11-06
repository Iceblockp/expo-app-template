import React from 'react';
import { View, ViewProps, ViewStyle } from 'react-native';
import { useTheme } from '@/theme/provider';
import { createCardVariants } from '@/theme/components';

export type CardVariant = 'elevated' | 'outlined' | 'filled';

export interface CardProps extends Omit<ViewProps, 'style'> {
  /**
   * Visual variant of the card
   */
  variant?: CardVariant;
  /**
   * Custom padding for the card content
   */
  padding?: keyof typeof import('@/theme/tokens').spacing;
  /**
   * Custom border radius
   */
  borderRadius?: keyof typeof import('@/theme/tokens').borderRadius;
  /**
   * Custom card style
   */
  style?: ViewStyle;
  /**
   * Whether the card should take full width
   */
  fullWidth?: boolean;
}

/**
 * Card component with elevation and styling options
 * Supports elevated, outlined, and filled variants
 */
export const Card: React.FC<CardProps> = ({
  variant = 'elevated',
  padding = 4,
  borderRadius = 'lg',
  style,
  fullWidth = false,
  children,
  ...props
}) => {
  const theme = useTheme();
  const cardVariants = createCardVariants({
    colors: theme.colors,
    typography: theme.typography,
    spacing: theme.spacing,
    borderRadius: theme.borderRadius,
    shadows: theme.shadows,
  });

  const variantStyles = cardVariants[variant];

  // Get shadow style based on variant
  const getShadowStyle = () => {
    if (variantStyles.shadow === 'none') {
      return {};
    }

    const shadowKey = variantStyles.shadow as keyof typeof theme.shadows;
    return theme.shadows[shadowKey];
  };

  const cardStyle: ViewStyle = {
    backgroundColor: variantStyles.backgroundColor,
    borderRadius: theme.borderRadius[borderRadius],
    padding: theme.spacing[padding],
    ...(variantStyles.borderColor !== 'transparent' && {
      borderWidth: 1,
      borderColor: variantStyles.borderColor,
    }),
    ...getShadowStyle(),
    ...(fullWidth && { width: '100%' }),
    ...style,
  };

  return (
    <View style={cardStyle} accessibilityRole="none" {...props}>
      {children}
    </View>
  );
};
