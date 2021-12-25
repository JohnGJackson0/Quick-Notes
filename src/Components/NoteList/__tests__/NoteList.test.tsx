import React from 'react';
import 'react-native';
import { render, fireEvent } from '../../../../jest/reduxRender';
import '@testing-library/jest-dom';
import NoteList from '../NoteList';
import * as redux from 'react-redux';

describe('NoteList', () => {
  it('renders', () => {
    render(<NoteList />);
  });

  it('displays the instructions when there are no lists', () => {
    const { getByText } = render(<NoteList />);
    getByText(/There are no notes./i);
    getByText('Notes 0');
  });

  it('properly previews notes in list', () => {
    const { getByText } = render(<NoteList />, {
      preloadedState: {
        settings: {
          isGallery: false,
        },
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
      },
    });

    getByText(/My content/i);
    getByText(/Never Saved/i);
  });

  it('opens when pressing on the note preview', () => {
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
      },
    });

    fireEvent.press(
      getByText(/My content/i).parent || getByText(/My content/i)
    );

    expect(fakeNavigation.navigate).toHaveBeenCalledWith('Note', {
      position: 0,
    });
  });

  it('adds a new item', () => {
    const fakeNavigation = { navigate: jest.fn() };
    const { getByTestId } = render(<NoteList navigation={fakeNavigation} />);

    fireEvent.press(getByTestId('addNewItem'));

    expect(fakeNavigation.navigate).toHaveBeenCalledWith('Note', {
      position: 0,
    });
  });

  it('correctly dispatches create note', async () => {
    const fakeNavigation = { navigate: jest.fn() };
    const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValueOnce(mockDispatchFn);

    const { getByTestId } = render(<NoteList navigation={fakeNavigation} />);

    fireEvent.press(getByTestId('addNewItem'));

    expect(mockDispatchFn).toHaveBeenCalledWith({
      payload: undefined,
      type: 'note/createNote',
    });
  });

  it('correctly navigates when create note is clicked', () => {
    const fakeNavigation = { navigate: jest.fn() };
    const { getByTestId } = render(<NoteList navigation={fakeNavigation} />);

    fireEvent.press(getByTestId('addNewItem'));

    expect(fakeNavigation.navigate).toHaveBeenCalled();
  });

  it('correctly triggers new note useEffect for testing purpose', () => {
    const fakeNavigation = { navigate: jest.fn() };
    const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);

    const { getByTestId } = render(<NoteList navigation={fakeNavigation} />, {
      preloadedState: {
        notes: {
          notes: [
            {
              content: '',
              savedMessage: 'Never saved',
              neverOpened: true,
              uid: '1',
            },
          ],
          currentNoteId: '',
        },
      },
    });
    fireEvent.press(getByTestId('addNewItem'));

    expect(fakeNavigation.navigate).toHaveBeenCalled();
    expect(mockDispatchFn).toHaveBeenLastCalledWith({
      payload: { uid: '1' },
      type: 'note/updateNeverOpened',
    });
  });
});
