import React from 'react';
import 'react-native';
import { render } from '../../../../jest/reduxRender';
import '@testing-library/jest-dom';
import NoteListSettings from '../NoteListSettings';

describe('NoteListSettings', () => {
  it('renders', () => {
    render(<NoteListSettings />);
  });

  it('displays settings and themes', () => {
    const { getByText } = render(<NoteListSettings />);

    getByText(/Settings/i);
    getByText(/Themes/i);
  });
});
