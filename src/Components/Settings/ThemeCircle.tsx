import React from 'react';
import { View, StyleSheet } from 'react-native';

interface Props {
  color: '#121212' | '#FFFFFF';
  invertedBorderColor: '#121212' | '#FFFFFF';
}

const ThemeCircle = (props: Props) => {
  return <View style={styles(props).border} />;
};

const styles = (props: Props) =>
  StyleSheet.create({
    border: {
      backgroundColor: props.color,
      width: 25,
      height: 25,
      borderRadius: 25 / 2,
      margin: 5,
      borderColor: props.invertedBorderColor,
      borderWidth: 2,
    },
    circle: {
      backgroundColor: props.color,
      width: 25,
      height: 25,
      borderRadius: 25 / 2,
      margin: 5,
    },
  });

export default ThemeCircle;
