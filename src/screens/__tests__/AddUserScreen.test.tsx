import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import AddUserScreen from '../AddUserScreen';

const mockNavigate = jest.fn();
const mockGoBack = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
    goBack: mockGoBack,
  }),
}));

// Mock the store
jest.mock('../../store/useUserStore', () => ({
  __esModule: true,
  default: () => ({
    loading: false,
    error: null,
    setLoading: jest.fn(),
    setError: jest.fn(),
  }),
}));

// Mock the user service
jest.mock('../../services/userService', () => ({
  userService: {
    createUser: jest.fn().mockResolvedValue({ id: '1', name: 'Test User' }),
  },
}));

describe('AddUserScreen', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    mockGoBack.mockClear();
  });

  it('renders form fields correctly', () => {
    const { getByPlaceholderText } = render(<AddUserScreen />);
    expect(getByPlaceholderText('Enter name')).toBeTruthy();
    expect(getByPlaceholderText('Enter email')).toBeTruthy();
    expect(getByPlaceholderText('Enter phone')).toBeTruthy();
  });

  it('handles form submission correctly', async () => {
    const { getByPlaceholderText, getByText } = render(<AddUserScreen />);
    
    fireEvent.changeText(getByPlaceholderText('Enter name'), 'Test User');
    fireEvent.changeText(getByPlaceholderText('Enter email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Enter phone'), '1234567890');
    
    fireEvent.press(getByText('Add User'));
    
    await waitFor(() => {
      expect(mockGoBack).toHaveBeenCalled();
    });
  });

  it('shows validation errors for empty fields', async () => {
    const { getByText } = render(<AddUserScreen />);
    
    fireEvent.press(getByText('Add User'));
    
    await waitFor(() => {
      expect(getByText('Name is required')).toBeTruthy();
      expect(getByText('Email is required')).toBeTruthy();
      expect(getByText('Phone is required')).toBeTruthy();
    });
  });
}); 