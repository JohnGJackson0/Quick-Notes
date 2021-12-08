import React, { useState, useEffect } from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../../Hooks/redux';
import { RootState } from '../../Redux/store';
import { withTheme } from '../../Theme/withTheme';
import NotePreview from './NotePreview';
import Screen from '../../Theme/Screen';
import { ThemeContext } from '../../Theme/types';
import { ColorsType } from '../../../constants/Colors';
import Menu from '../../Theme/Menu/Menu';
import { NavigationProp, ParamListBase } from '@react-navigation/core';
import MenuIcon from '../../Theme/Menu/MenuIcon';
import { createNote, updateNeverOpened } from '../../Redux/NoteSlice';

interface Props {
  themeContext: ThemeContext;
  navigation: NavigationProp<ParamListBase>;
}

const transformNotes = (
  notes: { content: string; savedMessage: string; uid: string }[]
): {
  data: { title: string; savedMessage: string };
  id: string;
}[] => {
  const result: {
    data: { title: string; savedMessage: string };
    id: string;
  }[] = [];
  notes?.forEach((item) => {
    result.push({
      data: {
        title: `${item.content.substring(0, 25)}`,
        savedMessage: `${item.savedMessage}`,
      },
      id: `${item.uid}`,
    });
  });
  return result;
};

const NoteList = ({ themeContext, navigation }: Props) => {
  const [listenForNewNoteAddedToRedux, setListenForNewNoteAddedToRedux] =
    useState(false);
  const notes = useAppSelector((state: RootState) => state.notes.notes);
  const colors = themeContext.colors;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (listenForNewNoteAddedToRedux === true) {
      notes?.forEach((item, index) => {
        if (item.neverOpened === true) {
          setListenForNewNoteAddedToRedux(false);
          dispatch(updateNeverOpened({ uid: item.uid }));
          navigation.navigate('Note', {
            position: index,
          });
        }
      });
    }
  }, [listenForNewNoteAddedToRedux, notes, dispatch, navigation]);

  const createNewNote = () => {
    setListenForNewNoteAddedToRedux(true);
    dispatch(createNote());
  };

  const onSelect = (uid: string) => {
    notes.forEach((item, index) => {
      if (item.uid === uid) {
        navigation.navigate('Note', {
          position: index,
        });
      }
    });
  };

  return (
    <Screen>
      <Text style={styles(colors).title}>Notes</Text>
      {typeof transformNotes(notes).length === undefined ||
      transformNotes(notes).length === 0 ? (
        <Text style={styles(colors).text}>
          There are no notes.{' \n\n'}Press the{' '}
          <MenuIcon iconName="add-circle" margin="0" /> circle in the bottom
          right corner to make a note.
        </Text>
      ) : (
        <FlatList
          data={transformNotes(notes)}
          renderItem={({
            item,
          }: ListRenderItemInfo<{
            data: { title: string; savedMessage: string };
            id: string;
          }>) => <NotePreview info={item} onSelect={onSelect} />}
          keyExtractor={(item) => item.id}
        />
      )}
      <View style={styles(colors).menu}>
        <Menu
          centerMenu={
            <Text style={styles(colors).text}>Notes {notes?.length || 0}</Text>
          }
          rightActionIcon={<MenuIcon iconName="add-circle" />}
          rightAction={createNewNote}
        />
      </View>
    </Screen>
  );
};

const styles = (colors: ColorsType) =>
  StyleSheet.create({
    text: {
      textAlignVertical: 'top',
      margin: 10,
      marginHorizontal: 15,
      color: colors.text,
    },
    title: {
      textAlignVertical: 'top',
      color: colors.primary,
      fontSize: 35,
      margin: 10,
      marginBottom: 20,
    },
    menu: {
      flex: 1,
      justifyContent: 'flex-end',
      alignContent: 'flex-end',
    },
    more: {
      margin: 10,
      marginRight: 20,
      alignSelf: 'flex-end',
    },
  });

export default withTheme(NoteList);
