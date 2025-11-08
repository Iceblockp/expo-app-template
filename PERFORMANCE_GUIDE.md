# Performance Optimization Guide

This guide covers the performance optimizations implemented in the Expo React Native Template.

## Overview

The template includes comprehensive performance optimizations across four key areas:

1. **Lazy Loading** - Load components and modules on demand
2. **Image Optimization** - Efficient image loading and caching
3. **Bundle Optimization** - Reduce bundle size and improve load times
4. **Memory Management** - Prevent memory leaks and optimize resource usage

## 1. Lazy Loading

### Component Lazy Loading

Use the `lazyLoad` utility to load components on demand:

```typescript
import { lazyLoad } from './src/utils';

// Lazy load a screen component
const ProfileScreen = lazyLoad(() => import('./screens/ProfileScreen'));

// With custom loading fallback
const SettingsScreen = lazyLoad(
  () => import('./screens/SettingsScreen'),
  <CustomLoader />
);
```

### Preloading Components

Preload components before they're needed to improve perceived performance:

```typescript
import { preloadComponent } from './src/utils';

// Preload on user interaction
const handleNavigateToProfile = () => {
  preloadComponent(() => import('./screens/ProfileScreen'));
  navigation.navigate('Profile');
};
```

### Module Lazy Loading

Load heavy libraries only when needed:

```typescript
import { DynamicImports } from './src/utils';

// Load animation library dynamically
const Animated = await DynamicImports.loadAnimationLibrary();

// Load vector icons dynamically
const Icons = await DynamicImports.loadVectorIcons();
```

## 2. Image Optimization

### Optimized Image Component

Use the `OptimizedImage` component for better performance:

```typescript
import { OptimizedImage, ImagePriority } from './src/components/ui';

<OptimizedImage
  source={{ uri: 'https://example.com/image.jpg' }}
  priority={ImagePriority.HIGH}
  showLoadingIndicator={true}
  fallbackSource={require('./assets/placeholder.png')}
  style={{ width: 200, height: 200 }}
/>
```

### Image Preloading

Preload images for better user experience:

```typescript
import { preloadImages } from './src/utils';

// Preload multiple images
await preloadImages([
  'https://example.com/image1.jpg',
  'https://example.com/image2.jpg',
  require('./assets/local-image.png'),
]);
```

### Image Dimension Optimization

Calculate optimized dimensions for images:

```typescript
import { getOptimizedImageDimensions } from './src/utils';

const { width, height } = getOptimizedImageDimensions(
  originalWidth,
  originalHeight,
  maxWidth,
  maxHeight
);
```

## 3. Bundle Optimization

### Metro Configuration

The template includes optimized Metro bundler configuration:

- **Minification**: Removes console logs and debugger statements in production
- **Caching**: Faster rebuilds with file-based caching
- **Asset Optimization**: Automatic asset hashing for better caching

### Code Splitting

Feature flags control which code is included:

```typescript
import { isFeatureEnabled } from './src/utils';

if (isFeatureEnabled('analytics')) {
  // Load analytics module
}
```

### Bundle Size Monitoring

Monitor bundle sizes with configured limits:

```typescript
import { BundleConfig } from './src/utils';

// Main bundle warning: 5MB
// Chunk size warning: 1MB
```

## 4. Memory Management

### Safe State Updates

Prevent memory leaks from async operations:

```typescript
import { useSafeState } from './src/utils';

const [data, setData] = useSafeState(initialData);

// Safe to use even if component unmounts
fetchData().then(setData);
```

### Async Cleanup

Automatically cleanup async operations:

```typescript
import { useAsyncCleanup } from './src/utils';

const addCleanup = useAsyncCleanup();

useEffect(() => {
  const subscription = api.subscribe();
  addCleanup(() => subscription.unsubscribe());
}, []);
```

### Debouncing and Throttling

Optimize expensive operations:

```typescript
import { useDebounce, useThrottle } from './src/utils';

// Debounce search input
const debouncedSearch = useDebounce(searchTerm, 300);

// Throttle scroll handler
const throttledScroll = useThrottle(handleScroll, 16);
```

### Component Mount Status

Check if component is still mounted:

```typescript
import { useIsMounted } from './src/utils';

const isMounted = useIsMounted();

fetchData().then(data => {
  if (isMounted()) {
    setData(data);
  }
});
```

## 5. List Optimization

### Optimized FlatList

Use the `useOptimizedList` hook for better list performance:

```typescript
import { useOptimizedList } from './src/utils';

const listProps = useOptimizedList(data, itemHeight);

<FlatList
  data={data}
  {...listProps}
  renderItem={renderItem}
/>
```

### Memoized List Items

Prevent unnecessary re-renders:

```typescript
import { useMemoizedListItem } from './src/utils';

const renderItem = useMemoizedListItem(
  (item, index) => <ListItem item={item} />,
  [/* dependencies */]
);
```

### Infinite Scroll

Implement pagination efficiently:

```typescript
import { useInfiniteScroll } from './src/utils';

const { data, loading, handleEndReached } = useInfiniteScroll(
  items,
  loadMoreItems,
  hasMore
);

<FlatList
  data={data}
  onEndReached={handleEndReached}
  onEndReachedThreshold={0.5}
/>
```

## 6. Performance Monitoring

### Performance Tracking

Monitor performance in development:

```typescript
import { performanceMonitor, measureAsync } from './src/utils';

// Measure async operations
const data = await measureAsync('fetchUserData', () => fetchUser());

// Measure sync operations
const result = measureSync('processData', () => processData());
```

### Render Time Monitoring

Track component render performance:

```typescript
import { useRenderTime } from './src/utils';

function MyComponent() {
  useRenderTime('MyComponent');
  // Component implementation
}
```

### Performance Metrics

Access performance metrics:

```typescript
import { performanceMonitor } from './src/utils';

// Get all metrics
const metrics = performanceMonitor.getMetrics();

// Clear metrics
performanceMonitor.clear();
```

## Configuration

### Performance Constants

Customize performance settings in `src/constants/performance.ts`:

```typescript
export const PerformanceConfig = {
  images: {
    maxCacheSize: 50, // MB
    cacheExpiration: 7, // days
    compressionQuality: 0.8,
  },
  lists: {
    initialNumToRender: 10,
    maxToRenderPerBatch: 10,
  },
  animations: {
    useNativeDriver: true,
    defaultDuration: 300,
  },
  // ... more settings
};
```

## Best Practices

### 1. Component Optimization

- Use `React.memo()` for expensive components
- Implement `shouldComponentUpdate` or use `PureComponent`
- Avoid inline functions in render methods
- Use `useCallback` and `useMemo` appropriately

### 2. Image Optimization

- Use appropriate image formats (WebP when possible)
- Resize images to display dimensions
- Implement progressive loading for large images
- Use placeholder images while loading

### 3. List Optimization

- Always provide a `keyExtractor` function
- Implement `getItemLayout` for fixed-height items
- Use `removeClippedSubviews` for long lists
- Avoid complex calculations in `renderItem`

### 4. Memory Management

- Clean up subscriptions and listeners
- Avoid memory leaks from closures
- Use weak references when appropriate
- Monitor memory usage in development

### 5. Bundle Optimization

- Lazy load non-critical features
- Use dynamic imports for heavy libraries
- Remove unused dependencies
- Optimize asset sizes

## Troubleshooting

### High Memory Usage

1. Check for memory leaks using React DevTools
2. Review component cleanup in `useEffect`
3. Reduce image cache size
4. Implement list virtualization

### Slow Rendering

1. Use Performance Monitor to identify bottlenecks
2. Memoize expensive computations
3. Reduce component re-renders
4. Optimize list rendering

### Large Bundle Size

1. Analyze bundle with Metro bundler
2. Remove unused dependencies
3. Implement code splitting
4. Optimize asset sizes

## Performance Checklist

- [ ] Lazy load non-critical screens
- [ ] Optimize images with compression and caching
- [ ] Implement list virtualization for long lists
- [ ] Clean up async operations on unmount
- [ ] Use memoization for expensive computations
- [ ] Monitor performance in development
- [ ] Test on low-end devices
- [ ] Profile memory usage
- [ ] Optimize bundle size
- [ ] Enable production optimizations

## Resources

- [React Native Performance](https://reactnative.dev/docs/performance)
- [Expo Performance](https://docs.expo.dev/guides/performance/)
- [Metro Bundler](https://facebook.github.io/metro/)
- [React Optimization](https://react.dev/learn/render-and-commit)
