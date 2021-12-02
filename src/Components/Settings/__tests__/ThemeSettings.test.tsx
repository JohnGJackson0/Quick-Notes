import React from 'react';
import 'react-native';
import { fireEvent } from '../../../../jest/reduxRender';
import ThemeSettings from '../ThemeSettings';
import { themeRender } from '../../../../jest/themeRender';
import { DARK, LIGHT } from '../../../../constants/Colors';

describe('ThemeSettings', () => {
  it('renders correctly', () => {
    themeRender(<ThemeSettings />);
  });

  it('changes the theme when pressing on dark', () => {
    const { getByTestId, getByText } = themeRender(<ThemeSettings />);

    fireEvent.press(getByTestId('dark'));
    expect(getByText(/Themes/i)).toHaveStyle({ color: DARK.text });
  });
  it('changes the theme when pressing on light', () => {
    const { getByTestId, getByText } = themeRender(<ThemeSettings />);

    fireEvent.press(getByTestId('light'));
    expect(getByText(/Themes/i)).toHaveStyle({ color: LIGHT.text });
  });
});
