import React, { useState } from 'react';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import { OptimizedImage, Button, Card } from '../ui';
import {
  ImagePriority,
  useOptimizedList,
  useMemoizedListItem,
  useDebounce,
  useRenderTime,
  performanceMonitor,
} from '../../utils';

/**
 * Example component demonstrating performance optimizations
 */
export function PerformanceExample() {
  useRenderTime('PerformanceExample');

  const [searchTerm] = useState('');
  const [items, setItems] = useState(generateMockData(50));

  // Debounce search to avoid excessive filtering
  const debouncedSearch = useDebounce(searchTerm, 300);

  // Filter items based on debounced search
  const filteredItems = React.useMemo(() => {
    if (!debouncedSearch) return items;
    return items.filter(item =>
      item.title.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [items, debouncedSearch]);

  // Optimize list rendering
  const listProps = useOptimizedList(filteredItems, 100);

  // Memoize render item to prevent unnecessary re-renders
  const renderItem = useMemoizedListItem(
    (item: MockItem) => <ListItemComponent item={item} />,
    []
  );

  const handleLoadMore = async () => {
    await performanceMonitor.measure('loadMoreItems', async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newItems = generateMockData(20);
      setItems(prev => [...prev, ...newItems]);
    });
  };

  return (
    <View className="flex-1 bg-background">
      <View className="p-4">
        <Text className="text-2xl font-bold text-text-primary mb-4">
          Performance Optimizations Demo
        </Text>

        {/* Optimized Image Example */}
        <Card className="mb-4">
          <Text className="text-lg font-semibold mb-2">Optimized Image</Text>
          <OptimizedImage
            source={{
              uri: 'https://picsum.photos/400/300',
            }}
            priority={ImagePriority.HIGH}
            showLoadingIndicator={true}
            style={{ width: '100%', height: 200, borderRadius: 8 }}
          />
        </Card>

        {/* Load More Button */}
        <Button
          title="Load More Items"
          onPress={handleLoadMore}
          className="mb-4"
        />
      </View>

      {/* Optimized List */}
      <FlatList
        data={filteredItems}
        renderItem={renderItem}
        {...listProps}
        ListEmptyComponent={
          <View className="p-4 items-center">
            <Text className="text-text-secondary">No items found</Text>
          </View>
        }
      />
    </View>
  );
}

/**
 * Memoized list item component
 */
const ListItemComponent = React.memo(({ item }: { item: MockItem }) => {
  return (
    <TouchableOpacity>
      <Card className="m-2">
        <View className="flex-row items-center">
          <OptimizedImage
            source={{ uri: item.image }}
            priority={ImagePriority.NORMAL}
            style={{ width: 60, height: 60, borderRadius: 8 }}
          />
          <View className="ml-3 flex-1">
            <Text className="text-base font-semibold text-text-primary">
              {item.title}
            </Text>
            <Text className="text-sm text-text-secondary">
              {item.description}
            </Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
});

ListItemComponent.displayName = 'ListItemComponent';

// Mock data types and generator
interface MockItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

function generateMockData(count: number): MockItem[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `item-${Date.now()}-${i}`,
    title: `Item ${i + 1}`,
    description: `Description for item ${i + 1}`,
    image: `https://picsum.photos/200/200?random=${i}`,
  }));
}
