import React from 'react';
import 'react-native';
import { render, fireEvent } from '../../../../jest/reduxRender';
import '@testing-library/jest-dom';
import NoteList from '../NoteList';
import * as redux from 'react-redux';

describe('NoteList', () => {
  it('opens when pressing on the note preview in list format', () => {
    const fakeNavigation = { navigate: jest.fn() };

    const { getByText } = render(<NoteList navigation={fakeNavigation} />, {
      preloadedState: {
        notes: {
          notes: [
            {
              content: 'My content',
              savedMessage: 'Never saved',
              neverOpened: false,
              uid: '2',
            },
          ],
          currentNoteId: '',
        },
        settings: {
          isGallery: false,
        },
      },
    });

    fireEvent.press(
      getByText(/My content/i).parent || getByText(/My content/i)
    );

    expect(fakeNavigation.navigate).toHaveBeenCalledWith('Note', {
      position: 0,
    });
  });

  it('opens when pressing on the note preview in gallery format', () => {
    const fakeNavigation = { navigate: jest.fn() };

    const { getByText } = render(<NoteList navigation={fakeNavigation} />, {
      preloadedState: {
        notes: {
          notes: [
            {
              content: '<b>My content</b>',
              savedMessage: 'Never saved',
              neverOpened: false,
              uid: '2',
            },
          ],
          currentNoteId: '',
        },
        settings: {
          isGallery: true,
        },
      },
    });

    fireEvent.press(getByText(/Never saved/i));

    expect(fakeNavigation.navigate).toHaveBeenCalledWith('Note', {
      position: 0,
    });
  });
});
