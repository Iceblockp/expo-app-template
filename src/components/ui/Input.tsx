import React, { useState, forwardRef } from 'react';
import {
  TextInput,
  View,
  Text,
  TextInputProps,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useTheme } from '@/theme/provider';
import { createInputVariants } from '@/theme/components';

export type InputVariant = 'default' | 'filled';
export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<TextInputProps, 'style'> {
  /**
   * Input label
   */
  label?: string;
  /**
   * Helper text displayed below the input
   */
  helperText?: string;
  /**
   * Error message to display
   */
  error?: string;
  /**
   * Visual variant of the input
   */
  variant?: InputVariant;
  /**
   * Size of the input
   */
  size?: InputSize;
  /**
   * Whether the input is disabled
   */
  disabled?: boolean;
  /**
   * Custom container style
   */
  containerStyle?: ViewStyle;
  /**
   * Custom input style
   */
  inputStyle?: ViewStyle;
  /**
   * Custom label style
   */
  labelStyle?: TextStyle;
  /**
   * Custom helper text style
   */
  helperTextStyle?: TextStyle;
  /**
   * Custom error text style
   */
  errorTextStyle?: TextStyle;
  /**
   * Full width input
   */
  fullWidth?: boolean;
}

/**
 * Input component with validation states and variants
 * Supports default and filled variants with error handling
 */
export const Input = forwardRef<TextInput, InputProps>(function Input(
  {
    label,
    helperText,
    error,
    variant = 'default',
    size = 'md',
    disabled = false,
    containerStyle,
    inputStyle,
    labelStyle,
    helperTextStyle,
    errorTextStyle,
    fullWidth = true,
    onFocus,
    onBlur,
    ...props
  },
  ref
) {
  const [isFocused, setIsFocused] = useState(false);
  const theme = useTheme();
  const inputVariants = createInputVariants({
    colors: theme.colors,
    typography: theme.typography,
    spacing: theme.spacing,
    borderRadius: theme.borderRadius,
    shadows: theme.shadows,
  });

  const variantStyles = inputVariants[variant];
  const hasError = Boolean(error);

  // Size configurations
  const sizeConfig = {
    sm: {
      paddingHorizontal: theme.spacing[3],
      paddingVertical: theme.spacing[1],
      fontSize: theme.typography.fontSize.sm,
      borderRadius: theme.borderRadius.base,
      minHeight: 32,
    },
    md: {
      paddingHorizontal: theme.spacing[4],
      paddingVertical: theme.spacing[2],
      fontSize: theme.typography.fontSize.base,
      borderRadius: theme.borderRadius.md,
      minHeight: 40,
    },
    lg: {
      paddingHorizontal: theme.spacing[5],
      paddingVertical: theme.spacing[3],
      fontSize: theme.typography.fontSize.lg,
      borderRadius: theme.borderRadius.lg,
      minHeight: 48,
    },
  };

  const currentSize = sizeConfig[size];

  const containerViewStyle: ViewStyle = {
    ...(fullWidth && { width: '100%' }),
    ...containerStyle,
  };

  const inputContainerStyle: ViewStyle = {
    backgroundColor: disabled
      ? variantStyles.disabledBackgroundColor
      : variantStyles.backgroundColor,
    borderColor: hasError
      ? variantStyles.errorBorderColor
      : isFocused
        ? variantStyles.focusedBorderColor
        : variantStyles.borderColor,
    borderWidth: variant === 'default' ? 1 : isFocused || hasError ? 1 : 0,
    borderRadius: currentSize.borderRadius,
    paddingHorizontal: currentSize.paddingHorizontal,
    paddingVertical: currentSize.paddingVertical,
    minHeight: currentSize.minHeight,
    opacity: disabled ? 0.6 : 1,
  };

  const textInputStyle: TextStyle = {
    flex: 1,
    fontSize: currentSize.fontSize,
    color: disabled ? variantStyles.disabledTextColor : variantStyles.textColor,
    fontFamily: theme.typography.fontFamily.body,
    ...inputStyle,
  };

  const labelTextStyle: TextStyle = {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing[1],
    ...labelStyle,
  };

  const helperTextTextStyle: TextStyle = {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.text.secondary,
    marginTop: theme.spacing[1],
    ...helperTextStyle,
  };

  const errorTextTextStyle: TextStyle = {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.error[500],
    marginTop: theme.spacing[1],
    ...errorTextStyle,
  };

  const handleFocus = (
    e: Parameters<NonNullable<TextInputProps['onFocus']>>[0]
  ) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (
    e: Parameters<NonNullable<TextInputProps['onBlur']>>[0]
  ) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  return (
    <View style={containerViewStyle}>
      {label && <Text style={labelTextStyle}>{label}</Text>}

      <View style={inputContainerStyle}>
        <TextInput
          ref={ref}
          style={textInputStyle}
          placeholderTextColor={variantStyles.placeholderColor}
          editable={!disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          accessibilityLabel={label}
          accessibilityState={{ disabled }}
          {...props}
        />
      </View>

      {error && <Text style={errorTextTextStyle}>{error}</Text>}
      {!error && helperText && (
        <Text style={helperTextTextStyle}>{helperText}</Text>
      )}
    </View>
  );
});
