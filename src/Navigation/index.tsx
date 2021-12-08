import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MainStackNavigator } from './MainStackNavigator';
import { navigationRef } from './RootNavigation';

export default function Navigation() {
  return (
    <NavigationContainer ref={navigationRef}>
      <MainStackNavigator />
    </NavigationContainer>
  );
}
