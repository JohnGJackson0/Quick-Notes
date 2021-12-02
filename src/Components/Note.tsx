import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, Text } from 'react-native';
import Screen from '../Theme/Screen';
import { RootState } from '../Redux/store';
import { useAppDispatch, useAppSelector } from '../Hooks/redux';
import { saveNote } from '../Redux/NoteSlice';
import { HALF_MINUTE_TO_MS } from '../../constants/Constants';
import { withTheme } from '../Theme/withTheme';
import { ColorsType } from '../../constants/Colors';
import { ThemeContext } from '../Theme/types';
interface Props {
  waitTime?: number;
  themeContext: ThemeContext;
}

const Note = ({ waitTime, themeContext }: Props) => {
  const colors = themeContext.colors;

  const note = useAppSelector((state: RootState) => state.notes);

  const dispatch = useAppDispatch();

  const timeToWait = waitTime || HALF_MINUTE_TO_MS / 4;

  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(saveNote({ title: title, content: content }));
    }, timeToWait);

    return () => clearInterval(interval);
  }, [title, content, timeToWait, dispatch]);

  return (
    <Screen style={styles(colors).screen}>
      <TextInput
        style={[styles(colors).textInput, styles(colors).title]}
        onChangeText={setTitle}
        value={title}
        placeholder="Title"
      />
      <TextInput
        style={[styles(colors).textInput, styles(colors).content]}
        onChangeText={setContent}
        value={content}
        placeholder="Content"
        multiline={true}
        underlineColorAndroid="transparent"
      />
      <Text style={styles(colors).text}>
        {note?.savedMessage || 'never saved'}
      </Text>
    </Screen>
  );
};

const styles = (colors: ColorsType) =>
  StyleSheet.create({
    screen: {
      flex: 1,
    },
    title: {
      marginTop: 5,
      marginRight: 5,
      marginLeft: 5,
      marginBottom: 2.5,
    },
    textInput: {
      backgroundColor: colors.surface,
      color: colors.text,
      fontSize: 18,
    },
    content: {
      marginTop: 2.5,
      marginRight: 5,
      marginLeft: 5,
      marginBottom: 0,
      textAlignVertical: 'top',
      flex: 1,
    },
    text: {
      textAlignVertical: 'top',
      margin: 5,
      color: colors.textSecondary,
    },
  });

export default withTheme(Note);
