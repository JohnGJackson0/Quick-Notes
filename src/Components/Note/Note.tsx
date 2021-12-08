import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, Text, AppState } from 'react-native';
import { RootState } from '../../Redux/store';
import { useAppDispatch, useAppSelector } from '../../Hooks/redux';
import { saveNote, updateCurrentNote } from '../../Redux/NoteSlice';
import { HALF_MINUTE_TO_MS } from '../../../constants/Constants';
import { withTheme } from '../../Theme/withTheme';
import { ColorsType } from '../../../constants/Colors';
import { ThemeContext } from '../../Theme/types';
import Screen from '../../Theme/Screen';
import { NavigationProp, ParamListBase } from '@react-navigation/core';

interface Props {
  waitTime?: number;
  themeContext: ThemeContext;
  navigation: NavigationProp<ParamListBase>;
}

const Note = ({ waitTime, themeContext, navigation }: Props) => {
  const colors = themeContext.colors;

  const position = navigation.getState().routes[1].params.position;

  const note = useAppSelector(
    (state: RootState) => state.notes.notes[position]
  );

  const [content, setContent] = useState(note.content);
  const [savedMessage, setSavedMesage] = useState(note.savedMessage);

  const dispatch = useAppDispatch();

  const timeToWait = waitTime || HALF_MINUTE_TO_MS / 60;

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(saveNote({ content: content, uid: note.uid }));
    }, timeToWait);

    return () => clearInterval(interval);
  }, [timeToWait, dispatch, content, note.uid]);

  useEffect(() => {
    setSavedMesage(note.savedMessage);
  }, [note.savedMessage]);

  useEffect(() => {
    dispatch(updateCurrentNote({ uid: note.uid }));
  });

  return (
    <Screen style={styles(colors).screen}>
      <TextInput
        style={[styles(colors).textInput, styles(colors).content]}
        onChangeText={setContent}
        value={content}
        placeholder="Content"
        multiline={true}
        underlineColorAndroid="transparent"
      />
      <Text style={styles(colors).text}>{savedMessage}</Text>
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
