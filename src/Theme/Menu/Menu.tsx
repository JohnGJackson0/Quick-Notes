import React from 'react';
import { View, StyleSheet } from 'react-native';
import { withTheme } from '../withTheme';
import { ColorsType } from '../../../constants/Colors';
import { ThemeContext } from '../types';
import { MENU_HEIGHT } from '../../../constants/Constants';

interface Props {
  themeContext: ThemeContext;
  leftMenu: React.ReactNode;
  centerMenu: React.ReactNode;
  rightMenu: React.ReactNode;
}

const Menu: React.FC<Props> = ({
  themeContext,
  leftMenu,
  rightMenu,
  centerMenu,
}) => {
  const colors = themeContext.colors;

  return (
    <View style={styles(colors).container}>
      <View>{leftMenu}</View>
      <View>{centerMenu}</View>
      <View>{rightMenu}</View>
    </View>
  );
};

const styles = (colors: ColorsType) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
      height: MENU_HEIGHT,
      alignItems: 'flex-end',
      padding: 10,
    },
    contentModalContainer: {
      backgroundColor: colors.background,
    },
    iconContainer: {
      margin: 10,
      paddingRight: 40,
      width: 'auto',
      alignSelf: 'flex-end',
    },
    modal: {
      backgroundColor: colors.background,
    },
    modalHandle: {
      backgroundColor: colors.primary,
    },
  });

export default withTheme(Menu);
