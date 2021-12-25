import React from 'react';
import 'react-native';
import { render } from '../../../../jest/reduxRender';
import '@testing-library/jest-dom';
import NoteListSettings from '../NoteListSettings/NoteListSettings';

describe('NoteListSettings', () => {
  it('renders', () => {
    render(<NoteListSettings />);
  });

  it('displays settings and themes', () => {
    const { getByTestId } = render(<NoteListSettings />);

    getByTestId('NoteListSettings');
    getByTestId('light');
    getByTestId('dark');
  });
});
