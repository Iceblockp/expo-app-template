# Authentication System

This template includes a complete authentication system with secure token management, form validation, and API integration.

## Features

- ✅ Login with email and password
- ✅ User registration with validation
- ✅ Forgot password flow
- ✅ Secure token storage using AsyncStorage
- ✅ Automatic token refresh on 401 errors
- ✅ Form validation with user-friendly error messages
- ✅ Loading states and error handling
- ✅ Redux state management integration
- ✅ RTK Query API integration

## Usage

### Using the useAuth Hook

The `useAuth` hook provides all authentication functionality:

```typescript
import { useAuth } from '@/hooks';

function MyComponent() {
  const { login, register, logout, forgotPassword, isAuthenticated, user, loading, error } = useAuth();

  // Login
  const handleLogin = async () => {
    const result = await login({ email: 'user@example.com', password: 'password123' });
    if (result.success) {
      // User is logged in and redirected to main app
    }
  };

  // Register
  const handleRegister = async () => {
    const result = await register({
      email: 'user@example.com',
      password: 'password123',
      firstName: 'John',
      lastName: 'Doe'
    });
  };

  // Logout
  const handleLogout = async () => {
    await logout();
    // User is logged out and redirected to login
  };

  // Forgot Password
  const handleForgotPassword = async () => {
    const result = await forgotPassword({ email: 'user@example.com' });
    if (result.success) {
      // Reset email sent
    }
  };

  return (
    <View>
      {isAuthenticated ? (
        <Text>Welcome {user?.firstName}!</Text>
      ) : (
        <Text>Please log in</Text>
      )}
    </View>
  );
}
```

### Secure Storage

The authentication system uses secure storage for tokens:

```typescript
import { secureStorage } from '@/services/storage';

// Store tokens
await secureStorage.setAccessToken(token);
await secureStorage.setRefreshToken(refreshToken);

// Retrieve tokens
const accessToken = await secureStorage.getAccessToken();
const refreshToken = await secureStorage.getRefreshToken();

// Clear all auth data
await secureStorage.clearAuthData();

// Check authentication status
const isAuth = await secureStorage.isAuthenticated();
```

### Form Validation

Use the validation utilities for form inputs:

```typescript
import {
  validateEmail,
  validatePassword,
  validateName,
} from '@/utils/validation';

const emailValidation = validateEmail('user@example.com');
if (!emailValidation.isValid) {
  console.log(emailValidation.error); // Display error message
}

const passwordValidation = validatePassword('mypassword');
if (!passwordValidation.isValid) {
  console.log(passwordValidation.error);
}
```

### API Integration

The authentication API is integrated with RTK Query:

```typescript
import { useLoginMutation, useRegisterMutation } from '@/store/api/authApi';

function LoginForm() {
  const [login, { isLoading, error }] = useLoginMutation();

  const handleSubmit = async () => {
    try {
      const result = await login({ email, password }).unwrap();
      // Handle success
    } catch (err) {
      // Handle error
    }
  };
}
```

## Authentication Flow

1. **Login**: User enters credentials → Validated → API call → Tokens stored → Redux updated → Navigate to main app
2. **Register**: User enters details → Validated → API call → Tokens stored → Redux updated → Navigate to main app
3. **Logout**: Clear tokens → Clear Redux state → Navigate to login
4. **Forgot Password**: User enters email → Validated → API call → Success message displayed

## Token Refresh

The system automatically handles token refresh:

- When an API call returns 401 Unauthorized
- The refresh token is used to get a new access token
- The original request is retried with the new token
- If refresh fails, user is logged out

## Customization

### API Endpoints

Update the API base URL in `.env`:

```
EXPO_PUBLIC_API_URL=https://your-api.com
```

### Validation Rules

Modify validation rules in `src/utils/validation.ts`:

```typescript
export const validatePassword = (password: string): ValidationResult => {
  // Add your custom validation logic
  if (password.length < 12) {
    return { isValid: false, error: 'Password must be at least 12 characters' };
  }
  return { isValid: true };
};
```

### Auth State

Extend the auth state in `src/store/slices/authSlice.ts`:

```typescript
export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
  // Add custom fields
  lastLoginTime?: string;
  sessionExpiry?: string;
}
```

## Security Best Practices

1. **Token Storage**: Tokens are stored in AsyncStorage (consider using expo-secure-store for production)
2. **HTTPS Only**: Always use HTTPS for API calls in production
3. **Token Expiry**: Implement proper token expiry and refresh logic
4. **Input Validation**: All inputs are validated on client and should be validated on server
5. **Error Handling**: Sensitive error details are not exposed to users

## Testing

The authentication screens include:

- Form validation
- Loading states
- Error handling
- Success feedback
- Keyboard handling
- Accessibility support

Test the flows manually or add automated tests using React Native Testing Library.
