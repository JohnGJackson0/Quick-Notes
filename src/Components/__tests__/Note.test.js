import {
  fireEvent as rntlFireEvent,
  render as rntlRender,
} from '@testing-library/react-native';
import React from 'react';
import 'react-native';
import Note from '../Note';

describe('note', () => {
  it('shows the props as content', () => {
    const { getByPlaceholderText } = rntlRender(
      <Note initialNoteContent="the content" initialTitleContent="the title" />
    );

    getByPlaceholderText('title');
    getByPlaceholderText('content');

    expect(getByPlaceholderText('content').props.value).toEqual('the content');
    expect(getByPlaceholderText('title').props.value).toEqual('the title');
  });
  it('should allow the user to edit the input', () => {
    const { getByPlaceholderText } = rntlRender(
      <Note initialNoteContent="the content" initialTitleContent="the title" />
    );

    getByPlaceholderText('title');

    rntlFireEvent.changeText(getByPlaceholderText('title'), 'new title');
    expect(getByPlaceholderText('title').props.value).toEqual('new title');

    getByPlaceholderText('content');

    rntlFireEvent.changeText(getByPlaceholderText('content'), 'new content');
    expect(getByPlaceholderText('content').props.value).toEqual('new content');
  });
});
