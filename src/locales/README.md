# Internationalization (i18n) System

This directory contains the internationalization setup for the application using `react-i18next` and `expo-localization`.

## Features

- ✅ Multi-language support (English, Spanish, Arabic)
- ✅ Automatic device language detection
- ✅ Language persistence across app sessions
- ✅ RTL (Right-to-Left) layout support
- ✅ TypeScript support for translation keys
- ✅ Namespace organization for better code splitting
- ✅ Interpolation and pluralization support

## Directory Structure

```
src/locales/
├── en/                      # English translations
│   ├── common.json         # Common translations
│   ├── auth.json           # Authentication screens
│   ├── onboarding.json     # Onboarding flow
│   └── settings.json       # Settings screens
├── es/                      # Spanish translations
│   └── ...
├── ar/                      # Arabic translations (RTL)
│   └── ...
├── i18n.config.ts          # i18n configuration
├── LocalizationProvider.tsx # Provider component
├── types.ts                # TypeScript type definitions
├── index.ts                # Exports
└── README.md               # This file
```

## Usage

### Basic Translation

```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation('common');

  return <Text>{t('app.welcome')}</Text>;
}
```

### Using the Custom Hook

```tsx
import { useLocalization } from '@/hooks';

function LanguageSettings() {
  const { language, setLanguage, t, isRTL } = useLocalization('settings');

  return (
    <View>
      <Text>
        {t('language.current')}: {language}
      </Text>
      <Button onPress={() => setLanguage('es')}>Switch to Spanish</Button>
    </View>
  );
}
```

### Multiple Namespaces

```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation(['common', 'auth']);

  return (
    <View>
      <Text>{t('common:app.welcome')}</Text>
      <Text>{t('auth:login.title')}</Text>
    </View>
  );
}
```

### Interpolation

```tsx
const { t } = useTranslation('common');

// Translation: "Must be at least {{min}} characters"
<Text>{t('validation.minLength', { min: 8 })}</Text>;
```

### Language Selector Component

```tsx
import { LanguageSelector } from '@/components/common';

function SettingsScreen() {
  return (
    <View>
      <LanguageSelector
        onLanguageChange={lang => console.log('Changed to:', lang)}
      />
    </View>
  );
}
```

## Adding a New Language

1. Create a new directory under `src/locales/` with the language code (e.g., `fr/`)
2. Add translation files for each namespace:
   - `common.json`
   - `auth.json`
   - `onboarding.json`
   - `settings.json`

3. Update `src/locales/i18n.config.ts`:

```typescript
import frCommon from './fr/common.json';
import frAuth from './fr/auth.json';
// ... other imports

export const LANGUAGES = {
  en: { name: 'English', nativeName: 'English', isRTL: false },
  es: { name: 'Spanish', nativeName: 'Español', isRTL: false },
  ar: { name: 'Arabic', nativeName: 'العربية', isRTL: true },
  fr: { name: 'French', nativeName: 'Français', isRTL: false }, // Add new language
} as const;

const resources = {
  en: {
    /* ... */
  },
  es: {
    /* ... */
  },
  ar: {
    /* ... */
  },
  fr: {
    // Add resources
    common: frCommon,
    auth: frAuth,
    onboarding: frOnboarding,
    settings: frSettings,
  },
} as const;
```

## Adding New Translation Keys

1. Add the key to all language files in the appropriate namespace
2. Update the TypeScript types in `src/locales/types.ts`:

```typescript
export type CommonTranslationKeys = 'app.name' | 'app.welcome' | 'app.newKey'; // Add new key
// ...
```

## RTL Support

The system automatically handles RTL layout for languages marked with `isRTL: true`. When switching to an RTL language:

1. The app detects the RTL requirement
2. Sets `I18nManager.forceRTL(true)`
3. In production, automatically reloads the app
4. In development, logs a warning to manually reload

### Testing RTL

To test RTL layout:

```tsx
import { useLocalization } from '@/hooks';

function MyComponent() {
  const { isRTL } = useLocalization();

  return (
    <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
      {/* Content */}
    </View>
  );
}
```

## Best Practices

1. **Use Namespaces**: Organize translations by feature/screen
2. **Avoid Hardcoded Strings**: Always use translation keys
3. **Keep Keys Descriptive**: Use dot notation for hierarchy (e.g., `auth.login.title`)
4. **Provide Context**: Use interpolation for dynamic content
5. **Test All Languages**: Ensure UI works with different text lengths
6. **Handle Missing Translations**: Always provide fallback values

## Translation File Format

```json
{
  "section": {
    "key": "Translation text",
    "withInterpolation": "Hello {{name}}",
    "nested": {
      "deep": "Deeply nested value"
    }
  }
}
```

## API Reference

### useLocalization Hook

```typescript
interface UseLocalizationReturn {
  language: LanguageCode; // Current language code
  setLanguage: (lang: LanguageCode) => Promise<void>; // Change language
  t: (key: string, options?: any) => string; // Translation function
  isRTL: boolean; // Is current language RTL
  availableLanguages: typeof LANGUAGES; // All available languages
  isChangingLanguage: boolean; // Loading state
}
```

### LocalizationProvider

Wrap your app with this provider to enable i18n:

```tsx
import { LocalizationProvider } from '@/locales';

export default function App() {
  return <LocalizationProvider>{/* Your app */}</LocalizationProvider>;
}
```

## Troubleshooting

### Translations Not Updating

- Ensure you've imported the translation files correctly
- Check that the namespace is loaded in `i18n.config.ts`
- Verify the translation key exists in all language files

### RTL Not Working

- Make sure `I18nManager.allowRTL(true)` is called
- Reload the app after changing to RTL language
- Check that the language is marked with `isRTL: true`

### TypeScript Errors

- Update type definitions in `src/locales/types.ts`
- Ensure all translation keys are defined in the types
- Run `npm run type-check` to verify

## Resources

- [react-i18next Documentation](https://react.i18next.com/)
- [i18next Documentation](https://www.i18next.com/)
- [Expo Localization](https://docs.expo.dev/versions/latest/sdk/localization/)
