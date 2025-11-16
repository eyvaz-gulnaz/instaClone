import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Routes } from './routes';
import { defaultScreenOptions } from '../configs/navigation.configs';
import { NavigationParamList } from '../types/nav.type';
import { TestScreen } from '../screens/Test.Screen';

const MainStack = createNativeStackNavigator<NavigationParamList>();
export const MainRouter = () => {
  return (
    <MainStack.Navigator
      initialRouteName={Routes.test}
      screenOptions={defaultScreenOptions}
    >
      <MainStack.Screen name={Routes.test} component={TestScreen} />
    </MainStack.Navigator>
  );
};
