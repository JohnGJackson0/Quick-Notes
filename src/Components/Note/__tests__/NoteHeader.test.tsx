import React from 'react';
import 'react-native';
import { Platform } from 'react-native';
import { render, fireEvent, waitFor } from '../../../../jest/reduxRender';
import '@testing-library/jest-dom';
import NoteHeader from '../NoteHeader';
import { Host } from 'react-native-portalize';

const setPlatform = function (platform: 'ios' | 'android') {
  Object.defineProperty(Platform, 'OS', {
    get: jest.fn(() => platform),
  });
};

describe('NoteHeader', () => {
  it('renders', () => {
    const { getByText } = render(
      <Host>
        <NoteHeader />
      </Host>
    );
    getByText(/Notes/i);
  });
  it('displays note settings on press', async () => {
    const { getByTestId, getByText } = render(
      <Host>
        <NoteHeader />
      </Host>
    );
    fireEvent.press(getByTestId('MoreIcon'));

    await waitFor(() => {
      getByText(/Settings/i);
    });
  });

  it('has no icon error with android platform', () => {
    setPlatform('android');
    const { getByTestId } = render(
      <Host>
        <NoteHeader />
      </Host>
    );
    getByTestId('MoreIcon');
  });
  it('has no icon error with ios platform', () => {
    setPlatform('ios');
    const { getByTestId } = render(
      <Host>
        <NoteHeader />
      </Host>
    );
    getByTestId('MoreIcon');
  });

  it('reroutes when pressing on the back button', () => {
    const fakeNavigation = { goBack: jest.fn() };

    const { getByTestId } = render(
      <Host>
        <NoteHeader navigation={fakeNavigation} />
      </Host>
    );

    fireEvent.press(getByTestId('BackButton'));

    expect(fakeNavigation.goBack).toHaveBeenCalled();
  });
});
