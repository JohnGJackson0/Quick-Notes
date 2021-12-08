import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { withTheme } from './withTheme';
import { ColorsType } from '../../constants/Colors';
import { ThemeContext } from './types';

interface Props {
  themeContext: ThemeContext;
  title: string;
}

const OutlinedButton = ({ themeContext, title }: Props) => {
  const colors = themeContext.colors;

  return (
    <View style={styles(colors).defaultStyle}>
      <Text style={styles(colors).label}>{title}</Text>
    </View>
  );
};

const styles = (colors: ColorsType) =>
  StyleSheet.create({
    label: {
      margin: 10,
      color: colors.error,
      alignSelf: 'flex-start',
      fontWeight: 'bold',
    },
    defaultStyle: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: colors.error,
      borderRadius: 5,
      alignSelf: 'flex-start',
    },
  });

export default withTheme(OutlinedButton);
