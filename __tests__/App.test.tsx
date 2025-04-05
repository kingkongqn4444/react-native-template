/**
 * @format
 */

import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import App from '../App';

jest.mock('../src/navigation/AppNavigator', () => ({
  AppNavigator: () => null,
}));

describe('App Component', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(
      <SafeAreaProvider>
        <NavigationContainer>
          <App />
        </NavigationContainer>
      </SafeAreaProvider>
    );
    expect(getByTestId('app-root')).toBeTruthy();
  });
});
