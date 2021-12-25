import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ColorsType } from '../../../../constants/Colors';
import { ThemeContext } from '../../../Theme/types';
import { withTheme } from '../../../Theme/withTheme';
import ThemeSettings from '../ThemeSettings';
import GallerySetting from './GallerySetting';

interface Props {
  themeContext: ThemeContext;
}

const NoteListSettings = ({ themeContext }: Props) => {
  const colors = themeContext.colors;

  return (
    <View style={styles(colors).modalContainer} testID="NoteListSettings">
      <GallerySetting />
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

export default withTheme(NoteListSettings);
