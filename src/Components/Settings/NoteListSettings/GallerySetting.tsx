import React from 'react';
import { Pressable } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../../Hooks/redux';
import { updateIsGallery } from '../../../Redux/SettingsSlice';
import { RootState } from '../../../Redux/store';
import Icon from '../../../Theme/Menu/Icon';
import SettingsItem from '../../../Theme/Settings/SettingsItem';

const GallerySetting = () => {
  const settings = useAppSelector((state: RootState) => state.settings);
  const dispatch = useAppDispatch();

  return settings.isGallery ? (
    <SettingsItem
      label="View as List"
      content={
        <Pressable
          onPress={() => {
            dispatch(updateIsGallery({ isGallery: false }));
          }}
        >
          <Icon iconName="list" size={45} />
        </Pressable>
      }
    />
  ) : (
    <SettingsItem
      label="View as Gallery"
      content={
        <Pressable
          onPress={() => {
            dispatch(updateIsGallery({ isGallery: true }));
          }}
        >
          <Icon iconName="view-module" size={45} />
        </Pressable>
      }
    />
  );
};

export default GallerySetting;
