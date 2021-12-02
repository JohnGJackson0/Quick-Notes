import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import noteReducer from '../src/Redux/NoteSlice';
import { Provider } from 'react-redux';
import { render as rntlRender } from '@testing-library/react-native';

function render(
  ui,
  {
    preloadedState,
    store = configureStore({
      reducer: { note: noteReducer },
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
