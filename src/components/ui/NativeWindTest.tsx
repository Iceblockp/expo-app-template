import React from 'react';
import { View, Text, Pressable } from 'react-native';

/**
 * Simple test component to verify NativeWind is working correctly
 */
export const NativeWindTest: React.FC = () => {
  return (
    <View className="flex-1 bg-white dark:bg-gray-900 p-4">
      <View className="bg-blue-50 dark:bg-blue-900 p-6 rounded-lg mb-4">
        <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          NativeWind Test
        </Text>
        <Text className="text-gray-600 dark:text-gray-300 mb-4">
          This component uses NativeWind classes and should adapt to light/dark
          themes.
        </Text>

        <Pressable className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 px-4 py-2 rounded-md">
          <Text className="text-white font-medium text-center">
            Test Button
          </Text>
        </Pressable>
      </View>

      <View className="flex-row space-x-2 mb-4">
        <View className="flex-1 bg-red-100 dark:bg-red-900 p-3 rounded">
          <Text className="text-red-800 dark:text-red-200 text-sm font-medium">
            Error State
          </Text>
        </View>
        <View className="flex-1 bg-green-100 dark:bg-green-900 p-3 rounded">
          <Text className="text-green-800 dark:text-green-200 text-sm font-medium">
            Success State
          </Text>
        </View>
      </View>

      <View className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
        <Text className="text-xs text-gray-500 dark:text-gray-400 mb-1">
          Responsive Text
        </Text>
        <Text className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-900 dark:text-white">
          This text scales with screen size
        </Text>
      </View>
    </View>
  );
};
