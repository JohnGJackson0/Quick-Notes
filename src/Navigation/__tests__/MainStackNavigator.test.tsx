import { NavigationContainer } from '@react-navigation/native';
import { render as rntlRender, waitFor } from '@testing-library/react-native';
import React from 'react';
import 'react-native';
import { MainStackNavigator } from '../MainStackNavigator';

describe('MainStackNavigator', () => {
  it('navigates to the correct screen', async () => {
    const { getByPlaceholderText } = rntlRender(
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
