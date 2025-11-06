const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// Enable tree shaking for better bundle optimization
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

// Configure asset extensions
config.resolver.assetExts.push(
  // Fonts
  'otf',
  'ttf',
  // Images
  'svg',
  'webp',
  // Audio
  'mp3',
  'wav',
  'm4a',
  'aac',
  // Video
  'mp4',
  'mov',
  'avi',
  'mkv'
);

// Configure source extensions for NativeWind CSS support
config.resolver.sourceExts.push('jsx', 'js', 'ts', 'tsx', 'json', 'css');

// Enable minification in production
config.transformer.minifierConfig = {
  mangle: {
    keep_fnames: true,
  },
  output: {
    ascii_only: true,
    quote_style: 3,
    wrap_iife: true,
  },
  sourceMap: {
    includeSources: false,
  },
  toplevel: false,
  warnings: false,
};

// Enable experimental features for better performance
config.transformer.experimentalImportSupport = true;
config.transformer.unstable_allowRequireContext = true;

module.exports = withNativeWind(config, { input: './global.css' });
