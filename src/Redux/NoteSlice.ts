import 'react-native-get-random-values';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { v4 as uuidv4 } from 'uuid';
import getCurrentTime from '../Util/DateUtil';

// Define a type for the slice state
interface NoteState {
  notes: Array<{
    content: string;
    savedMessage: string;
    uid: string;
    neverOpened: boolean;
  }>;
  currentNoteUid: string;
  //needed to initate hiding the keyboard which must be done in note component
  //as you have to call {ref}.blur and cannot programmically close the keyboard
  //(reliably) elsewhere
  isEditing: boolean;
}

// Define the initial state using that type
const initialState: NoteState = {
  notes: [],
  currentNoteUid: '',
  isEditing: false,
};

interface UpdateNeverOpenedPayloadActionType {
  uid: string;
}
interface SaveNotePayloadActionType {
  content: string;
  uid: string;
}
interface UpdateCurrentNotePayloadActionType {
  uid: string;
}

interface UpdateIsEditingPayloadActionType {
  isEditing: boolean;
}

export const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    saveNote: (state, action: PayloadAction<SaveNotePayloadActionType>) => {
      state.notes.forEach((item, index) => {
        if (
          item.uid === action.payload.uid &&
          state.notes[index].content !== action.payload.content
        ) {
          state.notes[index].content = action.payload.content;
          state.notes[index].savedMessage = 'Edited on ' + getCurrentTime();
        }
      });
    },
    deleteCurrentNote: (state) => {
      state.notes.forEach((item, index) => {
        if (item.uid === state.currentNoteUid) {
          state.notes.splice(index, 1);
          state.currentNoteUid = '';
        }
      });
    },
    createNote: (state) => {
      state.notes.push({
        content: '',
        savedMessage: 'Never saved',
        uid: uuidv4(),
        neverOpened: true,
      });
    },
    updateCurrentNote: (
      state,
      action: PayloadAction<UpdateCurrentNotePayloadActionType>
    ) => {
      state.currentNoteUid = action.payload.uid;
    },
    updateIsEditing: (
      state,
      action: PayloadAction<UpdateIsEditingPayloadActionType>
    ) => {
      state.isEditing = action.payload.isEditing;
    },
    updateNeverOpened: (
      state,
      action: PayloadAction<UpdateNeverOpenedPayloadActionType>
    ) => {
      state.notes.forEach((item) => {
        if (item.uid === action.payload.uid) {
          item.neverOpened = false;
        }
      });
    },
  },
});

export const {
  saveNote,
  createNote,
  updateNeverOpened,
  deleteCurrentNote,
  updateCurrentNote,
  updateIsEditing,
} = noteSlice.actions;

export const selectNote = (state: RootState) => state.notes;

export default noteSlice.reducer;
