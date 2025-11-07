module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
    plugins: [
      // Enable module path mapping for absolute imports
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@': './src',
            '@/components': './src/components',
            '@/screens': './src/screens',
            '@/navigation': './src/navigation',
            '@/store': './src/store',
            '@/services': './src/services',
            '@/hooks': './src/hooks',
            '@/utils': './src/utils',
            '@/constants': './src/constants',
            '@/types': './src/types',
            '@/locales': './src/locales',
            '@/theme': './src/theme',
          },
        },
      ],
      // Note: transform-inline-environment-variables is commented out because it conflicts with Expo Router
      // 'transform-inline-environment-variables',
      'react-native-worklets/plugin',
    ],
  };
};
