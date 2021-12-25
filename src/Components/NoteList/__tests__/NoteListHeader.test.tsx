import React from 'react';
import 'react-native';
import { render, fireEvent } from '../../../../jest/reduxRender';
import '@testing-library/jest-dom';
import NoteListHeader from '../NoteListHeader';
import { Host } from 'react-native-portalize';

describe('NoteListHeader', () => {
  it('renders', () => {
    render(
      <Host>
        <NoteListHeader />
      </Host>
    );
  });
  it('displays the settings when clicked', () => {
    const { getByTestId } = render(
      <Host>
        <NoteListHeader />
      </Host>
    );

    fireEvent.press(getByTestId('moreIcon'));

    getByTestId('NoteListSettings');
  });
});
