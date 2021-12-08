import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { withTheme } from '../withTheme';
import { ColorsType } from '../../../constants/Colors';
import { ThemeContext } from '../types';

interface Props {
  themeContext: ThemeContext;
  leftMenu: React.ReactNode;
  centerMenu: React.ReactNode;
  rightMenu: React.ReactNode;
  rightActionIcon: React.ReactNode;
  rightAction: () => void;
}

const Menu: React.FC<Props> = ({
  themeContext,
  leftMenu,
  rightMenu,
  centerMenu,
  rightActionIcon,
  rightAction,
}) => {
  const colors = themeContext.colors;

  return (
    <View style={styles(colors).container}>
      <View>{leftMenu}</View>

      <View>{centerMenu}</View>

      <View>
        {!rightAction ? (
          <>{rightMenu}</>
        ) : (
          <View>
            {rightMenu}
            <Pressable
              onPress={() => {
                rightAction();
              }}
            >
              <View style={styles(colors).iconContainer}>
                {rightActionIcon}
              </View>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = (colors: ColorsType) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
      height: 50,
      alignItems: 'center',
    },
    contentModalContainer: {
      backgroundColor: colors.background,
    },
    iconContainer: {
      margin: 10,
      marginRight: 20,
      alignSelf: 'flex-end',
    },
    modal: {
      backgroundColor: colors.background,
    },
    modalHandle: {
      backgroundColor: colors.primary,
    },
  });

export default withTheme(Menu);
