import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Note from '../Components/Note';
import { StyleSheet } from 'react-native';
import { getThemeColor } from '../Theme/getTheme';
import { MainStackNavigatorParamList } from './Types';

const Stack = createNativeStackNavigator<MainStackNavigatorParamList>();

export const MainStackNavigator = () => (
  <Stack.Navigator initialRouteName="Note">
    <Stack.Screen
      name="Note"
      component={Note}
      initialParams={{ initialNoteContent: '', initialTitleContent: '' }}
      options={{
        headerTitle: 'Edit Note',
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
        headerTintColor: getThemeColor('text'),
      }}
    />
  </Stack.Navigator>
);

const styles = StyleSheet.create({
  header: {
    backgroundColor: getThemeColor('background'),
  },
  headerTitle: {
    color: getThemeColor('text'),
  },
});
