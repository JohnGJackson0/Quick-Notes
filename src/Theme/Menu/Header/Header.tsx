import React, { useRef } from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Modalize } from 'react-native-modalize';
import { withTheme } from '../../withTheme';
import { ColorsType } from '../../../../constants/Colors';
import { ThemeContext } from '../../types';
import { Portal } from 'react-native-portalize';

interface Props {
  themeContext: ThemeContext;
  leftMenu: React.ReactNode;
  rightMenu: React.ReactNode;
  moreContentModal: React.ReactNode;
}

const Header: React.FC<Props> = ({
  themeContext,
  leftMenu,
  rightMenu,
  moreContentModal,
}) => {
  const MORE_ICON = Platform.OS === 'ios' ? 'more-horiz' : 'more-vert';
  const modalizeRef = useRef<Modalize>(null);
  const colors = themeContext.colors;

  return (
    <View style={styles(colors).header}>
      <View>{leftMenu}</View>

      {}

      {!moreContentModal ? (
        <>{rightMenu}</>
      ) : (
        <View>
          {rightMenu}
          <Pressable
            testID="MoreIcon"
            onPress={() => {
              modalizeRef.current?.open();
            }}
          >
            <MaterialIcons
              style={styles(colors).more}
              name={MORE_ICON}
              size={20}
              color={colors.primary}
            />
          </Pressable>
          <Portal>
            <Modalize
              snapPoint={300}
              ref={modalizeRef}
              modalStyle={styles(colors).modal}
            >
              {moreContentModal}
            </Modalize>
          </Portal>
        </View>
      )}
    </View>
  );
};

const styles = (colors: ColorsType) =>
  StyleSheet.create({
    header: {
      backgroundColor: colors.background,
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
      height: 50,
      alignItems: 'center',
    },
    more: {
      margin: 10,
      marginRight: 20,
      alignSelf: 'flex-end',
    },
    modal: {
      backgroundColor: colors.background,
    },
    contentModalContainer: {
      width: '100%',
    },
  });

export default withTheme(Header);
