import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ColorsType } from '../../../constants/Colors';
import { ThemeContext } from '../types';
import { withTheme } from '../withTheme';

interface Props {
  icon: React.ReactNode;
  label: string;
  themeContext: ThemeContext;
}

const IconWithLabel = ({ icon, themeContext, label }: Props) => {
  const colors = themeContext.colors;
  return (
    <View style={styles(colors).container}>
      {icon}
      <Text style={styles(colors).backLabel}>{label}</Text>
    </View>
  );
};

const styles = (colors: ColorsType) =>
  StyleSheet.create({
    container: {
      alignSelf: 'flex-start',
      flexDirection: 'row',
      alignItems: 'center',
      paddingRight: 5,
    },
    backLabel: {
      fontSize: 18,
      color: colors.primary,
    },
  });

export default withTheme(IconWithLabel);
