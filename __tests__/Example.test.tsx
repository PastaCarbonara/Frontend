import React from 'react';
import { render } from '@testing-library/react-native';
import Profile from '../screens/Profile';

test('renders correctly', () => {
    const { getByText } = render(<Profile />);
    const element = getByText('Profile screen');
    expect(element).toBeDefined();
});