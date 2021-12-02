import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Note from '../Components/Note';
import { MainStackNavigatorParamList } from './Types';
import NoteHeader from '../Components/NoteHeader';

const Stack = createNativeStackNavigator<MainStackNavigatorParamList>();

export const MainStackNavigator = () => (
  <Stack.Navigator initialRouteName="Note">
    <Stack.Screen
      name="Note"
      component={Note}
      options={{
        headerTitle: 'Edit Note',
        header: () => <NoteHeader />,
      }}
    />
  </Stack.Navigator>
);
