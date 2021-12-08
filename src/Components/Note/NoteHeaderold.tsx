import React, { useRef } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Modalize } from 'react-native-modalize';
import NoteSettings from './NoteSettings';
import { ThemeContext } from '../../Theme/types';
import { withTheme } from '../../Theme/withTheme';
import { ColorsType } from '../../../constants/Colors';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

interface Props {
  themeContext: ThemeContext;
  navigation: NavigationProp<ParamListBase>;
}

const NoteHeader = ({ themeContext, navigation }: Props) => {
  const MORE_ICON = Platform.OS === 'ios' ? 'more-horiz' : 'more-vert';
  const BACK_ICON = 'arrow-back-ios';
  const modalizeRef = useRef<Modalize>(null);
  const colors = themeContext.colors;

  return (
    <View style={styles(colors).header}>
      <Pressable
        onPress={() => {
          goBack();
        }}
      >
        <View style={styles(colors).backContainer}>
          <MaterialIcons
            style={styles(colors).back}
            name={BACK_ICON}
            size={20}
            color={colors.primary}
          />
          <Text style={styles(colors).backLabel}>Notes</Text>
        </View>
      </Pressable>

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

export default withTheme(NoteHeader);
