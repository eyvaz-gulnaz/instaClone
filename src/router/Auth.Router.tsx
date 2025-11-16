import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Routes } from './routes';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RegisterScreen } from '../screens/auth/Register.Screen';
import { LoginScreen } from '../screens/auth/Login.Screen';
import { ForgetPasswordScreen } from '../screens/auth/ForgetPassword.Screen';
import { authStackScreenOption } from '../configs/navigation.configs';
import { NavigationParamList } from '../types/nav.type';

const AuthStack = createNativeStackNavigator<NavigationParamList>();

export const AuthRouter = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AuthStack.Navigator screenOptions={authStackScreenOption}>
        <AuthStack.Screen name={Routes.register} component={RegisterScreen} />
        <AuthStack.Screen name={Routes.login} component={LoginScreen} />
        <AuthStack.Screen
          name={Routes.forgetPassword}
          component={ForgetPasswordScreen}
        />
      </AuthStack.Navigator>
    </SafeAreaView>
  );
};
