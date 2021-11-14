import { render as rntlRender } from '@testing-library/react-native';
import React from 'react';
import 'react-native';

import App from '../App';

describe('app', () => {
  it('displays a welcome message', () => {
    const { getByText } = rntlRender(<App />);
    getByText(/welcome/i);
  });
});
