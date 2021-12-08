import React, { useRef } from 'react';
import { Platform, Pressable, StyleSheet } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { ColorsType } from '../../../constants/Colors';
import Menu from '../../Theme/Menu/Menu';
import MenuIcon from '../../Theme/Menu/MenuIcon';
import { ThemeContext } from '../../Theme/types';
import { withTheme } from '../../Theme/withTheme';
import { Portal } from 'react-native-portalize';
import NoteListSettings from './NoteListSettings';

interface Props {
  themeContext: ThemeContext;
}

const NoteHeader = ({ themeContext }: Props) => {
  const colors = themeContext.colors;
  const modalizeRef = useRef<Modalize>(null);
  return (
    <Menu
      rightMenu={
        <Pressable
          onPress={() => {
            modalizeRef.current?.open();
          }}
        >
          <MenuIcon
            iconName={Platform.OS === 'ios' ? 'more-horiz' : 'more-vert'}
          />
          <Portal>
            <Modalize
              snapPoint={300}
              ref={modalizeRef}
              modalStyle={styles(colors).modal}
              handleStyle={styles(colors).modalHandle}
            >
              <NoteListSettings />
            </Modalize>
          </Portal>
        </Pressable>
      }
    />
  );
};

const styles = (colors: ColorsType) =>
  StyleSheet.create({
    header: {
      backgroundColor: colors.background,
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
    },
    more: {
      margin: 10,
      marginRight: 20,
      alignSelf: 'flex-end',
    },
    backContainer: {
      alignSelf: 'flex-start',
      flexDirection: 'row',
      alignItems: 'center',
      paddingRight: 5,
    },
    back: {
      margin: 10,
      marginLeft: 20,
    },
    backLabel: {
      fontSize: 18,
      color: colors.primary,
    },
    modalText: {
      alignSelf: 'center',
      justifyContent: 'center',
      color: colors.text,
    },
    modal: {
      backgroundColor: colors.background,
    },
    modalHandle: {
      backgroundColor: colors.primary,
    },
  });

export default withTheme(NoteHeader);
