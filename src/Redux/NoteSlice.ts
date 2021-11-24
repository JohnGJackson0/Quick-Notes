import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import getCurrentTime from '../Util/DateUtil';
import type { RootState } from './store';

// Define a type for the slice state
interface NoteState {
  title: string;
  content: string;
  savedMessage: string;
}

// Define the initial state using that type
const initialState: NoteState = {
  title: '',
  content: '',
  savedMessage: 'Never Saved',
};

interface AddNotePayloadActionType {
  title: string;
  content: string;
}

export const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    saveNote: (state, action: PayloadAction<AddNotePayloadActionType>) => {
      if (
        state.title !== action.payload.title ||
        state.content !== action.payload.content
      ) {
        state.title = action.payload.title;
        state.content = action.payload.content;
        state.savedMessage = 'Autosaved on ' + getCurrentTime();
      }
    },
  },
});

export const { saveNote } = noteSlice.actions;

export const selectNote = (state: RootState) => state.notes;

export default noteSlice.reducer;
