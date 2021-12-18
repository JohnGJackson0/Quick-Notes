import * as React from 'react';
import { DARK } from '../../constants/Colors';
export const ThemeContext = React.createContext({
  themeContext: {
    colors: DARK,
    isLight: false,
  },
});
