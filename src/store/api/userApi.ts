import { baseApi } from './baseApi';

// User API types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  preferences: UserPreferences;
  createdAt: string;
  updatedAt: string;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  notifications: NotificationSettings;
}

export interface NotificationSettings {
  push: boolean;
  email: boolean;
  sms: boolean;
  marketing: boolean;
}

export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  avatar?: string;
}

export interface UpdatePreferencesRequest {
  theme?: 'light' | 'dark' | 'system';
  language?: string;
  notifications?: Partial<NotificationSettings>;
}

// User API endpoints
export const userApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    // Get user profile
    getUserProfile: builder.query<User, string>({
      query: userId => `/users/${userId}`,
      providesTags: (_result, _error, userId) => [{ type: 'User', id: userId }],
    }),

    // Update user profile
    updateUserProfile: builder.mutation<
      User,
      { userId: string; data: UpdateUserRequest }
    >({
      query: ({ userId, data }) => ({
        url: `/users/${userId}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (_result, _error, { userId }) => [
        { type: 'User', id: userId },
        'Profile',
      ],
    }),

    // Update user preferences
    updateUserPreferences: builder.mutation<
      UserPreferences,
      { userId: string; data: UpdatePreferencesRequest }
    >({
      query: ({ userId, data }) => ({
        url: `/users/${userId}/preferences`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (_result, _error, { userId }) => [
        { type: 'User', id: userId },
        'Settings',
      ],
    }),

    // Upload user avatar
    uploadAvatar: builder.mutation<
      { avatarUrl: string },
      { userId: string; file: File | Blob }
    >({
      query: ({ userId, file }) => {
        const formData = new FormData();
        formData.append('avatar', file);
        return {
          url: `/users/${userId}/avatar`,
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: (_result, _error, { userId }) => [
        { type: 'User', id: userId },
        'Profile',
      ],
    }),

    // Delete user account
    deleteUserAccount: builder.mutation<void, string>({
      query: userId => ({
        url: `/users/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User', 'Auth', 'Profile'],
    }),

    // Get user notifications
    getUserNotifications: builder.query<
      any[],
      { userId: string; page?: number; limit?: number }
    >({
      query: ({ userId, page = 1, limit = 20 }) => ({
        url: `/users/${userId}/notifications`,
        params: { page, limit },
      }),
      providesTags: (_result, _error, { userId }) => [
        { type: 'User', id: `${userId}-notifications` },
      ],
    }),

    // Mark notification as read
    markNotificationRead: builder.mutation<
      void,
      { userId: string; notificationId: string }
    >({
      query: ({ userId, notificationId }) => ({
        url: `/users/${userId}/notifications/${notificationId}/read`,
        method: 'PATCH',
      }),
      invalidatesTags: (_result, _error, { userId }) => [
        { type: 'User', id: `${userId}-notifications` },
      ],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useUpdateUserPreferencesMutation,
  useUploadAvatarMutation,
  useDeleteUserAccountMutation,
  useGetUserNotificationsQuery,
  useMarkNotificationReadMutation,
} = userApi;
