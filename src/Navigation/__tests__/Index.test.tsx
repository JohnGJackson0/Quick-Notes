import Navigation from '..';
import { render as reduxRender, waitFor } from '../../../jest/reduxRender';
import React from 'react';
import 'react-native';
import ThemeProvider from '../../Theme/ThemeProvider';
import { Host } from 'react-native-portalize';

describe('MainStackNavigator', () => {
  it('navigates to the correct screen', async () => {
    const { getByText } = reduxRender(
      <Host>
        <ThemeProvider>
          <Navigation />
        </ThemeProvider>
      </Host>
    );

    await waitFor(() => {
      getByText(/Notes 0/i);
      getByText(/There are no notes./i);
    });
  });
});
