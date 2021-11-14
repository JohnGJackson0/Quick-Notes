import React, { ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App(): ReactElement {
  return (
    <View style={styles.container}>
      <Text>Welcome, </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
