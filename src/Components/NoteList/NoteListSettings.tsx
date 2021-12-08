import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ColorsType } from '../../../constants/Colors';
import { ThemeContext } from '../../Theme/types';
import { withTheme } from '../../Theme/withTheme';
import ThemeSettings from '../Settings/ThemeSettings';

interface Props {
  themeContext: ThemeContext;
}

const NoteListSettings = ({ themeContext }: Props) => {
  const colors = themeContext.colors;

  return (
    <View style={styles(colors).modalContainer}>
      <Text style={styles(colors).ModalTitle}>Settings</Text>
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
    ModalTitle: {
      color: colors.text,
      fontSize: 20,
      margin: 10,
    },
  });

export default withTheme(NoteListSettings);
