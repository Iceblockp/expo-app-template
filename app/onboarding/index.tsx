import { useState, useRef, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  ViewToken,
  Pressable,
} from 'react-native';
import { router } from 'expo-router';
import {
  useThemedStyles,
  useLocalization,
  useOnboarding,
} from '../../src/hooks';
import { Button } from '../../src/components/ui/Button';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface OnboardingStep {
  id: string;
  titleKey: string;
  descriptionKey: string;
  icon?: string;
}

export default function OnboardingScreen() {
  const { t } = useLocalization('onboarding');
  const { completeOnboarding } = useOnboarding();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  // Define onboarding steps - easily customizable
  const onboardingSteps: OnboardingStep[] = [
    {
      id: 'step1',
      titleKey: 'step1.title',
      descriptionKey: 'step1.description',
    },
    {
      id: 'step2',
      titleKey: 'step2.title',
      descriptionKey: 'step2.description',
    },
    {
      id: 'step3',
      titleKey: 'step3.title',
      descriptionKey: 'step3.description',
    },
  ];

  const styles = useThemedStyles(theme => ({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      paddingHorizontal: theme.spacing[4],
      paddingTop: theme.spacing[12],
      paddingBottom: theme.spacing[4],
    },
    skipButton: {
      paddingHorizontal: theme.spacing[4],
      paddingVertical: theme.spacing[2],
    },
    skipButtonText: {
      color: theme.colors.text.tertiary,
      fontSize: theme.typography.fontSize.base,
      fontWeight: theme.typography.fontWeight.medium,
    },
    slideContainer: {
      width: SCREEN_WIDTH,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: theme.spacing[6],
    },
    iconPlaceholder: {
      width: 200,
      height: 200,
      borderRadius: 100,
      backgroundColor: theme.colors.primary[100],
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: theme.spacing[8],
    },
    iconText: {
      fontSize: 80,
      color: theme.colors.primary[500],
    },
    title: {
      fontSize: theme.typography.fontSize['3xl'],
      fontWeight: theme.typography.fontWeight.bold,
      color: theme.colors.text.primary,
      textAlign: 'center',
      marginBottom: theme.spacing[4],
    },
    description: {
      fontSize: theme.typography.fontSize.lg,
      color: theme.colors.text.secondary,
      textAlign: 'center',
      lineHeight: theme.typography.fontSize.lg * 1.5,
      paddingHorizontal: theme.spacing[4],
    },
    footer: {
      paddingHorizontal: theme.spacing[6],
      paddingBottom: theme.spacing[8],
      paddingTop: theme.spacing[4],
    },
    paginationContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: theme.spacing[6],
    },
    paginationDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginHorizontal: theme.spacing[1],
    },
    paginationDotActive: {
      backgroundColor: theme.colors.primary[500],
      width: 24,
    },
    paginationDotInactive: {
      backgroundColor: theme.colors.neutral[300],
    },
    buttonContainer: {
      flexDirection: 'row',
      gap: theme.spacing[3],
    },
    button: {
      flex: 1,
    },
  }));

  const handleCompleteOnboarding = () => {
    completeOnboarding();
    router.replace('/auth/login');
  };

  const handleSkip = () => {
    completeOnboarding();
    router.replace('/auth/login');
  };

  const handleNext = () => {
    if (currentIndex < onboardingSteps.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      handleCompleteOnboarding();
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex - 1,
        animated: true,
      });
    }
  };

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (
        viewableItems.length > 0 &&
        viewableItems[0]?.index !== null &&
        viewableItems[0]?.index !== undefined
      ) {
        setCurrentIndex(viewableItems[0].index);
      }
    },
    []
  );

  const viewabilityConfig = useMemo(
    () => ({
      itemVisiblePercentThreshold: 50,
    }),
    []
  );

  const renderSlide = ({ item }: { item: OnboardingStep }) => (
    <View style={styles.slideContainer}>
      <View style={styles.iconPlaceholder}>
        <Text style={styles.iconText}>✨</Text>
      </View>
      <Text style={styles.title}>{t(item.titleKey)}</Text>
      <Text style={styles.description}>{t(item.descriptionKey)}</Text>
    </View>
  );

  const isLastSlide = currentIndex === onboardingSteps.length - 1;

  return (
    <View style={styles.container}>
      {/* Header with Skip button */}
      <View style={styles.header}>
        <Pressable
          style={styles.skipButton}
          onPress={handleSkip}
          accessibilityRole="button"
          accessibilityLabel={t('skip')}
        >
          <Text style={styles.skipButtonText}>{t('skip')}</Text>
        </Pressable>
      </View>

      {/* Swipeable slides */}
      <FlatList
        ref={flatListRef}
        data={onboardingSteps}
        renderItem={renderSlide}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        bounces={false}
        scrollEventThrottle={16}
      />

      {/* Footer with pagination and navigation buttons */}
      <View style={styles.footer}>
        {/* Pagination dots */}
        <View style={styles.paginationContainer}>
          {onboardingSteps.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                index === currentIndex
                  ? styles.paginationDotActive
                  : styles.paginationDotInactive,
              ]}
            />
          ))}
        </View>

        {/* Navigation buttons */}
        <View style={styles.buttonContainer}>
          {currentIndex > 0 && (
            <Button
              title={t('back')}
              variant="outline"
              onPress={handleBack}
              style={styles.button}
            />
          )}
          <Button
            title={isLastSlide ? t('getStarted') : t('next')}
            variant="primary"
            onPress={handleNext}
            style={styles.button}
          />
        </View>
      </View>
    </View>
  );
}
