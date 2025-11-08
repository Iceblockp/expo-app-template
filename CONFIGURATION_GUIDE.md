# Configuration Guide

This guide explains how to customize the Universal Expo React Native Template for your specific project needs.

## Table of Contents

- [App Identity](#app-identity)
- [Bundle Identifiers](#bundle-identifiers)
- [App Icons and Splash Screen](#app-icons-and-splash-screen)
- [Environment Configuration](#environment-configuration)
- [API Configuration](#api-configuration)
- [Theme and Branding](#theme-and-branding)
- [Deep Linking](#deep-linking)
- [Permissions](#permissions)

## App Identity

### App Name

Update the app name in `app.config.js`:

```javascript
const getAppName = () => {
  if (IS_DEV) return 'YourApp (Dev)';
  if (IS_STAGING) return 'YourApp (Staging)';
  return 'YourApp';
};
```

### App Slug

The slug is used for Expo services and URLs. Update in `app.config.js`:

```javascript
slug: 'your-app-slug',
```

### App Version

Update the version number in `app.config.js`:

```javascript
version: '1.0.0',
```

Also update build numbers:

```javascript
ios: {
  buildNumber: '1',
},
android: {
  versionCode: 1,
},
```

## Bundle Identifiers

Bundle identifiers uniquely identify your app on iOS and Android.

### iOS Bundle Identifier

Update in `app.config.js`:

```javascript
const getBundleIdentifier = () => {
  const base = 'com.yourcompany.yourapp';
  if (IS_DEV) return `${base}.dev`;
  if (IS_STAGING) return `${base}.staging`;
  return base;
};
```

### Android Package Name

Update in `app.config.js`:

```javascript
const getPackageName = () => {
  const base = 'com.yourcompany.yourapp';
  if (IS_DEV) return `${base}.dev`;
  if (IS_STAGING) return `${base}.staging`;
  return base;
};
```

### Requirements

- Must be unique across all apps
- Use reverse domain notation (e.g., `com.company.app`)
- Can only contain letters, numbers, and periods
- Cannot start with a number

## App Icons and Splash Screen

### App Icon

Replace `assets/icon.png` with your app icon:

- **Size**: 1024x1024 pixels
- **Format**: PNG with transparency
- **Content**: Should work on both light and dark backgrounds

### Android Adaptive Icon

Replace `assets/adaptive-icon.png`:

- **Size**: 1024x1024 pixels
- **Format**: PNG with transparency
- **Safe zone**: Keep important content in center 66% (684x684)

Update background color in `app.config.js`:

```javascript
android: {
  adaptiveIcon: {
    foregroundImage: './assets/adaptive-icon.png',
    backgroundColor: '#ffffff', // Your brand color
  },
},
```

### Splash Screen

Replace `assets/splash-icon.png`:

- **Size**: 1024x1024 pixels
- **Format**: PNG with transparency

Update splash configuration in `app.config.js`:

```javascript
splash: {
  image: './assets/splash-icon.png',
  resizeMode: 'contain', // or 'cover'
  backgroundColor: '#ffffff', // Your brand color
},
```

### Web Favicon

Replace `assets/favicon.png`:

- **Size**: 48x48 pixels (or larger)
- **Format**: PNG

## Environment Configuration

### Environment Variables

Update environment-specific values in:

- `.env.development`
- `.env.staging`
- `.env.production`

Example configuration:

```env
# API Configuration
API_BASE_URL=https://api.yourapp.com
API_TIMEOUT=15000

# App Configuration
APP_NAME=YourApp
APP_VERSION=1.0.0

# Feature Flags
ENABLE_DEV_TOOLS=false
ENABLE_ANALYTICS=true

# Third-party Services
SENTRY_DSN=your-sentry-dsn
ANALYTICS_KEY=your-analytics-key
```

### Using Environment Variables

Access environment variables in your code:

```typescript
import { config } from '@/config';

// Use configuration values
const apiUrl = config.apiBaseUrl;
const isDevMode = config.enableDevTools;
```

### Adding New Environment Variables

1. Add to environment files (`.env.*`)
2. Update `src/config/env.ts`:

```typescript
interface EnvironmentConfig {
  // ... existing fields
  yourNewField: string;
}

const configs: Record<
  Environment,
  Omit<EnvironmentConfig, 'environment' | 'appVersion' | 'buildNumber'>
> = {
  development: {
    // ... existing config
    yourNewField: 'dev-value',
  },
  // ... other environments
};
```

## API Configuration

### Base URL

Update API base URLs in `src/config/env.ts`:

```typescript
const configs: Record<Environment, ...> = {
  development: {
    apiBaseUrl: 'https://dev-api.yourapp.com',
  },
  staging: {
    apiBaseUrl: 'https://staging-api.yourapp.com',
  },
  production: {
    apiBaseUrl: 'https://api.yourapp.com',
  },
};
```

### API Client

The API client is configured in `src/services/api/client.ts`. Update headers, interceptors, or timeout as needed:

```typescript
import { config } from '@/config';

const apiClient = axios.create({
  baseURL: config.apiBaseUrl,
  timeout: config.apiTimeout,
  headers: {
    'Content-Type': 'application/json',
    // Add custom headers
  },
});
```

## Theme and Branding

### Brand Colors

Update theme colors in `src/theme/tokens.ts`:

```typescript
export const colors = {
  light: {
    primary: '#your-primary-color',
    secondary: '#your-secondary-color',
    // ... other colors
  },
  dark: {
    primary: '#your-primary-color-dark',
    secondary: '#your-secondary-color-dark',
    // ... other colors
  },
};
```

### Typography

Update fonts in `src/theme/tokens.ts`:

```typescript
export const typography = {
  fonts: {
    heading: 'YourHeadingFont',
    body: 'YourBodyFont',
    mono: 'YourMonoFont',
  },
  // ... sizes and weights
};
```

To use custom fonts:

1. Add font files to `assets/fonts/`
2. Load fonts in `app/_layout.tsx`
3. Update font names in theme tokens

### Tailwind Configuration

Update `tailwind.config.js` for custom design tokens:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#your-primary-color',
        secondary: '#your-secondary-color',
      },
      fontFamily: {
        heading: ['YourHeadingFont'],
        body: ['YourBodyFont'],
      },
    },
  },
};
```

## Deep Linking

### URL Scheme

Update the URL scheme in `app.config.js`:

```javascript
const getScheme = () => {
  if (IS_DEV) return 'yourapp-dev';
  if (IS_STAGING) return 'yourapp-staging';
  return 'yourapp';
};
```

### Universal Links (iOS)

Add associated domains in `app.config.js`:

```javascript
ios: {
  associatedDomains: [
    'applinks:yourapp.com',
    'applinks:www.yourapp.com',
  ],
},
```

### App Links (Android)

Add intent filters in `app.config.js`:

```javascript
android: {
  intentFilters: [
    {
      action: 'VIEW',
      autoVerify: true,
      data: [
        {
          scheme: 'https',
          host: 'yourapp.com',
        },
      ],
      category: ['BROWSABLE', 'DEFAULT'],
    },
  ],
},
```

## Permissions

### iOS Permissions

Update permission descriptions in `app.config.js`:

```javascript
ios: {
  infoPlist: {
    NSCameraUsageDescription: 'YourApp needs camera access to take photos.',
    NSPhotoLibraryUsageDescription: 'YourApp needs photo library access to select images.',
    NSLocationWhenInUseUsageDescription: 'YourApp uses your location for [specific feature].',
    NSMicrophoneUsageDescription: 'YourApp needs microphone access to record audio.',
    NSContactsUsageDescription: 'YourApp needs contacts access to [specific feature].',
  },
},
```

### Android Permissions

Update permissions array in `app.config.js`:

```javascript
android: {
  permissions: [
    'CAMERA',
    'READ_EXTERNAL_STORAGE',
    'WRITE_EXTERNAL_STORAGE',
    'ACCESS_FINE_LOCATION',
    'ACCESS_COARSE_LOCATION',
    'RECORD_AUDIO',
    'READ_CONTACTS',
    // Add only permissions you need
  ],
},
```

### Best Practices

- Only request permissions you actually need
- Provide clear descriptions explaining why you need each permission
- Request permissions at the point of use, not on app launch
- Handle permission denials gracefully

## EAS Configuration

### Project ID

Update your Expo project ID in `app.config.js`:

```javascript
extra: {
  eas: {
    projectId: 'your-actual-project-id',
  },
},
```

Get your project ID from:

```bash
eas project:info
```

### Updates URL

Update the updates URL in `app.config.js`:

```javascript
updates: {
  url: 'https://u.expo.dev/your-project-id',
},
```

### Build Profiles

Customize build profiles in `eas.json` as needed:

```json
{
  "build": {
    "production": {
      "env": {
        "APP_ENV": "production",
        "YOUR_CUSTOM_VAR": "value"
      }
    }
  }
}
```

## Localization

### Adding Languages

1. Create language directory in `src/locales/`:

   ```
   src/locales/fr/
   ```

2. Add translation files:

   ```
   src/locales/fr/common.json
   src/locales/fr/auth.json
   src/locales/fr/settings.json
   ```

3. Update `src/locales/i18n.config.ts`:
   ```typescript
   const resources = {
     en: { ... },
     es: { ... },
     fr: { ... }, // Add new language
   };
   ```

### Default Language

Update default language in `src/locales/i18n.config.ts`:

```typescript
i18n.init({
  lng: 'en', // Your default language
  fallbackLng: 'en',
  // ...
});
```

## Analytics and Monitoring

### Sentry Configuration

Add Sentry DSN to environment files:

```env
SENTRY_DSN=your-sentry-dsn
```

### Analytics

Add analytics keys to environment files:

```env
ANALYTICS_KEY=your-analytics-key
```

Implement analytics in your code:

```typescript
import { config } from '@/config';

if (config.enableAnalytics) {
  // Initialize analytics
}
```

## Next Steps

After configuration:

1. Test all environments (dev, staging, production)
2. Verify deep linking works
3. Test on both iOS and Android
4. Verify all permissions work as expected
5. Test theme and branding
6. Create test builds
7. Submit to app stores

For build and deployment instructions, see [BUILD_GUIDE.md](./BUILD_GUIDE.md).
