import {
  ColorTokens,
  TypographyTokens,
  SpacingTokens,
  BorderRadiusTokens,
  ShadowTokens,
} from './tokens';

export interface ComponentTheme {
  colors: ColorTokens;
  typography: TypographyTokens;
  spacing: SpacingTokens;
  borderRadius: BorderRadiusTokens;
  shadows: ShadowTokens;
}

// Button component theme variants
export interface ButtonVariants {
  primary: {
    backgroundColor: string;
    borderColor: string;
    textColor: string;
    pressedBackgroundColor: string;
    pressedBorderColor: string;
    disabledBackgroundColor: string;
    disabledTextColor: string;
  };
  secondary: {
    backgroundColor: string;
    borderColor: string;
    textColor: string;
    pressedBackgroundColor: string;
    pressedBorderColor: string;
    disabledBackgroundColor: string;
    disabledTextColor: string;
  };
  outline: {
    backgroundColor: string;
    borderColor: string;
    textColor: string;
    pressedBackgroundColor: string;
    pressedBorderColor: string;
    disabledBackgroundColor: string;
    disabledTextColor: string;
  };
  ghost: {
    backgroundColor: string;
    borderColor: string;
    textColor: string;
    pressedBackgroundColor: string;
    pressedBorderColor: string;
    disabledBackgroundColor: string;
    disabledTextColor: string;
  };
}

// Input component theme variants
export interface InputVariants {
  default: {
    backgroundColor: string;
    borderColor: string;
    textColor: string;
    placeholderColor: string;
    focusedBorderColor: string;
    errorBorderColor: string;
    disabledBackgroundColor: string;
    disabledTextColor: string;
  };
  filled: {
    backgroundColor: string;
    borderColor: string;
    textColor: string;
    placeholderColor: string;
    focusedBorderColor: string;
    errorBorderColor: string;
    disabledBackgroundColor: string;
    disabledTextColor: string;
  };
}

// Card component theme variants
export interface CardVariants {
  elevated: {
    backgroundColor: string;
    borderColor: string;
    shadow: string;
  };
  outlined: {
    backgroundColor: string;
    borderColor: string;
    shadow: string;
  };
  filled: {
    backgroundColor: string;
    borderColor: string;
    shadow: string;
  };
}

export const createButtonVariants = (
  theme: ComponentTheme
): ButtonVariants => ({
  primary: {
    backgroundColor: theme.colors.primary[500],
    borderColor: theme.colors.primary[500],
    textColor: theme.colors.text.inverse,
    pressedBackgroundColor: theme.colors.primary[600],
    pressedBorderColor: theme.colors.primary[600],
    disabledBackgroundColor: theme.colors.neutral[300],
    disabledTextColor: theme.colors.text.disabled,
  },
  secondary: {
    backgroundColor: theme.colors.secondary[500],
    borderColor: theme.colors.secondary[500],
    textColor: theme.colors.text.inverse,
    pressedBackgroundColor: theme.colors.secondary[600],
    pressedBorderColor: theme.colors.secondary[600],
    disabledBackgroundColor: theme.colors.neutral[300],
    disabledTextColor: theme.colors.text.disabled,
  },
  outline: {
    backgroundColor: 'transparent',
    borderColor: theme.colors.primary[500],
    textColor: theme.colors.primary[500],
    pressedBackgroundColor: theme.colors.primary[50],
    pressedBorderColor: theme.colors.primary[600],
    disabledBackgroundColor: 'transparent',
    disabledTextColor: theme.colors.text.disabled,
  },
  ghost: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    textColor: theme.colors.primary[500],
    pressedBackgroundColor: theme.colors.primary[50],
    pressedBorderColor: 'transparent',
    disabledBackgroundColor: 'transparent',
    disabledTextColor: theme.colors.text.disabled,
  },
});

export const createInputVariants = (theme: ComponentTheme): InputVariants => ({
  default: {
    backgroundColor: theme.colors.background,
    borderColor: theme.colors.neutral[300],
    textColor: theme.colors.text.primary,
    placeholderColor: theme.colors.text.tertiary,
    focusedBorderColor: theme.colors.primary[500],
    errorBorderColor: theme.colors.error[500],
    disabledBackgroundColor: theme.colors.neutral[100],
    disabledTextColor: theme.colors.text.disabled,
  },
  filled: {
    backgroundColor: theme.colors.neutral[100],
    borderColor: 'transparent',
    textColor: theme.colors.text.primary,
    placeholderColor: theme.colors.text.tertiary,
    focusedBorderColor: theme.colors.primary[500],
    errorBorderColor: theme.colors.error[500],
    disabledBackgroundColor: theme.colors.neutral[200],
    disabledTextColor: theme.colors.text.disabled,
  },
});

export const createCardVariants = (theme: ComponentTheme): CardVariants => ({
  elevated: {
    backgroundColor: theme.colors.surface,
    borderColor: 'transparent',
    shadow: 'md',
  },
  outlined: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.neutral[200],
    shadow: 'none',
  },
  filled: {
    backgroundColor: theme.colors.neutral[50],
    borderColor: 'transparent',
    shadow: 'none',
  },
});

// Typography component styles
export interface TypographyStyles {
  heading1: {
    fontSize: number;
    fontWeight: string;
    lineHeight: number;
    letterSpacing: number;
    color: string;
  };
  heading2: {
    fontSize: number;
    fontWeight: string;
    lineHeight: number;
    letterSpacing: number;
    color: string;
  };
  heading3: {
    fontSize: number;
    fontWeight: string;
    lineHeight: number;
    letterSpacing: number;
    color: string;
  };
  body: {
    fontSize: number;
    fontWeight: string;
    lineHeight: number;
    letterSpacing: number;
    color: string;
  };
  caption: {
    fontSize: number;
    fontWeight: string;
    lineHeight: number;
    letterSpacing: number;
    color: string;
  };
  label: {
    fontSize: number;
    fontWeight: string;
    lineHeight: number;
    letterSpacing: number;
    color: string;
  };
}

export const createTypographyStyles = (
  theme: ComponentTheme
): TypographyStyles => ({
  heading1: {
    fontSize: theme.typography.fontSize['3xl'],
    fontWeight: theme.typography.fontWeight.bold,
    lineHeight:
      theme.typography.fontSize['3xl'] * theme.typography.lineHeight.tight,
    letterSpacing: theme.typography.letterSpacing.tight,
    color: theme.colors.text.primary,
  },
  heading2: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: theme.typography.fontWeight.semibold,
    lineHeight:
      theme.typography.fontSize['2xl'] * theme.typography.lineHeight.tight,
    letterSpacing: theme.typography.letterSpacing.tight,
    color: theme.colors.text.primary,
  },
  heading3: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.semibold,
    lineHeight:
      theme.typography.fontSize.xl * theme.typography.lineHeight.normal,
    letterSpacing: theme.typography.letterSpacing.normal,
    color: theme.colors.text.primary,
  },
  body: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.normal,
    lineHeight:
      theme.typography.fontSize.base * theme.typography.lineHeight.normal,
    letterSpacing: theme.typography.letterSpacing.normal,
    color: theme.colors.text.primary,
  },
  caption: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.normal,
    lineHeight:
      theme.typography.fontSize.sm * theme.typography.lineHeight.normal,
    letterSpacing: theme.typography.letterSpacing.normal,
    color: theme.colors.text.secondary,
  },
  label: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    lineHeight:
      theme.typography.fontSize.sm * theme.typography.lineHeight.normal,
    letterSpacing: theme.typography.letterSpacing.wide,
    color: theme.colors.text.primary,
  },
});
