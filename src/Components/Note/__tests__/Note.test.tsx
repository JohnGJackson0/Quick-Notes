import React from 'react';
import 'react-native';
import Note from '../Note';
import { render, waitFor } from '../../../../jest/reduxRender';
import '@testing-library/jest-dom';

const fakeparams = (position: number) => {
  return {
    params: {
      position: position,
    },
  };
};

describe('note', () => {
  it('properly loads the content and saved message', async () => {
    const { getByText } = render(<Note route={fakeparams(0)} />, {
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
          currentNoteId: 2,
        },
      },
    });

    await waitFor(() => {
      getByText('Never saved');
    });
  });

  //rich content editor uses webview features not able to test in jest, using cypress
});
