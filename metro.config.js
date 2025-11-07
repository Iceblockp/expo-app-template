const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// Remove web platform since we're not using it
config.resolver.platforms = ['ios', 'android', 'native'];

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

// Essential for Expo Router to work properly
config.transformer.unstable_allowRequireContext = true;

module.exports = withNativeWind(config, { input: './global.css' });
