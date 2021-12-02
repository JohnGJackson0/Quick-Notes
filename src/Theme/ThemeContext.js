import * as React from 'react';
import { LIGHT } from '../../constants/Colors';
export const ThemeContext = React.createContext({
  themeContext: {
    colors: LIGHT,
  },
});
