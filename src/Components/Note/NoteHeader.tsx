import React, { useRef } from 'react';
import { Platform, Pressable, StyleSheet } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { ColorsType } from '../../../constants/Colors';
import IconWithLabel from '../../Theme/Menu/IconWithLabel';
import Menu from '../../Theme/Menu/Menu';
import MenuIcon from '../../Theme/Menu/Icon';
import { ThemeContext } from '../../Theme/types';
import { withTheme } from '../../Theme/withTheme';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { Portal } from 'react-native-portalize';
import NoteSettings from '../Settings/NoteSettings/NoteSettings';
import { useAppDispatch } from '../../Hooks/redux';
import { updateIsEditing } from '../../Redux/NoteSlice';

interface Props {
  themeContext: ThemeContext;
  navigation: NavigationProp<ParamListBase>;
}

const NoteHeader = ({ themeContext, navigation }: Props) => {
  const colors = themeContext.colors;
  const modalizeRef = useRef<Modalize>(null);
  const dispatch = useAppDispatch();

  return (
    <Pressable
      testID="noteHeader"
      onPress={() => {
        dispatch(updateIsEditing({ isEditing: false }));
      }}
    >
      <Menu
        leftMenu={
          <Pressable
            testID="BackButton"
            onPress={() => {
              //todo go back
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
              dispatch(updateIsEditing({ isEditing: false }));
              modalizeRef.current?.open();
            }}
            testID="MoreIcon"
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
    </Pressable>
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
