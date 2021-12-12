import React from 'react';
import 'react-native';
import { render, fireEvent } from '../../../../../jest/reduxRender';
import '@testing-library/jest-dom';
import { Host } from 'react-native-portalize';
import CurrentNoteSettings from '../CurrentNoteSettings';
import * as navigation from '../../../../Navigation/RootNavigation';
import * as redux from 'react-redux';

describe('NoteSettings', () => {
  it('renders', () => {
    render(
      <Host>
        <CurrentNoteSettings />
      </Host>
    );
  });

  it('it navigates to the note list after deleting', async () => {
    const mock = jest.spyOn(navigation, 'navigate');

    const { getByTestId } = render(
      <Host>
        <CurrentNoteSettings />
      </Host>
    );

    fireEvent.press(getByTestId('DeleteNote'));

    expect(mock).toHaveBeenCalledWith('NoteList');
  });

  it('correctly dispatches to delete the note', () => {
    const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValueOnce(mockDispatchFn);

    const { getByTestId } = render(
      <Host>
        <CurrentNoteSettings />
      </Host>
    );

    fireEvent.press(getByTestId('DeleteNote'));

    expect(mockDispatchFn).toHaveBeenCalledWith({
      payload: undefined,
      type: 'note/deleteCurrentNote',
    });
  });
});
