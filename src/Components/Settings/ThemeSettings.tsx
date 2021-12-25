import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { LIGHT, DARK } from '../../../constants/Colors';
import { ThemeContext } from '../../Theme/types';
import { withTheme } from '../../Theme/withTheme';
import ThemeCircle from './ThemeCircle';
import { navigate } from '../../Navigation/RootNavigation';
import SettingsItem from '../../Theme/Settings/SettingsItem';

interface Props {
  themeContext: ThemeContext;
}

const ThemeSettings = ({ themeContext }: Props) => {
  return (
    <View testID="themeSettings">
      <SettingsItem
        label="Themes"
        content={
          <View style={styles.circleContainer}>
            <Pressable
              testID="light"
              onPress={() => {
                if (!themeContext.isLight) {
                  themeContext.setColor(LIGHT);
                  themeContext.setIsLight(true);
                  navigate('NoteList');
                }
              }}
            >
              <ThemeCircle color="#FFFFFF" invertedBorderColor="#121212" />
            </Pressable>
            <Pressable
              testID="dark"
              onPress={() => {
                if (themeContext.isLight) {
                  themeContext.setColor(DARK);
                  themeContext.setIsLight(false);
                  navigate('NoteList');
                }
              }}
            >
              <ThemeCircle color="#121212" invertedBorderColor="#FFFFFF" />
            </Pressable>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  circleContainer: {
    flexDirection: 'row',
    zIndex: 1,
  },
});

export default withTheme(ThemeSettings);
