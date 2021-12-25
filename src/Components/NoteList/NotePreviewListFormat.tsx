import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import { ColorsType } from '../../../constants/Colors';
import { ThemeContext } from '../../Theme/types';
import { withTheme } from '../../Theme/withTheme';

interface Props {
  info: { data: { title: string; savedMessage: string }; id: string };
  themeContext: ThemeContext;
  onSelect: (id: string) => void;
}

const NotePreviewListFormat = ({ info, themeContext, onSelect }: Props) => {
  const colors = themeContext.colors;
  return (
    <Pressable
      onPress={() => {
        onSelect(info.id);
      }}
    >
      <Text style={styles(colors).mainText}>
        {info.data.title === ''
          ? 'No title'
          : info.data.title.length === 25
          ? info.data.title + '...'
          : info.data.title}
      </Text>
      <Text style={styles(colors).detailText}>{info.data.savedMessage}</Text>
    </Pressable>
  );
};

const styles = (colors: ColorsType) =>
  StyleSheet.create({
    mainText: {
      textAlignVertical: 'top',
      marginTop: 10,
      marginHorizontal: 20,
      marginBottom: 2,
      color: colors.text,
      fontSize: 18,
    },
    detailText: {
      textAlignVertical: 'top',
      marginHorizontal: 20,
      color: colors.textSecondary,
      fontSize: 15,
    },
  });

export default withTheme(NotePreviewListFormat);
