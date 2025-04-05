import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import UserListScreen from '../UserListScreen';

// Mock the store
jest.mock('../../store/useUserStore', () => ({
  __esModule: true,
  default: () => ({
    users: [
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '1234567890',
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '0987654321',
      },
    ],
    loading: false,
    error: null,
    setUsers: jest.fn(),
    setLoading: jest.fn(),
    setError: jest.fn(),
    deleteAllUsers: jest.fn(),
  }),
}));

const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

describe('UserListScreen', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders user list correctly', () => {
    const { getByText } = render(<UserListScreen />);
    expect(getByText('John Doe')).toBeTruthy();
    expect(getByText('jane@example.com')).toBeTruthy();
  });

  it('navigates to add user screen when add button is pressed', () => {
    const { getByText } = render(<UserListScreen />);
    fireEvent.press(getByText('Add User'));
    expect(mockNavigate).toHaveBeenCalledWith('AddUser');
  });

  it('navigates to edit user screen when edit button is pressed', () => {
    const { getAllByText } = render(<UserListScreen />);
    fireEvent.press(getAllByText('Edit')[0]);
    expect(mockNavigate).toHaveBeenCalledWith('EditUser', { userId: '1' });
  });
}); 