import Navigation from '..';
import { render as rntlRender, waitFor } from '@testing-library/react-native';
import React from 'react';
import 'react-native';

describe('MainStackNavigator', () => {
  it('navigates to the correct screen', async () => {
    const { getByPlaceholderText } = rntlRender(<Navigation />);

    await waitFor(() => {
      getByPlaceholderText('title');
      getByPlaceholderText('content');
    });
  });
});
