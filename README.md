# Universal Expo React Native Template

A comprehensive, production-ready starter template for React Native applications built with Expo SDK 54.

## Features

- ✅ **Expo SDK 54** with TypeScript support
- ✅ **Development Tools** - ESLint, Prettier, Husky pre-commit hooks
- ✅ **Optimized Metro Configuration** for better performance
- ✅ **Structured Architecture** with feature-based organization
- ✅ **Path Mapping** for clean imports (@/components, @/screens, etc.)
- ✅ **Git Hooks** with lint-staged for code quality

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base design system components
│   ├── forms/          # Form-specific components
│   └── common/         # Shared app components
├── screens/            # Screen components organized by feature
├── navigation/         # Navigation configuration and types
├── store/              # Redux store and API definitions
├── services/           # External service integrations
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── constants/          # App constants and configuration
├── types/              # TypeScript type definitions
├── locales/            # Translation files
└── theme/              # Design system and theming
```

## Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start the development server:**

   ```bash
   npm start
   ```

3. **Run on specific platforms:**
   ```bash
   npm run ios     # iOS simulator
   npm run android # Android emulator
   npm run web     # Web browser
   ```

## Development Scripts

### Development

- `npm start` - Start development server
- `npm run start:dev` - Start with development environment
- `npm run start:staging` - Start with staging environment
- `npm run start:prod` - Start with production environment
- `npm run ios:dev` - Run iOS with development environment
- `npm run android:dev` - Run Android with development environment

### Code Quality

- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors automatically
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run type-check` - Run TypeScript type checking

### Building

- `npm run build:dev:ios` - Build development iOS app
- `npm run build:dev:android` - Build development Android app
- `npm run build:staging:ios` - Build staging iOS app
- `npm run build:staging:android` - Build staging Android app
- `npm run build:prod:ios` - Build production iOS app
- `npm run build:prod:android` - Build production Android app
- `npm run build:prod:all` - Build production for both platforms

### Submission

- `npm run submit:ios` - Submit iOS app to App Store
- `npm run submit:android` - Submit Android app to Google Play

## Configuration

### Quick Start

The template comes with environment-specific configurations:

- **Development**: `.env.development` - For local development
- **Staging**: `.env.staging` - For internal testing
- **Production**: `.env.production` - For production releases

### Customization

For detailed customization instructions, see:

- **[CONFIGURATION_GUIDE.md](./CONFIGURATION_GUIDE.md)** - Complete guide to customizing the template
  - App identity and branding
  - Bundle identifiers
  - App icons and splash screens
  - Environment configuration
  - Theme and colors
  - Deep linking
  - Permissions

### Building and Deployment

For build and deployment instructions, see:

- **[BUILD_GUIDE.md](./BUILD_GUIDE.md)** - Complete guide to building and deploying
  - Environment-specific builds
  - EAS Build configuration
  - App store submission
  - OTA updates
  - Troubleshooting

## Environment Configuration

The template supports three environments out of the box:

1. **Development** - Local development with debug tools
2. **Staging** - Internal testing and QA
3. **Production** - Production releases

Each environment has its own configuration file and can be run independently:

```bash
# Development
npm run start:dev

# Staging
npm run start:staging

# Production
npm run start:prod
```

## Next Steps

This template provides the foundation. Continue with the implementation tasks:

1. Set up core theme system and design tokens ✅
2. Configure NativeWind and base styling system ✅
3. Build core UI component library ✅
4. Set up Redux Toolkit store and state management ✅
5. And more...

See the full implementation plan in `.kiro/specs/expo-react-native-template/tasks.md`

## License

MIT License - feel free to use this template for your projects.
