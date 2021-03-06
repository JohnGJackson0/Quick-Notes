import React, { useState, useEffect } from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../../Hooks/redux';
import { RootState } from '../../Redux/store';
import { withTheme } from '../../Theme/withTheme';
import NotePreviewListFormat from './NotePreviewListFormat';
import Screen from '../../Theme/Screen';
import { ThemeContext } from '../../Theme/types';
import { ColorsType } from '../../../constants/Colors';
import Menu from '../../Theme/Menu/Menu';
import { NavigationProp, ParamListBase } from '@react-navigation/core';
import MenuIcon from '../../Theme/Menu/Icon';
import { createNote, updateNeverOpened } from '../../Redux/NoteSlice';
import NotePreviewGalleryFormat from './NotePreviewGalleryFormat';

interface Props {
  themeContext: ThemeContext;
  navigation: NavigationProp<ParamListBase>;
}

const transformNotes = (
  notes: { content: string; savedMessage: string; uid: string }[]
): {
  data: { title: string; savedMessage: string; html: string };
  id: string;
}[] => {
  const result: {
    data: { title: string; savedMessage: string; html: string };
    id: string;
  }[] = [];
  notes?.forEach((item) => {
    const stripedHtml = item.content.replace(/<[^>]+>/g, '');
    result.push({
      data: {
        title: `${stripedHtml.substring(0, 25)}`,
        savedMessage: `${item.savedMessage}`,
        html: item.content,
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
  const settings = useAppSelector((state: RootState) => state.settings);
  const colors = themeContext.colors;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (listenForNewNoteAddedToRedux === true) {
      notes?.forEach((item, index) => {
        if (item.neverOpened === true) {
          setListenForNewNoteAddedToRedux(false);
          /**
           * neverOpened: it allows us to select the new note in the state list
           *              to open it as redux is ready
           */
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
          <MenuIcon iconName="add-circle" /> in the bottom right corner to make
          a note.
        </Text>
      ) : settings.isGallery ? (
        <FlatList
          data={transformNotes(notes)}
          key={'_'}
          numColumns={2}
          renderItem={({
            item,
          }: ListRenderItemInfo<{
            data: { title: string; savedMessage: string; html: string };
            id: string;
          }>) => <NotePreviewGalleryFormat info={item} onSelect={onSelect} />}
          keyExtractor={(item) => item.id}
          ListFooterComponent={<View style={styles(colors).flatListPadding} />}
        />
      ) : (
        <FlatList
          data={transformNotes(notes)}
          key={'*'}
          renderItem={({
            item,
          }: ListRenderItemInfo<{
            data: { title: string; savedMessage: string };
            id: string;
          }>) => <NotePreviewListFormat info={item} onSelect={onSelect} />}
          keyExtractor={(item) => item.id}
          ListFooterComponent={<View style={styles(colors).flatListPadding} />}
        />
      )}
      <View style={styles(colors).menu}>
        <Menu
          centerMenu={
            <Text style={styles(colors).text}>
              Notes {notes?.length || '0'}
            </Text>
          }
          rightMenu={
            <Pressable
              onPress={createNewNote}
              testID="addNewItem"
              style={styles(colors).add}
            >
              <MenuIcon iconName="add-circle" />
            </Pressable>
          }
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
    flatList: {
      flex: 1,
    },
    menu: {
      flex: 1,
      width: '100%',
      justifyContent: 'flex-end',
      alignContent: 'flex-end',
    },
    more: {
      padding: 5,
      marginRight: 20,
      alignSelf: 'flex-end',
    },
    add: {
      padding: 5,
    },
    flatListPadding: {
      paddingBottom: 60,
    },
  });

export default withTheme(NoteList);
