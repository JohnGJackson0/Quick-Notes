import React from 'react';
import 'react-native';
import Note from '../Note';
import { render, fireEvent, waitFor } from '../../../test-utils';
import * as redux from 'react-redux';
import '@testing-library/jest-dom';

describe('note', () => {
  it('should allow the user to edit the input', () => {
    const { getByPlaceholderText } = render(<Note />);
    getByPlaceholderText(/title/i);

    fireEvent.changeText(getByPlaceholderText(/title/i), 'new title');
    expect(getByPlaceholderText(/title/i).props.value).toEqual('new title');

    getByPlaceholderText(/content/i);

    fireEvent.changeText(getByPlaceholderText(/content/i), 'new content');
    expect(getByPlaceholderText(/content/i).props.value).toEqual('new content');
  });

  it('dispatches properly to be saved by redux', async () => {
    const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);
    const { getByPlaceholderText, getByText } = render(<Note waitTime={1} />);

    getByPlaceholderText(/content/i);

    getByText(/never saved/i);

    fireEvent.changeText(getByPlaceholderText(/content/i), 'new content');

    await waitFor(() => {
      expect(mockDispatchFn).toHaveBeenCalledWith({
        payload: { content: 'new content', title: '' },
        type: 'note/saveNote',
      });
    });
  });
});
