import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import EditUserScreen from '../EditUserScreen';

const mockNavigate = jest.fn();
const mockGoBack = jest.fn();
const mockRoute = {
  params: {
    userId: '1',
  },
};

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
    goBack: mockGoBack,
  }),
  useRoute: () => mockRoute,
}));

// Mock the store
jest.mock('../../store/useUserStore', () => ({
  __esModule: true,
  default: () => ({
    users: [
      {
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
        phone: '1234567890',
      },
    ],
    loading: false,
    error: null,
    setLoading: jest.fn(),
    setError: jest.fn(),
  }),
}));

// Mock the user service
jest.mock('../../services/userService', () => ({
  userService: {
    updateUser: jest.fn().mockResolvedValue({ id: '1', name: 'Updated User' }),
    getUser: jest.fn().mockResolvedValue({
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
      phone: '1234567890',
    }),
  },
}));

describe('EditUserScreen', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    mockGoBack.mockClear();
  });

  it('renders form fields with user data', async () => {
    const { getByDisplayValue } = render(<EditUserScreen />);
    
    await waitFor(() => {
      expect(getByDisplayValue('Test User')).toBeTruthy();
      expect(getByDisplayValue('test@example.com')).toBeTruthy();
      expect(getByDisplayValue('1234567890')).toBeTruthy();
    });
  });

  it('handles form submission correctly', async () => {
    const { getByDisplayValue, getByText } = render(<EditUserScreen />);
    
    await waitFor(() => {
      expect(getByDisplayValue('Test User')).toBeTruthy();
    });

    fireEvent.changeText(getByDisplayValue('Test User'), 'Updated User');
    fireEvent.press(getByText('Update User'));
    
    await waitFor(() => {
      expect(mockGoBack).toHaveBeenCalled();
    });
  });

  it('shows validation errors for empty fields', async () => {
    const { getByDisplayValue, getByText } = render(<EditUserScreen />);
    
    await waitFor(() => {
      expect(getByDisplayValue('Test User')).toBeTruthy();
    });

    fireEvent.changeText(getByDisplayValue('Test User'), '');
    fireEvent.press(getByText('Update User'));
    
    await waitFor(() => {
      expect(getByText('Name is required')).toBeTruthy();
    });
  });
}); 