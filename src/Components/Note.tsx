import React, { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { getThemeColor } from '../Theme/getTheme';
import { Screen } from '../Theme/Screen';

interface Props {
  initialTitleContent: string;
  initialNoteContent: string;
}

const Note = ({
  initialTitleContent,
  initialNoteContent,
}: Props): React.ReactElement => {
  const [title, setTitle] = useState(initialTitleContent);
  const [note, setNote] = useState(initialNoteContent);

  return (
    <Screen style={styles.screen}>
      <TextInput
        style={styles.textInput}
        onChangeText={setTitle}
        value={title}
        placeholder="title"
      />
      <TextInput
        style={[styles.textInput, styles.content]}
        onChangeText={setNote}
        value={note}
        placeholder="content"
        multiline={true}
        underlineColorAndroid="transparent"
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  textInput: {
    margin: 5,
    backgroundColor: getThemeColor('textBackground'),
    color: getThemeColor('text'),
  },
  content: {
    textAlignVertical: 'top',
    flex: 1,
  },
});

export default Note;
