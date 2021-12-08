import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './src/Navigation';
import { Provider } from 'react-redux';
import { store } from './src/Redux/store';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import ThemeProvider from './src/Theme/ThemeProvider';
import { Host } from 'react-native-portalize';

export const persistor = persistStore(store);

export default function App() {
  return (
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <SafeAreaProvider>
          <ThemeProvider>
            <Host>
              <View style={styles.container} testID="app">
                <Navigation />
              </View>
            </Host>
          </ThemeProvider>
        </SafeAreaProvider>
      </Provider>
    </PersistGate>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
