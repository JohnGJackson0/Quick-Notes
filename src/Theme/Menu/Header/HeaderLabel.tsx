import React, { useRef } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Modalize } from 'react-native-modalize';
import NoteSettings from './NoteSettings';
import { ThemeContext } from '../../types';
import { withTheme } from '../../withTheme';
import { ColorsType } from '../../../../constants/Colors';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

interface Props {
  text: string;
}

const HeaderLabel = ({ text }: Props) => {
  return <Text>{text}</Text>;
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
  });

export default withTheme(HeaderLabel);
