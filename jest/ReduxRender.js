import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import notesReducer from '../src/Components/Note';
import { Provider } from 'react-redux';
import { render as rntlRender } from '@testing-library/react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

function render(
  ui,
  {
    preloadedState,
    store = configureStore({
      reducer: { notes: notesReducer },
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rntlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from '@testing-library/react-native';

export { render };
