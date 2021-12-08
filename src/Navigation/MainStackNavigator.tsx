import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Note from '../Components/Note/Note';
import { MainStackNavigatorParamList } from './Types';
import NoteHeader from '../Components/Note/NoteHeader';
import NoteList from '../Components/NoteList/NoteList';
import NoteListHeader from '../Components/NoteList/NoteListHeader';

const Stack = createNativeStackNavigator<MainStackNavigatorParamList>();

export const MainStackNavigator = () => (
  <Stack.Navigator initialRouteName="NoteList">
    <Stack.Screen
      name="NoteList"
      component={NoteList}
      options={{
        header: () => <NoteListHeader />,
      }}
    />
    <Stack.Screen
      name="Note"
      component={Note}
      options={{
        //todo change to use header, combine menu with header
        header: (props) => <NoteHeader {...props} />,
      }}
    />
  </Stack.Navigator>
);
