import React, { useRef } from 'react';
import { Platform, Pressable, StyleSheet } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { ColorsType } from '../../../constants/Colors';
import IconWithLabel from '../../Theme/Menu/IconWithLabel';
import Menu from '../../Theme/Menu/Menu';
import MenuIcon from '../../Theme/Menu/MenuIcon';
import { ThemeContext } from '../../Theme/types';
import { withTheme } from '../../Theme/withTheme';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { Portal } from 'react-native-portalize';
import NoteSettings from './NoteSettings/NoteSettings';

interface Props {
  themeContext: ThemeContext;
  navigation: NavigationProp<ParamListBase>;
}

const NoteHeader = ({ themeContext, navigation }: Props) => {
  const colors = themeContext.colors;
  const modalizeRef = useRef<Modalize>(null);
  return (
    <Menu
      leftMenu={
        <Pressable
          onPress={() => {
            //todo save note first

            navigation.goBack();
          }}
        >
          <IconWithLabel
            icon={<MenuIcon iconName="arrow-back-ios" />}
            label="Notes"
          />
        </Pressable>
      }
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
              <NoteSettings />
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
