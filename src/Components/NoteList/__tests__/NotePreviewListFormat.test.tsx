import React from 'react';
import 'react-native';
import { render, fireEvent } from '../../../../jest/reduxRender';
import '@testing-library/jest-dom';
import NotePreviewListFormat from '../NotePreviewListFormat';

describe('NotePreviewListFormat', () => {
  it('renders', () => {
    const item = {
      data: { title: 'ex', savedMessage: 'Never saved' },
      id: '2',
    };

    render(<NotePreviewListFormat info={item} />);
  });

  it('displays the title and saved message', () => {
    const item = {
      data: { title: 'ex', savedMessage: 'Never saved' },
      id: '2',
    };

    const { getByText } = render(<NotePreviewListFormat info={item} />);

    getByText('ex');
    getByText('Never saved');
  });

  it('uses the select callback prop passed in when clicked', () => {
    const fakeOnSelect = jest.fn();

    const item = {
      data: { title: 'ex', savedMessage: 'Never saved' },
      id: '2',
    };

    const { getByText } = render(
      <NotePreviewListFormat info={item} onSelect={fakeOnSelect} />
    );

    fireEvent.press(getByText('ex').parent || getByText('ex'));

    expect(fakeOnSelect).toHaveBeenCalledWith('2');
  });

  it('displays ellipses on titles over 25 chars', () => {
    const item = {
      data: {
        title: 'ABCDEFGHIJKLMNOPQRTUVWZYZ',
        savedMessage: 'Never saved',
      },
      id: '2',
    };

    const { getByText } = render(<NotePreviewListFormat info={item} />);

    getByText(/ABCDEFGHIJKLMNOPQRTUVWZY.../);
  });
});
