import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useNativeWindTheme, cn } from '@/hooks/useNativeWindTheme';

interface NativeWindExampleProps {
  title?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onPress?: () => void;
}

/**
 * Example component demonstrating NativeWind integration with theme system
 */
export const NativeWindExample: React.FC<NativeWindExampleProps> = ({
  title = 'NativeWind Button',
  variant = 'primary',
  size = 'md',
  onPress,
}) => {
  const theme = useNativeWindTheme();

  // Size variants
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  // Get button variant classes
  const buttonVariant = theme.button[variant];

  return (
    <View className={cn('p-4', theme.bg.background)}>
      {/* Card example */}
      <View className={cn('mb-4 p-4 rounded-lg', theme.card.elevated)}>
        <Text className={cn('text-lg font-semibold mb-2', theme.text.primary)}>
          NativeWind Theme Integration
        </Text>
        <Text className={cn('mb-4', theme.text.secondary)}>
          This component demonstrates NativeWind classes that automatically
          adapt to light/dark themes.
        </Text>

        {/* Button example */}
        <Pressable
          onPress={onPress}
          className={cn(
            'rounded-md border items-center justify-center',
            sizeClasses[size],
            buttonVariant.base,
            buttonVariant.pressed
          )}
        >
          <Text className={cn('font-medium', buttonVariant.text)}>{title}</Text>
        </Pressable>
      </View>

      {/* Input example */}
      <View className={cn('mb-4 p-4 rounded-lg', theme.card.outlined)}>
        <Text className={cn('text-base font-medium mb-2', theme.text.primary)}>
          Input Examples
        </Text>

        <View className={cn('mb-3')}>
          <Text className={cn('text-sm mb-1', theme.text.secondary)}>
            Default Input
          </Text>
          <View
            className={cn(
              'px-3 py-2 rounded border',
              theme.input.default.base,
              theme.input.default.focused
            )}
          >
            <Text className={cn(theme.input.default.placeholder)}>
              Placeholder text
            </Text>
          </View>
        </View>

        <View>
          <Text className={cn('text-sm mb-1', theme.text.secondary)}>
            Filled Input
          </Text>
          <View
            className={cn(
              'px-3 py-2 rounded',
              theme.input.filled.base,
              theme.input.filled.focused
            )}
          >
            <Text className={cn(theme.input.filled.placeholder)}>
              Filled input style
            </Text>
          </View>
        </View>
      </View>

      {/* Typography examples */}
      <View className={cn('p-4 rounded-lg', theme.card.filled)}>
        <Text className={cn('text-2xl font-bold mb-2', theme.text.primary)}>
          Typography Scale
        </Text>
        <Text className={cn('text-lg font-semibold mb-1', theme.text.primary)}>
          Heading 2
        </Text>
        <Text className={cn('text-base mb-1', theme.text.primary)}>
          Body text with normal weight
        </Text>
        <Text className={cn('text-sm', theme.text.secondary)}>
          Secondary text in smaller size
        </Text>
        <Text className={cn('text-xs mt-2', theme.text.tertiary)}>
          Tertiary text for captions
        </Text>
      </View>

      {/* Responsive example */}
      <View
        className={cn(
          'mt-4 p-4 rounded-lg',
          'sm:p-6 md:p-8',
          theme.card.elevated
        )}
      >
        <Text
          className={cn(
            'font-semibold mb-2',
            'text-base sm:text-lg md:text-xl',
            theme.text.primary
          )}
        >
          Responsive Design
        </Text>
        <Text className={cn('text-sm sm:text-base', theme.text.secondary)}>
          This content adapts to different screen sizes using responsive
          classes.
        </Text>
      </View>
    </View>
  );
};
