import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { ColorsType, LIGHT, DARK } from '../../../constants/Colors';
import { ThemeContext } from '../../Theme/types';
import { withTheme } from '../../Theme/withTheme';
import ThemeCircle from './ThemeCircle';
import { navigate } from '../../Navigation/RootNavigation';

interface Props {
  themeContext: ThemeContext;
}

const ThemeSettings = ({ themeContext }: Props) => {
  const colors = themeContext.colors;
  return (
    <View testID="themeSettings">
      <Text style={styles(colors).settingslabel}>Themes</Text>
      <View style={styles(colors).circleContainer}>
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
    </View>
  );
};

const styles = (colors: ColorsType) =>
  StyleSheet.create({
    circleContainer: {
      flexDirection: 'row',
      zIndex: 1,
    },
    settingslabel: {
      margin: 5,
      color: colors.text,
      flex: 1,
    },
  });

export default withTheme(ThemeSettings);
