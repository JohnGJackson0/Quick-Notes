import * as React from 'react';
import {
  ScrollView,
  ViewProps,
  StyleProp,
  StyleSheet,
  ViewStyle,
  View,
} from 'react-native';
import { getThemeColor } from '../Theme/getTheme';

interface Props extends ViewProps {
  scroll?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const Screen: React.FC<Props> = ({ scroll, style, children }) => {
  const backgroundColor = getThemeColor('background');

  return scroll ? (
    <ScrollView
      testID="scrollview-screen"
      contentContainerStyle={styles.contentContainer}
      style={[
        styles.container,
        styles.scrollcontainer,
        { backgroundColor },
        style,
      ]}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  ) : (
    <View
      testID="view-screen"
      style={[
        styles.container,
        styles.viewContainer,
        { backgroundColor },
        style,
      ]}
    >
      {children}
    </View>
  );
};
export default Screen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: getThemeColor('background'),
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
