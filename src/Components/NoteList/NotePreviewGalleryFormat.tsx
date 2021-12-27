import React from 'react';
import {
  Text,
  StyleSheet,
  Pressable,
  View,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import { ColorsType } from '../../../constants/Colors';
import { ThemeContext } from '../../Theme/types';
import { withTheme } from '../../Theme/withTheme';
import HTMLView from 'react-native-htmlview';

interface Props {
  info: {
    data: { title: string; savedMessage: string; html: string };
    id: string;
  };
  themeContext: ThemeContext;
  onSelect: (id: string) => void;
}

const NotePreviewGalleryFormat = ({ info, themeContext, onSelect }: Props) => {
  const { width, height } = useWindowDimensions();

  const colors = themeContext.colors;
  return (
    <Pressable
      onPress={() => {
        onSelect(info.id);
      }}
      style={stylesWithDeminsions(colors, height, width).container}
    >
      <View>
        <ScrollView style={styles(colors).htmlPreview}>
          <HTMLView value={info.data.html} />
        </ScrollView>
        <View style={styles(colors).detailContainer}>
          <Text style={styles(colors).mainText}>
            {info.data.title === ''
              ? 'No title'
              : info.data.title.length >= 20
              ? info.data.title + '...'
              : info.data.title}
          </Text>
          <Text style={styles(colors).detailText}>
            {info.data.savedMessage}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const stylesWithDeminsions = (
  colors: ColorsType,
  height: number,
  width: number
) =>
  StyleSheet.create({
    container: {
      margin: 2,
      flex: 1,
      height: height / 3 - 6,
      width: width / 2 - 6,
      justifyContent: 'flex-end',
      marginBottom: 8,
      backgroundColor: colors.background,
    },
  });

const styles = (colors: ColorsType) =>
  StyleSheet.create({
    mainText: {
      textAlignVertical: 'top',
      marginTop: 10,
      marginHorizontal: 20,
      marginBottom: 2,
      color: colors.text,
      fontSize: 18,
    },
    htmlPreview: {
      borderRadius: 10,
      padding: 10,
      height: '60%',
      backgroundColor: colors.primary,
    },
    detailText: {
      textAlignVertical: 'top',
      marginHorizontal: 20,
      color: colors.textSecondary,
      fontSize: 15,
    },
    detailContainer: {
      height: '40%',
      backgroundColor: colors.background,
    },
  });

export default withTheme(NotePreviewGalleryFormat);
