import React from 'react';
import { Text, TextProps, TextStyle } from 'react-native';
import { useTheme } from '@/theme/provider';
import { createTypographyStyles } from '@/theme/components';

export type TypographyVariant =
  | 'heading1'
  | 'heading2'
  | 'heading3'
  | 'body'
  | 'caption'
  | 'label';
export type TypographyColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'inverse'
  | 'disabled';

export interface TypographyProps extends Omit<TextProps, 'style'> {
  /**
   * Typography variant
   */
  variant?: TypographyVariant;
  /**
   * Text color variant
   */
  color?: TypographyColor;
  /**
   * Custom text style
   */
  style?: TextStyle;
  /**
   * Text alignment
   */
  align?: 'left' | 'center' | 'right' | 'justify';
  /**
   * Whether text should be selectable
   */
  selectable?: boolean;
}

/**
 * Typography component with predefined text styles
 * Supports heading, body, caption, and label variants
 */
export const Typography: React.FC<TypographyProps> = ({
  variant = 'body',
  color = 'primary',
  style,
  align = 'left',
  selectable = false,
  children,
  ...props
}) => {
  const theme = useTheme();
  const typographyStyles = createTypographyStyles({
    colors: theme.colors,
    typography: theme.typography,
    spacing: theme.spacing,
    borderRadius: theme.borderRadius,
    shadows: theme.shadows,
  });

  const variantStyle = typographyStyles[variant];

  // Get color from theme
  const getTextColor = () => {
    switch (color) {
      case 'primary':
        return theme.colors.text.primary;
      case 'secondary':
        return theme.colors.text.secondary;
      case 'tertiary':
        return theme.colors.text.tertiary;
      case 'inverse':
        return theme.colors.text.inverse;
      case 'disabled':
        return theme.colors.text.disabled;
      default:
        return theme.colors.text.primary;
    }
  };
  const textStyle = {
    ...variantStyle,
    color: getTextColor(),
    textAlign: align,
    fontFamily: theme.typography.fontFamily.body,
    ...style,
  } as TextStyle;

  return (
    <Text
      style={textStyle}
      selectable={selectable}
      accessibilityRole="text"
      {...props}
    >
      {children}
    </Text>
  );
};

// Convenience components for common typography variants
export const Heading1: React.FC<Omit<TypographyProps, 'variant'>> = props => (
  <Typography variant="heading1" {...props} />
);

export const Heading2: React.FC<Omit<TypographyProps, 'variant'>> = props => (
  <Typography variant="heading2" {...props} />
);

export const Heading3: React.FC<Omit<TypographyProps, 'variant'>> = props => (
  <Typography variant="heading3" {...props} />
);

export const Body: React.FC<Omit<TypographyProps, 'variant'>> = props => (
  <Typography variant="body" {...props} />
);

export const Caption: React.FC<Omit<TypographyProps, 'variant'>> = props => (
  <Typography variant="caption" {...props} />
);

export const Label: React.FC<Omit<TypographyProps, 'variant'>> = props => (
  <Typography variant="label" {...props} />
);
