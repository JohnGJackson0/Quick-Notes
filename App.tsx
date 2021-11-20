import React, { ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Note from './src/Components/Note';

export default function App(): ReactElement {
  return (
    <SafeAreaProvider>
      <View style={styles.container} testID="app">
        <Note initialTitleContent="" initialNoteContent="" />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
