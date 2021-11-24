import { NavigationContainer } from '@react-navigation/native';
import { render as reduxRender } from '../../../jest/ReduxRender';
import React from 'react';
import 'react-native';
import { MainStackNavigator } from '../MainStackNavigator';
import { waitFor } from '@testing-library/react-native';

describe('MainStackNavigator', () => {
  it('navigates to the correct screen', async () => {
    const { getByPlaceholderText } = reduxRender(
      <NavigationContainer>
        <MainStackNavigator />
      </NavigationContainer>
    );

    await waitFor(() => {
      getByPlaceholderText('title');
      getByPlaceholderText('content');
    });
  });
});
