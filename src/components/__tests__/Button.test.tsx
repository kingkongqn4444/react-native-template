import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '../Button';

describe('Button Component', () => {
  it('renders correctly with default props', () => {
    const { getByText } = render(<Button title="Test Button" onPress={() => {}} />);
    expect(getByText('Test Button')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<Button title="Test Button" onPress={onPressMock} />);
    
    fireEvent.press(getByText('Test Button'));
    expect(onPressMock).toHaveBeenCalled();
  });

  it('renders correctly with secondary variant', () => {
    const { getByText } = render(
      <Button title="Test Button" onPress={() => {}} variant="secondary" />
    );
    expect(getByText('Test Button')).toBeTruthy();
  });

  it('renders correctly with outline variant', () => {
    const { getByText } = render(
      <Button title="Test Button" onPress={() => {}} variant="outline" />
    );
    expect(getByText('Test Button')).toBeTruthy();
  });

  it('renders correctly when disabled', () => {
    const { getByText } = render(
      <Button title="Test Button" onPress={() => {}} disabled />
    );
    expect(getByText('Test Button')).toBeTruthy();
  });
}); 