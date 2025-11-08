/**
 * Dynamic Expo Configuration
 *
 * This file allows for environment-specific configuration at build time.
 * It replaces the static app.json with a dynamic configuration.
 */

const IS_DEV = process.env.APP_ENV === 'development';
const IS_STAGING = process.env.APP_ENV === 'staging';

// Determine app name based on environment
const getAppName = () => {
  if (IS_DEV) return 'Template (Dev)';
  if (IS_STAGING) return 'Template (Staging)';
  return 'Universal Expo Template';
};

// Determine bundle identifier based on environment
const getBundleIdentifier = () => {
  const base = 'com.template.expotemplate';
  if (IS_DEV) return `${base}.dev`;
  if (IS_STAGING) return `${base}.staging`;
  return base;
};

// Determine package name based on environment
const getPackageName = () => {
  const base = 'com.template.expotemplate';
  if (IS_DEV) return `${base}.dev`;
  if (IS_STAGING) return `${base}.staging`;
  return base;
};

// Determine scheme based on environment
const getScheme = () => {
  if (IS_DEV) return 'expo-template-dev';
  if (IS_STAGING) return 'expo-template-staging';
  return 'expo-template';
};

export default {
  expo: {
    name: getAppName(),
    slug: 'expo-react-native-template',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,
    scheme: getScheme(),
    plugins: ['expo-router'],
    splash: {
      image: './assets/splash-icon.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: getBundleIdentifier(),
      buildNumber: '1',
      infoPlist: {
        CFBundleDisplayName: getAppName(),
        NSCameraUsageDescription: 'This app uses the camera to take photos.',
        NSPhotoLibraryUsageDescription:
          'This app accesses your photos to let you share them.',
        NSLocationWhenInUseUsageDescription:
          'This app uses your location to provide location-based features.',
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
      package: getPackageName(),
      versionCode: 1,
      permissions: [
        'CAMERA',
        'READ_EXTERNAL_STORAGE',
        'WRITE_EXTERNAL_STORAGE',
        'ACCESS_FINE_LOCATION',
        'ACCESS_COARSE_LOCATION',
      ],
    },
    web: {
      favicon: './assets/favicon.png',
      bundler: 'metro',
    },
    extra: {
      releaseChannel: process.env.APP_ENV || 'development',
      eas: {
        projectId: 'your-project-id-here',
      },
    },
    updates: {
      url: 'https://u.expo.dev/your-project-id-here',
    },
    runtimeVersion: {
      policy: 'appVersion',
    },
  },
};
