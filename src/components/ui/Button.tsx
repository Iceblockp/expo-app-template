import React from 'react';
import {
  Pressable,
  Text,
  ActivityIndicator,
  PressableProps,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useTheme } from '@/theme/provider';
import { createButtonVariants } from '@/theme/components';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<PressableProps, 'style'> {
  /**
   * Button text content
   */
  title: string;
  /**
   * Visual variant of the button
   */
  variant?: ButtonVariant;
  /**
   * Size of the button
   */
  size?: ButtonSize;
  /**
   * Whether the button is disabled
   */
  disabled?: boolean;
  /**
   * Whether to show loading spinner
   */
  loading?: boolean;
  /**
   * Custom button style
   */
  style?: ViewStyle;
  /**
   * Custom text style
   */
  textStyle?: TextStyle;
  /**
   * Full width button
   */
  fullWidth?: boolean;
}

/**
 * Button component with multiple variants and sizes
 * Supports primary, secondary, outline, and ghost variants
 */
export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  style,
  textStyle,
  fullWidth = false,
  onPress,
  ...props
}) => {
  const theme = useTheme();
  const buttonVariants = createButtonVariants({
    colors: theme.colors,
    typography: theme.typography,
    spacing: theme.spacing,
    borderRadius: theme.borderRadius,
    shadows: theme.shadows,
  });

  const variantStyles = buttonVariants[variant];
  const isDisabled = disabled || loading;

  // Size configurations
  const sizeConfig = {
    sm: {
      paddingHorizontal: theme.spacing[3],
      paddingVertical: theme.spacing[1],
      fontSize: theme.typography.fontSize.sm,
      borderRadius: theme.borderRadius.base,
    },
    md: {
      paddingHorizontal: theme.spacing[4],
      paddingVertical: theme.spacing[2],
      fontSize: theme.typography.fontSize.base,
      borderRadius: theme.borderRadius.md,
    },
    lg: {
      paddingHorizontal: theme.spacing[6],
      paddingVertical: theme.spacing[3],
      fontSize: theme.typography.fontSize.lg,
      borderRadius: theme.borderRadius.lg,
    },
  };

  const currentSize = sizeConfig[size];

  const buttonStyle: ViewStyle = {
    backgroundColor: isDisabled
      ? variantStyles.disabledBackgroundColor
      : variantStyles.backgroundColor,
    borderColor: isDisabled
      ? variantStyles.disabledBackgroundColor
      : variantStyles.borderColor,
    borderWidth: 1,
    borderRadius: currentSize.borderRadius,
    paddingHorizontal: currentSize.paddingHorizontal,
    paddingVertical: currentSize.paddingVertical,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    opacity: isDisabled ? 0.6 : 1,
    ...(fullWidth && { width: '100%' }),
    ...style,
  };

  const pressedStyle: ViewStyle = {
    backgroundColor: variantStyles.pressedBackgroundColor,
    borderColor: variantStyles.pressedBorderColor,
  };

  const textColor = isDisabled
    ? variantStyles.disabledTextColor
    : variantStyles.textColor;

  const buttonTextStyle: TextStyle = {
    color: textColor,
    fontSize: currentSize.fontSize,
    fontWeight: theme.typography.fontWeight.medium,
    textAlign: 'center',
    ...textStyle,
  };

  return (
    <Pressable
      style={({ pressed }) => [
        buttonStyle,
        pressed && !isDisabled && pressedStyle,
      ]}
      disabled={isDisabled}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled }}
      accessibilityLabel={title}
      {...props}
    >
      {loading && (
        <ActivityIndicator
          size="small"
          color={textColor}
          style={{ marginRight: theme.spacing[2] }}
        />
      )}
      <Text style={buttonTextStyle}>{title}</Text>
    </Pressable>
  );
};
