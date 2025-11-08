import React, { useEffect, useState } from 'react';
import { Animated, ViewStyle } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { Typography } from '@/components/ui/Typography';
import { useTheme } from '@/theme/provider';

export interface NetworkStatusProps {
  /**
   * Custom container style
   */
  style?: ViewStyle;
  /**
   * Whether to show the banner when online
   */
  showWhenOnline?: boolean;
  /**
   * Duration to show the "back online" message (ms)
   */
  onlineDuration?: number;
}

/**
 * Network status banner component
 * Shows a banner when the device is offline or comes back online
 */
export const NetworkStatus: React.FC<NetworkStatusProps> = ({
  style,
  showWhenOnline = false,
  onlineDuration = 3000,
}) => {
  const theme = useTheme();
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [showOnlineBanner, setShowOnlineBanner] = useState(false);
  const [slideAnim] = useState(new Animated.Value(-100));

  useEffect(() => {
    // Subscribe to network state updates
    const unsubscribe = NetInfo.addEventListener(state => {
      const connected = state.isConnected ?? false;

      // If we were offline and now we're online, show the "back online" banner
      if (isConnected === false && connected) {
        setShowOnlineBanner(true);
        setTimeout(() => {
          setShowOnlineBanner(false);
        }, onlineDuration);
      }

      setIsConnected(connected);
    });

    return () => {
      unsubscribe();
    };
  }, [isConnected, onlineDuration]);

  useEffect(() => {
    // Animate banner in/out
    const shouldShow = !isConnected || (showWhenOnline && showOnlineBanner);

    Animated.timing(slideAnim, {
      toValue: shouldShow ? 0 : -100,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isConnected, showOnlineBanner, showWhenOnline, slideAnim]);

  // Don't render anything if we haven't determined connection status yet
  if (isConnected === null) {
    return null;
  }

  const isOffline = !isConnected;
  const backgroundColor = isOffline
    ? theme.colors.error[500]
    : theme.colors.success[500];
  const message = isOffline ? 'No internet connection' : 'Back online';

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          backgroundColor,
          padding: theme.spacing[2],
          paddingTop: theme.spacing[6], // Account for status bar
          zIndex: 9999,
          transform: [{ translateY: slideAnim }],
        },
        style,
      ]}
    >
      <Typography
        variant="caption"
        align="center"
        style={{
          color: '#FFFFFF',
          fontWeight: '600',
        }}
      >
        {message}
      </Typography>
    </Animated.View>
  );
};

/**
 * Hook to check network connectivity
 */
export const useNetworkStatus = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [isInternetReachable, setIsInternetReachable] = useState<
    boolean | null
  >(null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected ?? false);
      setIsInternetReachable(state.isInternetReachable ?? false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return {
    isConnected,
    isInternetReachable,
    isOffline: isConnected === false,
  };
};
