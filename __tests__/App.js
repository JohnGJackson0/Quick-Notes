import { render as reduxRender } from '../jest/ReduxRender';
import React from 'react';
import 'react-native';
import App from '../App';

describe('app', () => {
  it('has no error loading component', () => {
    reduxRender(<App />);
  });
});
