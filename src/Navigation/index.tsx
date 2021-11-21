import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MainStackNavigator } from './MainStackNavigator';

export default function Navigation() {
  return (
    <NavigationContainer>
      <MainStackNavigator />
    </NavigationContainer>
  );
}
