# Build and Deployment Guide

This guide covers building and deploying the Universal Expo React Native Template for different environments.

## Table of Contents

- [Environment Configuration](#environment-configuration)
- [Development Builds](#development-builds)
- [Staging Builds](#staging-builds)
- [Production Builds](#production-builds)
- [App Store Submission](#app-store-submission)
- [Troubleshooting](#troubleshooting)

## Environment Configuration

The template supports three environments:

- **Development**: For local development and testing
- **Staging**: For internal testing and QA
- **Production**: For production releases

### Environment Files

Each environment has its own configuration file:

- `.env.development` - Development environment variables
- `.env.staging` - Staging environment variables
- `.env.production` - Production environment variables

### Dynamic Configuration

The `app.config.js` file dynamically generates the Expo configuration based on the `APP_ENV` environment variable:

- Different app names (e.g., "Template (Dev)", "Template (Staging)")
- Different bundle identifiers (e.g., `com.template.expotemplate.dev`)
- Different URL schemes for deep linking

## Prerequisites

### Install EAS CLI

```bash
npm install -g eas-cli
```

### Login to Expo

```bash
eas login
```

### Configure EAS Project

1. Update the `projectId` in `app.config.js`:

   ```javascript
   extra: {
     eas: {
       projectId: 'your-actual-project-id',
     },
   },
   ```

2. Update the `updates.url` in `app.config.js` with your project ID

3. Configure iOS credentials in `eas.json` for production submissions

## Development Builds

Development builds include the Expo development client for faster iteration.

### Build for iOS Simulator

```bash
npm run build:dev:ios
```

This creates a simulator build that you can install on iOS Simulator.

### Build for Android Emulator/Device

```bash
npm run build:dev:android
```

This creates an APK that you can install on Android emulators or physical devices.

### Running Development Builds

After installing the development build:

```bash
# Start the development server
npm run start:dev

# Or start with specific platform
npm run ios:dev
npm run android:dev
```

## Staging Builds

Staging builds are for internal testing and QA teams.

### Build Staging for iOS

```bash
npm run build:staging:ios
```

This creates an ad-hoc build for internal distribution.

### Build Staging for Android

```bash
npm run build:staging:android
```

This creates an APK for internal distribution.

### Running Staging Builds

```bash
npm run start:staging
```

## Production Builds

Production builds are optimized and ready for app store submission.

### Build Production for iOS

```bash
npm run build:prod:ios
```

This creates an iOS build ready for App Store submission.

### Build Production for Android

```bash
npm run build:prod:android
```

This creates an AAB (Android App Bundle) ready for Google Play submission.

### Build for Both Platforms

```bash
npm run build:prod:all
```

### Running Production Builds Locally

```bash
npm run start:prod
```

## App Store Submission

### iOS App Store

1. Build the production iOS app:

   ```bash
   npm run build:prod:ios
   ```

2. Submit to App Store:

   ```bash
   npm run submit:ios
   ```

3. Configure your Apple ID credentials in `eas.json`:
   ```json
   "submit": {
     "production": {
       "ios": {
         "appleId": "your-apple-id@example.com",
         "ascAppId": "your-asc-app-id",
         "appleTeamId": "your-apple-team-id"
       }
     }
   }
   ```

### Google Play Store

1. Build the production Android app:

   ```bash
   npm run build:prod:android
   ```

2. Submit to Google Play:

   ```bash
   npm run submit:android
   ```

3. Configure your service account in `eas.json`:
   ```json
   "submit": {
     "production": {
       "android": {
         "serviceAccountKeyPath": "./path-to-service-account-key.json",
         "track": "internal"
       }
     }
   }
   ```

## App Icons and Splash Screens

### Current Assets

The template includes placeholder assets in the `assets/` directory:

- `icon.png` - App icon (1024x1024)
- `adaptive-icon.png` - Android adaptive icon (1024x1024)
- `splash-icon.png` - Splash screen icon
- `favicon.png` - Web favicon

### Customizing Assets

1. Replace the placeholder images with your branded assets
2. Ensure images meet the size requirements:
   - App icon: 1024x1024 PNG
   - Adaptive icon: 1024x1024 PNG with transparent background
   - Splash icon: 1024x1024 PNG

3. Update splash screen background color in `app.config.js`:
   ```javascript
   splash: {
     image: './assets/splash-icon.png',
     resizeMode: 'contain',
     backgroundColor: '#your-brand-color',
   },
   ```

## Build Profiles

The `eas.json` file defines different build profiles:

### Development Profile

- Includes development client
- Internal distribution
- Debug configuration
- Simulator/emulator support

### Staging Profile

- Internal distribution
- Release configuration
- Ad-hoc provisioning (iOS)
- APK build (Android)

### Preview Profile

- Similar to staging
- For testing before production
- Internal distribution

### Production Profile

- App store distribution
- Release configuration
- AAB build for Android
- Optimized and minified

## Environment-Specific Configuration

The app automatically loads the correct configuration based on the build profile:

```typescript
// src/config/env.ts
import { config } from '@/config';

// Access environment-specific values
console.log(config.apiBaseUrl); // Different per environment
console.log(config.environment); // 'development' | 'staging' | 'production'
```

## Version Management

### Updating Version Numbers

1. Update version in `app.config.js`:

   ```javascript
   version: '1.1.0',
   ```

2. Update iOS build number:

   ```javascript
   ios: {
     buildNumber: '2',
   },
   ```

3. Update Android version code:
   ```javascript
   android: {
     versionCode: 2,
   },
   ```

### Semantic Versioning

Follow semantic versioning (MAJOR.MINOR.PATCH):

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes

## Over-the-Air (OTA) Updates

The template is configured for Expo Updates:

```javascript
updates: {
  url: 'https://u.expo.dev/your-project-id-here',
},
runtimeVersion: {
  policy: 'appVersion',
},
```

### Publishing Updates

```bash
# Publish update for production
eas update --branch production --message "Bug fixes"

# Publish update for staging
eas update --branch staging --message "New features"
```

## Troubleshooting

### Build Failures

1. **Clear cache and retry**:

   ```bash
   eas build --clear-cache --profile production --platform ios
   ```

2. **Check credentials**:

   ```bash
   eas credentials
   ```

3. **Verify configuration**:
   ```bash
   eas config
   ```

### Environment Variables Not Loading

- Ensure `APP_ENV` is set correctly in the build command
- Check that the environment file exists (`.env.development`, etc.)
- Verify `app.config.js` is reading the environment correctly

### Bundle Identifier Conflicts

If you get bundle identifier conflicts:

1. Update the base identifier in `app.config.js`:

   ```javascript
   const base = 'com.yourcompany.yourapp';
   ```

2. Ensure each environment has a unique identifier:
   - Development: `com.yourcompany.yourapp.dev`
   - Staging: `com.yourcompany.yourapp.staging`
   - Production: `com.yourcompany.yourapp`

### Submission Errors

- **iOS**: Verify Apple ID credentials and app-specific password
- **Android**: Ensure service account has proper permissions
- Check that version numbers are incremented from previous submissions

## Best Practices

1. **Always test staging builds** before creating production builds
2. **Increment version numbers** for each release
3. **Use semantic versioning** consistently
4. **Test on physical devices** before submission
5. **Keep credentials secure** - never commit them to version control
6. **Document changes** in release notes
7. **Monitor crash reports** after releases
8. **Use OTA updates** for quick bug fixes (when possible)

## Additional Resources

- [Expo EAS Build Documentation](https://docs.expo.dev/build/introduction/)
- [Expo EAS Submit Documentation](https://docs.expo.dev/submit/introduction/)
- [Expo Updates Documentation](https://docs.expo.dev/eas-update/introduction/)
- [App Store Connect Guide](https://developer.apple.com/app-store-connect/)
- [Google Play Console Guide](https://support.google.com/googleplay/android-developer/)
