import Navigation from '..';
import { render as reduxRender, waitFor } from '../../../jest/reduxRender';
import React from 'react';
import 'react-native';
import ThemeProvider from '../../Theme/ThemeProvider';

describe('MainStackNavigator', () => {
  it('navigates to the correct screen', async () => {
    const { getByPlaceholderText } = reduxRender(
      <ThemeProvider>
        <Navigation />
      </ThemeProvider>
    );

    await waitFor(() => {
      getByPlaceholderText(/title/i);
      getByPlaceholderText(/content/i);
    });
  });
});
