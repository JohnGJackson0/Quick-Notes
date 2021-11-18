import { render as rntlRender } from '@testing-library/react-native';
import React from 'react';
import 'react-native';
import Screen from '../Screen';

describe('screen', () => {
  it('sends back scrollview with scroll prop set to true', () => {
    const { getByTestId } = rntlRender(<Screen scroll={true} />);
    getByTestId('scrollview-screen');
  });
  it('does not send back scrollview with no scroll prop', () => {
    const { getByTestId } = rntlRender(<Screen />);
    getByTestId('view-screen');
  });
});
