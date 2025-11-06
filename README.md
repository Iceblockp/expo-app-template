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

- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors automatically
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run type-check` - Run TypeScript type checking

## Next Steps

This template provides the foundation. Continue with the implementation tasks:

1. Set up core theme system and design tokens
2. Configure NativeWind and base styling system
3. Build core UI component library
4. Set up Redux Toolkit store and state management
5. And more...

See the full implementation plan in `.kiro/specs/expo-react-native-template/tasks.md`

## Environment Configuration

Copy `.env.example` to `.env` and configure your environment variables:

```bash
cp .env.example .env
```

## License

MIT License - feel free to use this template for your projects.
