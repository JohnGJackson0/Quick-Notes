import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './src/Navigation';
import { Provider } from 'react-redux';
import { store } from './src/Redux/store';
import persistStore from 'redux-persist/es/persistStore';
import { PersistGate } from 'redux-persist/integration/react';

export const persistor = persistStore(store);

export default function App() {
  return (
    <SafeAreaProvider>
      <PersistGate persistor={persistor}>
        <Provider store={store}>
          <View style={styles.container} testID="app">
            <Navigation />
          </View>
        </Provider>
      </PersistGate>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
