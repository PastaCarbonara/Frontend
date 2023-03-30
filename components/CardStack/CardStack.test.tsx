import React from 'react';
import CardStack from '../cardStack';
import MockedNavigator from '../../jest/mocks/mockedNavigator';
import { render } from 'react-native-testing-library';

describe('CardStack', () => {
    it('should render correctly', () => {
        const { toJSON } = render(<MockedNavigator component={CardStack} />);
        expect(toJSON()).toMatchSnapshot();
    });
});
