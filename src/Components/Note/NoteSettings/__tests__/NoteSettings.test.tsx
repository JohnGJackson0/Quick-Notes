import React from 'react';
import 'react-native';
import { render } from '../../../../../jest/reduxRender';
import '@testing-library/jest-dom';
import { Host } from 'react-native-portalize';
import NoteSettings from '../NoteSettings';

describe('NoteSettings', () => {
  it('renders and displays the note settings and general settings', () => {
    const { getByText, getByTestId } = render(
      <Host>
        <NoteSettings />
      </Host>
    );
    getByText(/Settings/i);
    getByTestId('DeleteNote');
    getByText(/Themes/i);
  });
});
