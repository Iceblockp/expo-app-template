/**
 * Environment Configuration
 *
 * This module provides environment-specific configuration for the app.
 * It supports development, staging, and production environments.
 */

import Constants from 'expo-constants';

export type Environment = 'development' | 'staging' | 'production';

interface EnvironmentConfig {
  environment: Environment;
  apiBaseUrl: string;
  apiTimeout: number;
  enableDevTools: boolean;
  enableAnalytics: boolean;
  appName: string;
  appVersion: string;
  buildNumber: string;
}

/**
 * Get the current environment based on release channel or __DEV__ flag
 */
const getEnvironment = (): Environment => {
  const releaseChannel = Constants.expoConfig?.extra?.releaseChannel;

  if (releaseChannel === 'production') {
    return 'production';
  }

  if (releaseChannel === 'staging') {
    return 'staging';
  }

  return 'development';
};

/**
 * Environment-specific configurations
 */
const configs: Record<
  Environment,
  Omit<EnvironmentConfig, 'environment' | 'appVersion' | 'buildNumber'>
> = {
  development: {
    apiBaseUrl: 'https://dev-api.example.com',
    apiTimeout: 10000,
    enableDevTools: true,
    enableAnalytics: false,
    appName: 'Template (Dev)',
  },
  staging: {
    apiBaseUrl: 'https://staging-api.example.com',
    apiTimeout: 10000,
    enableDevTools: true,
    enableAnalytics: true,
    appName: 'Template (Staging)',
  },
  production: {
    apiBaseUrl: 'https://api.example.com',
    apiTimeout: 15000,
    enableDevTools: false,
    enableAnalytics: true,
    appName: 'Universal Expo Template',
  },
};

/**
 * Get the configuration for the current environment
 */
const getCurrentConfig = (): EnvironmentConfig => {
  const environment = getEnvironment();
  const config = configs[environment];

  return {
    ...config,
    environment,
    appVersion: Constants.expoConfig?.version || '1.0.0',
    buildNumber:
      Constants.expoConfig?.ios?.buildNumber ||
      Constants.expoConfig?.android?.versionCode?.toString() ||
      '1',
  };
};

export const config = getCurrentConfig();

/**
 * Check if the app is running in development mode
 */
export const isDevelopment = config.environment === 'development';

/**
 * Check if the app is running in staging mode
 */
export const isStaging = config.environment === 'staging';

/**
 * Check if the app is running in production mode
 */
export const isProduction = config.environment === 'production';

/**
 * Export individual config values for convenience
 */
export const {
  environment,
  apiBaseUrl,
  apiTimeout,
  enableDevTools,
  enableAnalytics,
  appName,
  appVersion,
  buildNumber,
} = config;
