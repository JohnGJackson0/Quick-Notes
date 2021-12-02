import * as React from 'react';
import {
  ScrollView,
  ViewProps,
  StyleProp,
  StyleSheet,
  ViewStyle,
  View,
} from 'react-native';
import { ColorsType } from '../../constants/Colors';
import { ThemeContext } from './types';
import { withTheme } from './withTheme';

interface Props extends ViewProps {
  themeContext: ThemeContext;
  scroll?: boolean;
  style?: StyleProp<ViewStyle>;
}

const Screen: React.FC<Props> = ({ scroll, style, children, themeContext }) => {
  const colors = themeContext.colors;

  return scroll ? (
    <ScrollView
      testID="scrollview-screen"
      contentContainerStyle={styles(colors).contentContainer}
      style={[styles(colors).container, styles(colors).scrollcontainer, style]}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  ) : (
    <View
      testID="view-screen"
      style={[styles(colors).container, styles(colors).viewContainer, style]}
    >
      {children}
    </View>
  );
};
export default withTheme(Screen);

const styles = (colors: ColorsType) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.background,
    },
    scrollcontainer: {
      flex: 1,
      paddingTop: 36,
      paddingBottom: 36,
      paddingLeft: 14,
    },
    viewContainer: {
      flex: 1,
    },
    contentContainer: {
      paddingBottom: 36,
    },
  });
