import Navigation from '..';
import { render as reduxRender, waitFor } from '../../../jest/ReduxRender';
import React from 'react';
import 'react-native';

describe('MainStackNavigator', () => {
  it('navigates to the correct screen', async () => {
    const { getByPlaceholderText } = reduxRender(<Navigation />);

    await waitFor(() => {
      getByPlaceholderText('title');
      getByPlaceholderText('content');
    });
  });
});
