import React from 'react';
import 'react-native';
import Note from '../Note';
import { render, fireEvent, waitFor } from '../../../../jest/reduxRender';
import * as redux from 'react-redux';
import '@testing-library/jest-dom';
import * as reduxHooks from '../../../Hooks/redux';

const fakeparams = (position: number) => {
  return {
    params: {
      position: position,
    },
  };
};

describe('note', () => {
  it('properyly loads the content and saved message', async () => {
    const { getByPlaceholderText, getByText } = render(
      <Note route={fakeparams(0)} />,
      {
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
      }
    );

    await waitFor(() => {
      expect(getByPlaceholderText(/Content/i).props.value).toEqual(
        'My content'
      );
      getByText('Never saved');
    });
  });

  it('updates the current note', async () => {
    const spy = jest.spyOn(reduxHooks, 'useAppSelector');
    spy.mockReturnValueOnce({
      content: 'My content',
      savedMessage: 'Never saved',
      neverOpened: false,
      uid: '2',
    });

    const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValueOnce(mockDispatchFn);

    render(<Note route={fakeparams(0)} />);

    await waitFor(() => {
      expect(mockDispatchFn).toHaveBeenCalledWith({
        payload: { uid: '2' },
        type: 'note/updateCurrentNote',
      });
    });
  });

  it('saves the current note when user edits it', async () => {
    const { getByPlaceholderText, getByText } = render(
      <Note route={fakeparams(0)} />,
      {
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
      }
    );

    getByText('Never saved');

    fireEvent.changeText(getByPlaceholderText(/content/i), 'new content');

    expect(getByPlaceholderText(/Content/i).props.value).toEqual('new content');

    await waitFor(() => {
      getByText(/Edited on/i);
    });
  });

  it('dispatches saved note', async () => {
    const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);

    const { getByPlaceholderText } = render(
      <Note route={fakeparams(0)} waitTime={1} />,
      {
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
      }
    );
    fireEvent.changeText(getByPlaceholderText(/content/i), 'new content');

    await waitFor(() => {
      expect(mockDispatchFn).toHaveBeenCalledWith({
        payload: { uid: '2', content: 'new content' },
        type: 'note/saveNote',
      });
    });
  });
});
