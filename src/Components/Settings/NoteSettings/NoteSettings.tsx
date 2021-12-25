import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ColorsType } from '../../../../constants/Colors';
import { ThemeContext } from '../../../Theme/types';
import { withTheme } from '../../../Theme/withTheme';
import ThemeSettings from '../ThemeSettings';
import CurrentNoteSettings from './CurrentNoteSettings';

interface Props {
  themeContext: ThemeContext;
}

const NoteSettings = ({ themeContext }: Props) => {
  const colors = themeContext.colors;

  return (
    <View style={styles(colors).modalContainer}>
      <CurrentNoteSettings />
      <ThemeSettings />
    </View>
  );
};

const styles = (colors: ColorsType) =>
  StyleSheet.create({
    modalContainer: {
      backgroundColor: colors.background,
      flex: 1,
    },
  });

export default withTheme(NoteSettings);
