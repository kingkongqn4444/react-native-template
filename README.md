# User Management App

A React Native application for managing users with offline support using MMKV storage.

## Features

- **User Management**
  - Create new users
  - Edit existing users
  - Delete individual users
  - Delete all users at once
  - View user list with details
  - Search and filter users
  - Form validation for user data

- **Offline Support**
  - Data persistence using MMKV storage
  - Automatic sync with API when online
  - Fallback to local storage when offline
  - Conflict resolution for offline changes
  - Background sync capabilities

- **State Management**
  - Zustand for global state management
  - Efficient state updates
  - Type-safe state handling
  - Middleware support for logging and persistence
  - DevTools integration for debugging

- **UI/UX**
  - Modern and responsive design
  - Loading states and error handling
  - Form validation with error messages
  - Confirmation dialogs for destructive actions
  - Smooth animations and transitions

## Technical Stack

- **Frontend**
  - React Native
  - TypeScript
  - React Navigation
  - React Hook Form
  - MMKV Storage
  - Zustand

- **Development Tools**
  - ESLint
  - Prettier
  - TypeScript
  - Jest
  - React Native Testing Library

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- React Native development environment setup
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)
- Git
- JDK 11 or higher (for Android development)
- CocoaPods (for iOS development)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd UserManagement
```

2. Install dependencies:
```bash
yarn install
# or
npm install
```

3. Install iOS dependencies (macOS only):
```bash
cd ios && pod install && cd ..
```

4. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

## Running the Project

### Development

1. Start the Metro bundler:
```bash
yarn start
# or
npm start
```

2. Run on Android:
```bash
yarn android
# or
npm run android
```

3. Run on iOS (macOS only):
```bash
yarn ios
# or
npm run ios
```

### Testing

1. Run unit tests:
```bash
yarn test
# or
npm test
```

2. Run tests with coverage:
```bash
yarn test:coverage
# or
npm run test:coverage
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── UserForm/       # User form component
│   ├── UserListItem/   # User list item component
│   └── common/         # Common UI components
├── screens/            # Screen components
│   ├── UserList/       # User list screen
│   ├── AddUser/        # Add user screen
│   └── EditUser/       # Edit user screen
├── services/           # API and storage services
│   ├── api.ts         # API service
│   ├── userService.ts # User service
│   └── storageService.ts # MMKV storage service
├── store/              # Zustand store
│   ├── userStore.ts   # User store
│   └── index.ts       # Store exports
├── types/              # TypeScript type definitions
│   ├── user.ts        # User types
│   └── api.ts         # API types
├── navigation/         # Navigation configuration
│   ├── AppNavigator.tsx
│   └── types.ts
├── constants/          # App constants
│   ├── theme.ts       # Theme constants
│   └── config.ts      # App configuration
└── utils/             # Utility functions
    ├── validation.ts  # Form validation
    └── helpers.ts     # Helper functions
```

## API Integration

### API Service Structure

```typescript
// src/services/api.ts
export const apiService = {
  // Base configuration
  baseURL: process.env.API_BASE_URL,
  
  // User endpoints
  getUsers: () => axios.get('/users'),
  createUser: (data) => axios.post('/users', data),
  updateUser: (id, data) => axios.put(`/users/${id}`, data),
  deleteUser: (id) => axios.delete(`/users/${id}`),
  
  // Error handling
  handleError: (error) => {
    // Custom error handling logic
  }
};
```

### API Response Format

```typescript
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}
```

## State Management with Zustand

### Store Structure

```typescript
// src/store/userStore.ts
interface UserState {
  // State
  users: User[];
  loading: boolean;
  error: string | null;
  
  // Actions
  setUsers: (users: User[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Async Actions
  fetchUsers: () => Promise<void>;
  createUser: (userData: UserFormData) => Promise<void>;
  updateUser: (userId: string, userData: UserFormData) => Promise<void>;
  deleteUser: (userId: string) => Promise<void>;
}

export const useUserStore = create<UserState>((set, get) => ({
  // Implementation
}));
```

### Using Middleware

```typescript
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export const useStore = create(
  devtools(
    persist(
      (set) => ({
        // Store implementation
      }),
      {
        name: 'user-storage',
        getStorage: () => storage,
      }
    )
  )
);
```

## Storage Workflow

### MMKV Storage Implementation

```typescript
// src/services/storageService.ts
export const storage = new MMKV({
  id: 'user-storage',
  encryptionKey: 'user-management-key',
});

export const storageService = {
  // Storage operations
  saveUsers: (users: User[]) => {
    storage.set('users', JSON.stringify(users));
  },
  
  getUsers: (): User[] => {
    const usersString = storage.getString('users');
    return usersString ? JSON.parse(usersString) : [];
  },
  
  // Data synchronization
  syncWithAPI: async () => {
    // Implementation
  }
};
```

### Offline-First Strategy

1. **Data Flow**:
   - Write operations are first saved to MMKV
   - Changes are queued for API sync
   - Read operations check MMKV first
   - Background sync when online

2. **Conflict Resolution**:
   - Timestamp-based conflict detection
   - Last-write-wins strategy
   - Manual conflict resolution UI

## Development Guidelines

### Code Style

- Follow TypeScript best practices
- Use functional components with hooks
- Implement proper error handling
- Write meaningful comments
- Follow the project's ESLint rules

### Testing

1. **Unit Tests**:
```typescript
describe('UserStore', () => {
  it('should add a new user', () => {
    // Test implementation
  });
});
```

2. **Component Tests**:
```typescript
describe('UserForm', () => {
  it('should validate form inputs', () => {
    // Test implementation
  });
});
```

### Performance Optimization

- Use React.memo for pure components
- Implement proper key props
- Optimize re-renders
- Use proper list virtualization
- Implement proper image caching

## Building the Project

### Android

1. Generate a release build:
```bash
cd android
./gradlew assembleRelease
```

2. Generate a signed APK:
```bash
./gradlew bundleRelease
```

3. The APK will be available at:
```
android/app/build/outputs/apk/release/app-release.apk
```

### iOS

1. Open the Xcode project:
```bash
cd ios
open UserManagement.xcworkspace
```

2. Configure signing:
   - Select your team
   - Update bundle identifier
   - Configure provisioning profiles

3. Build and archive:
   - Select "Any iOS Device"
   - Product > Archive
   - Distribute App

## Environment Setup

1. Create a `.env` file:
```
API_BASE_URL=your_api_url
ENCRYPTION_KEY=your_encryption_key
ENVIRONMENT=development
```

2. Update configuration:
```typescript
// src/constants/config.ts
export const config = {
  api: {
    baseURL: process.env.API_BASE_URL,
    timeout: 30000,
  },
  storage: {
    encryptionKey: process.env.ENCRYPTION_KEY,
  },
};
```

## Troubleshooting

### Common Issues

1. **iOS Build Issues**
   - Clean build folder
   - Reset pods
   - Update CocoaPods

2. **Android Build Issues**
   - Clean project
   - Invalidate caches
   - Update Gradle

3. **Storage Issues**
   - Clear MMKV storage
   - Check encryption key
   - Verify storage permissions

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Pull Request Guidelines

- Follow the code style
- Add tests for new features
- Update documentation
- Provide clear description
- Reference related issues

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
