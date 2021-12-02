import React, { useRef } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Modalize } from 'react-native-modalize';
import NoteSettings from './NoteSettings';
import { ThemeContext } from '../Theme/types';
import { withTheme } from '../Theme/withTheme';
import { ColorsType } from '../../constants/Colors';

interface Props {
  themeContext: ThemeContext;
}

const NoteHeader = ({ themeContext }: Props) => {
  const MORE_ICON = Platform.OS === 'ios' ? 'more-horiz' : 'more-vert';
  const modalizeRef = useRef<Modalize>(null);
  const colors = themeContext.colors;

  return (
    <View style={styles(colors).header}>
      <Text style={styles(colors).headerTitle}>Edit Note</Text>
      <Pressable
        testID="MoreIcon"
        onPress={() => {
          modalizeRef.current?.open();
        }}
      >
        <MaterialIcons
          style={styles(colors).more}
          name={MORE_ICON}
          size={25}
          color={colors.primary}
        />
      </Pressable>
      <Modalize
        snapPoint={300}
        ref={modalizeRef}
        modalStyle={styles(colors).modal}
      >
        <NoteSettings />
      </Modalize>
    </View>
  );
};

const styles = (colors: ColorsType) =>
  StyleSheet.create({
    header: {
      backgroundColor: colors.background,
      flexDirection: 'row',
    },
    headerTitle: {
      color: colors.text,
      fontSize: 20,
      margin: 10,
      marginLeft: 25,
      flexGrow: 1,
    },
    more: {
      margin: 10,
      marginRight: 20,
      alignSelf: 'flex-end',
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

export default withTheme(NoteHeader);
