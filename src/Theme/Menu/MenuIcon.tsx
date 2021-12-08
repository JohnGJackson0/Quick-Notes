import React from 'react';
import { StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { withTheme } from '../withTheme';
import { ThemeContext } from '../types';

interface Props {
  themeContext: ThemeContext;
  //note this doesn't type check properly
  iconName: 'arrow-back-ios' | 'more-horiz' | 'more-vert' | 'add-circle';
  margin?: string;
}

const MenuIcon = ({ themeContext, iconName, margin }: Props) => {
  const colors = themeContext.colors;

  return (
    <MaterialIcons
      style={styles(margin).back}
      name={iconName}
      size={25}
      color={colors.primary}
    />
  );
};

const styles = (margin: string | undefined) =>
  StyleSheet.create({
    back: {
      margin: margin || 20,
    },
  });

export default withTheme(MenuIcon);
