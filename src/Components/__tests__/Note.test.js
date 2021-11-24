import {
  fireEvent as reduxFireEvent,
  render as reduxRender,
} from '../../../jest/ReduxRender';
import React from 'react';
import 'react-native';
import Note from '../Note';

describe('note', () => {
  it('shows the props as content', () => {
    const { getByPlaceholderText } = reduxRender(
      <Note initialNoteContent="the content" initialTitleContent="the title" />
    );

    getByPlaceholderText('title');
    getByPlaceholderText('content');

    expect(getByPlaceholderText('content').props.value).toEqual('the content');
    expect(getByPlaceholderText('title').props.value).toEqual('the title');
  });
  it('should allow the user to edit the input', () => {
    const { getByPlaceholderText } = reduxRender(
      <Note initialNoteContent="the content" initialTitleContent="the title" />
    );

    getByPlaceholderText('title');

    reduxFireEvent.changeText(getByPlaceholderText('title'), 'new title');
    expect(getByPlaceholderText('title').props.value).toEqual('new title');

    getByPlaceholderText('content');

    reduxFireEvent.changeText(getByPlaceholderText('content'), 'new content');
    expect(getByPlaceholderText('content').props.value).toEqual('new content');
  });
});
