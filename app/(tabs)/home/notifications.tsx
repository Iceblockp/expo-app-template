import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemedStyles } from '../../../src/hooks';
import { useTheme } from '../../../src/theme';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Welcome to the App',
    message: 'Thanks for using our template. Explore all the features!',
    time: '2 hours ago',
    read: false,
    type: 'info',
  },
  {
    id: '2',
    title: 'Profile Updated',
    message: 'Your profile information has been successfully updated.',
    time: '1 day ago',
    read: true,
    type: 'success',
  },
  {
    id: '3',
    title: 'New Feature Available',
    message: 'Check out the new navigation system with stack navigators.',
    time: '2 days ago',
    read: true,
    type: 'info',
  },
];

export default function NotificationsScreen() {
  const { colors } = useTheme();

  const styles = useThemedStyles(theme => ({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      padding: theme.spacing[4],
    },
    header: {
      marginBottom: theme.spacing[4],
    },
    title: {
      fontSize: theme.typography.fontSize['2xl'],
      fontWeight: theme.typography.fontWeight.bold,
      color: theme.colors.text.primary,
      marginBottom: theme.spacing[2],
    },
    subtitle: {
      fontSize: theme.typography.fontSize.base,
      color: theme.colors.text.secondary,
    },
    notificationCard: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing[4],
      marginBottom: theme.spacing[3],
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
      borderLeftWidth: 4,
    },
    notificationUnread: {
      backgroundColor: theme.colors.primary[50],
    },
    notificationHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: theme.spacing[2],
    },
    notificationIcon: {
      marginRight: theme.spacing[3],
    },
    notificationTitle: {
      fontSize: theme.typography.fontSize.base,
      fontWeight: theme.typography.fontWeight.semibold,
      color: theme.colors.text.primary,
      flex: 1,
    },
    notificationMessage: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.secondary,
      lineHeight: 20,
      marginBottom: theme.spacing[2],
    },
    notificationTime: {
      fontSize: theme.typography.fontSize.xs,
      color: theme.colors.text.tertiary,
    },
    unreadBadge: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: theme.colors.primary[500],
    },
    emptyState: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: theme.spacing[12],
    },
    emptyIcon: {
      marginBottom: theme.spacing[4],
    },
    emptyText: {
      fontSize: theme.typography.fontSize.base,
      color: theme.colors.text.secondary,
      textAlign: 'center',
    },
  }));

  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return colors.success[500];
      case 'warning':
        return colors.warning[500];
      case 'error':
        return colors.error[500];
      default:
        return colors.primary[500];
    }
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return 'checkmark-circle-outline';
      case 'warning':
        return 'warning-outline';
      case 'error':
        return 'alert-circle-outline';
      default:
        return 'information-circle-outline';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Notifications</Text>
          <Text style={styles.subtitle}>
            {mockNotifications.filter(n => !n.read).length} unread notifications
          </Text>
        </View>

        {mockNotifications.length > 0 ? (
          mockNotifications.map(notification => (
            <TouchableOpacity
              key={notification.id}
              style={[
                styles.notificationCard,
                !notification.read && styles.notificationUnread,
                { borderLeftColor: getNotificationColor(notification.type) },
              ]}
            >
              <View style={styles.notificationHeader}>
                <Ionicons
                  name={getNotificationIcon(notification.type)}
                  size={24}
                  color={getNotificationColor(notification.type)}
                  style={styles.notificationIcon}
                />
                <Text style={styles.notificationTitle}>
                  {notification.title}
                </Text>
                {!notification.read && <View style={styles.unreadBadge} />}
              </View>
              <Text style={styles.notificationMessage}>
                {notification.message}
              </Text>
              <Text style={styles.notificationTime}>{notification.time}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Ionicons
              name="notifications-off-outline"
              size={64}
              color={colors.text.tertiary}
              style={styles.emptyIcon}
            />
            <Text style={styles.emptyText}>No notifications yet</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
