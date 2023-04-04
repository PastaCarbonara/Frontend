import React from 'react';
import { render } from '@testing-library/react-native';
import ProfileScreen from '../screens/ProfileScreen';

test('renders correctly', () => {
    const { getByText } = render(<ProfileScreen />);
    const element = getByText('Profile screen');
    expect(element).toBeDefined();
});
