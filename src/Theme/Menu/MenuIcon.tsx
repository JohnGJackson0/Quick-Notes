import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { withTheme } from '../withTheme';
import { ThemeContext } from '../types';

interface Props {
  themeContext: ThemeContext;
  //note this doesn't type check properly
  iconName: 'arrow-back-ios' | 'more-horiz' | 'more-vert' | 'add-circle';
}

const MenuIcon = ({ themeContext, iconName }: Props) => {
  const colors = themeContext.colors;

  return <MaterialIcons name={iconName} size={25} color={colors.primary} />;
};

export default withTheme(MenuIcon);
