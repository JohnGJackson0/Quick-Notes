import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ColorsType } from '../../../constants/Colors';
import { ThemeContext } from '../types';
import { withTheme } from '../withTheme';

interface Props {
  themeContext: ThemeContext;
  label: 'Themes' | 'View as Gallery';
  content: React.ReactNode;
  colors: ColorsType;
}

const SettingsItem = ({ themeContext, label, content }: Props) => {
  const colors = themeContext.colors;

  return (
    <View style={styles(colors).container}>
      <Text style={styles(colors).label}>{label}</Text>
      <View>{content}</View>
    </View>
  );
};

const styles = (colors: ColorsType) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      margin: 10,
      flex: 1,
    },
    label: {
      color: colors.text,
      fontSize: 24,
      flex: 1,
    },
  });

export default withTheme(SettingsItem);
