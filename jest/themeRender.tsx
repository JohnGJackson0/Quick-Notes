import { render } from '@testing-library/react-native';
import ThemeProvider from '../src/Theme/ThemeProvider';
import React from 'react';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const themeRender = (ui: any, ...renderOptions: any) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>, renderOptions);
};
