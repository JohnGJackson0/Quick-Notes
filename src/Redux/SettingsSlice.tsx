import 'react-native-get-random-values';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

interface SettingsState {
  isGallery: boolean;
}

const initialState: SettingsState = {
  isGallery: false,
};

interface UpdateIsGalleryPayloadActionType {
  isGallery: boolean;
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateIsGallery: (
      state,
      action: PayloadAction<UpdateIsGalleryPayloadActionType>
    ) => {
      state.isGallery = action.payload.isGallery;
    },
  },
});

export const { updateIsGallery } = settingsSlice.actions;

export const selectSettings = (state: RootState) => state.settings;

export default settingsSlice.reducer;
