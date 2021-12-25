import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { useAppDispatch } from '../../../Hooks/redux';
import { navigate } from '../../../Navigation/RootNavigation';
import { deleteCurrentNote } from '../../../Redux/NoteSlice';
import OutlinedButton from '../../../Theme/OutlinedButton';

const CurrentNoteSettings = () => {
  const dispatch = useAppDispatch();

  return (
    <Pressable
      onPress={() => {
        dispatch(deleteCurrentNote());
        navigate('NoteList');
      }}
      style={styles.container}
      testID="DeleteNote"
    >
      <OutlinedButton title="DELETE NOTE" />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
});

export default CurrentNoteSettings;
