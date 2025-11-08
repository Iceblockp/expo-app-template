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

// Performance optimizations
config.transformer.minifierConfig = {
  compress: {
    // Remove console logs in production
    drop_console: process.env.NODE_ENV === 'production',
    // Remove debugger statements
    drop_debugger: true,
    // Reduce code size
    reduce_vars: true,
    collapse_vars: true,
  },
  mangle: {
    // Mangle variable names for smaller bundle size
    toplevel: true,
  },
  output: {
    // Remove comments
    comments: false,
    // Beautify output in development
    beautify: process.env.NODE_ENV !== 'production',
  },
};

// Asset optimization
config.transformer.assetPlugins = ['expo-asset/tools/hashAssetFiles'];

module.exports = withNativeWind(config, { input: './global.css' });
