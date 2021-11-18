import { render as rntlRender } from '@testing-library/react-native';
import React from 'react';
import 'react-native';

import App from '../App';

describe('app', () => {
  it('has no error loading component', () => {
    rntlRender(<App />);
  });
});
