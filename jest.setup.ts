import '@testing-library/jest-native/extend-expect';

// Mock React Native
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  RN.NativeModules.StatusBarManager = { getHeight: jest.fn() };
  RN.NativeModules.RNGestureHandlerModule = {
    attachGestureHandler: jest.fn(),
    createGestureHandler: jest.fn(),
    dropGestureHandler: jest.fn(),
    updateGestureHandler: jest.fn(),
    State: {},
    Directions: {},
  };
  return RN;
});

// Mock SafeAreaContext
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }) => children,
  SafeAreaView: ({ children }) => children,
  useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
}));

// Mock AppNavigator
jest.mock('./src/navigation/AppNavigator', () => ({
  AppNavigator: () => null,
}));

// Mock React Navigation
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
  }),
  NavigationContainer: ({ children }) => children,
  createNavigationContainerRef: () => ({
    current: null,
  }),
}));

// Mock Native Stack Navigator
jest.mock('@react-navigation/native-stack', () => ({
  createNativeStackNavigator: () => ({
    Navigator: ({ children }) => children,
    Screen: ({ children }) => children,
  }),
}));

// Mock MMKV
jest.mock('react-native-mmkv', () => ({
  MMKV: jest.fn().mockImplementation(() => ({
    set: jest.fn(),
    getString: jest.fn(),
    delete: jest.fn(),
    clearAll: jest.fn(),
  })),
}));

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

// Add a small delay to allow async operations to complete
const originalSetTimeout = global.setTimeout;
global.setTimeout = (callback: () => void, delay: number) => {
  return originalSetTimeout(callback, delay || 0);
}; 