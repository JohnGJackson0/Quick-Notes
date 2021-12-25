import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { withTheme } from '../withTheme';
import { ThemeContext } from '../types';

interface Props {
  themeContext: ThemeContext;
  //note this doesn't type check properly
  iconName:
    | 'arrow-back-ios'
    | 'more-horiz'
    | 'more-vert'
    | 'add-circle'
    | 'view-module'
    | 'list';
  size?: number;
}

const MenuIcon = ({ themeContext, iconName, size }: Props) => {
  const colors = themeContext.colors;

  return (
    <MaterialIcons
      name={iconName}
      size={size ? size : 24}
      color={colors.primary}
    />
  );
};

export default withTheme(MenuIcon);
