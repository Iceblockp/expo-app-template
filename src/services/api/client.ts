import AsyncStorage from '@react-native-async-storage/async-storage';

// API Configuration
export const API_CONFIG = {
  baseURL: process.env.EXPO_PUBLIC_API_URL || 'https://api.example.com',
  timeout: 10000,
  retryAttempts: 3,
  retryDelay: 1000,
};

// Storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
} as const;

// API Error types
export interface ApiError {
  code: string;
  message: string;
  details?: any;
  timestamp: string;
}

export interface ApiResponse<T = any> {
  data: T;
  success: boolean;
  message?: string;
  errors?: ApiError[];
}

// Request configuration interface
export interface RequestConfig {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  data?: any;
  params?: Record<string, any> | undefined;
  headers?: Record<string, string>;
  requiresAuth?: boolean;
}

// Custom fetch-based API client
class ApiClient {
  private baseURL: string;
  private timeout: number;

  constructor(baseURL: string, timeout: number = 10000) {
    this.baseURL = baseURL;
    this.timeout = timeout;
  }

  private async getAuthToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    } catch (error) {
      // Log error in development only
      if (__DEV__) {
        console.error('Error getting auth token:', error);
      }
      return null;
    }
  }

  private async request<T>(config: RequestConfig): Promise<ApiResponse<T>> {
    const {
      url,
      method = 'GET',
      data,
      params,
      headers = {},
      requiresAuth = true,
    } = config;

    // Build URL with query parameters
    let fullUrl = this.baseURL + url;
    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value));
        }
      });
      const queryString = searchParams.toString();
      if (queryString) {
        fullUrl += (fullUrl.includes('?') ? '&' : '?') + queryString;
      }
    }

    // Prepare headers
    const requestHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      ...headers,
    };

    // Add authentication header if required
    if (requiresAuth) {
      const token = await this.getAuthToken();
      if (token) {
        requestHeaders.Authorization = `Bearer ${token}`;
      }
    }

    // Create timeout promise
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('Request timeout')), this.timeout);
    });

    try {
      const fetchPromise = global.fetch(fullUrl, {
        method,
        headers: requestHeaders,
        body: data ? JSON.stringify(data) : null,
      });

      const response = await Promise.race([fetchPromise, timeoutPromise]);

      // Parse response
      let responseData: any;
      const contentType = response.headers.get('content-type');

      if (contentType && contentType.includes('application/json')) {
        responseData = await response.json();
      } else {
        responseData = await response.text();
      }

      // Handle HTTP errors
      if (!response.ok) {
        const error: ApiError = {
          code: `HTTP_${response.status}`,
          message:
            responseData?.message || response.statusText || 'Request failed',
          details: responseData,
          timestamp: new Date().toISOString(),
        };

        return {
          data: null as T,
          success: false,
          message: error.message,
          errors: [error],
        };
      }

      // Return successful response
      return {
        data: responseData,
        success: true,
        message: responseData?.message,
      };
    } catch (error: any) {
      // Handle network errors
      const apiError: ApiError = {
        code: error.message === 'Request timeout' ? 'TIMEOUT' : 'NETWORK_ERROR',
        message:
          error.message === 'Request timeout'
            ? 'Request timeout'
            : error.message || 'Network error occurred',
        details: error,
        timestamp: new Date().toISOString(),
      };

      return {
        data: null as T,
        success: false,
        message: apiError.message,
        errors: [apiError],
      };
    }
  }

  // HTTP method helpers
  async get<T>(
    url: string,
    params?: Record<string, any>,
    requiresAuth = true
  ): Promise<ApiResponse<T>> {
    return this.request<T>({ url, method: 'GET', params, requiresAuth });
  }

  async post<T>(
    url: string,
    data?: any,
    requiresAuth = true
  ): Promise<ApiResponse<T>> {
    return this.request<T>({ url, method: 'POST', data, requiresAuth });
  }

  async put<T>(
    url: string,
    data?: any,
    requiresAuth = true
  ): Promise<ApiResponse<T>> {
    return this.request<T>({ url, method: 'PUT', data, requiresAuth });
  }

  async patch<T>(
    url: string,
    data?: any,
    requiresAuth = true
  ): Promise<ApiResponse<T>> {
    return this.request<T>({ url, method: 'PATCH', data, requiresAuth });
  }

  async delete<T>(url: string, requiresAuth = true): Promise<ApiResponse<T>> {
    return this.request<T>({ url, method: 'DELETE', requiresAuth });
  }
}

// Create and export the default API client instance
export const apiClient = new ApiClient(API_CONFIG.baseURL, API_CONFIG.timeout);

// Export utility functions for token management
export const tokenUtils = {
  async setAuthToken(token: string): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
    } catch (error) {
      if (__DEV__) {
        console.error('Error setting auth token:', error);
      }
    }
  },

  async getAuthToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    } catch (error) {
      if (__DEV__) {
        console.error('Error getting auth token:', error);
      }
      return null;
    }
  },

  async removeAuthToken(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    } catch (error) {
      if (__DEV__) {
        console.error('Error removing auth token:', error);
      }
    }
  },

  async setRefreshToken(token: string): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, token);
    } catch (error) {
      if (__DEV__) {
        console.error('Error setting refresh token:', error);
      }
    }
  },

  async getRefreshToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
    } catch (error) {
      if (__DEV__) {
        console.error('Error getting refresh token:', error);
      }
      return null;
    }
  },

  async removeRefreshToken(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    } catch (error) {
      if (__DEV__) {
        console.error('Error removing refresh token:', error);
      }
    }
  },

  async clearAllTokens(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.AUTH_TOKEN,
        STORAGE_KEYS.REFRESH_TOKEN,
      ]);
    } catch (error) {
      if (__DEV__) {
        console.error('Error clearing tokens:', error);
      }
    }
  },
};
