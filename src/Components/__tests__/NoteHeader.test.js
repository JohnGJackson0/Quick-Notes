import React from 'react';
import 'react-native';
import { Platform } from 'react-native';
import { render, fireEvent, waitFor } from '../../../jest/reduxRender';
import '@testing-library/jest-dom';
import NoteHeader from '../NoteHeader';

const setPlatform = function (platform) {
  Object.defineProperty(Platform, 'OS', {
    get: jest.fn(() => platform),
  });
};

describe('NoteHeader', () => {
  it('renders', () => {
    const { getByText } = render(<NoteHeader />);
    getByText(/Edit/i);
  });
  it('displays note settings on press', async () => {
    const { getByTestId, getByText } = render(<NoteHeader />);
    fireEvent.press(getByTestId('MoreIcon'));

    await waitFor(() => {
      getByText(/Settings/i);
    });
  });

  it('has no icon error with android platform', () => {
    setPlatform('android');
    const { getByTestId } = render(<NoteHeader />);
    getByTestId('MoreIcon');
  });
  it('has no icon error with ios platform', () => {
    setPlatform('ios');
    const { getByTestId } = render(<NoteHeader />);
    getByTestId('MoreIcon');
  });
});
