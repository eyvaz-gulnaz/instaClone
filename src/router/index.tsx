import React, { useState } from 'react';
import { MainRouter } from './Main.Router';
import { AuthRouter } from './Auth.Router';
import { NavigationContainer } from '@react-navigation/native';

export const Router = () => {
  const [user, setUser] = useState<boolean>(false);

  return (
    <NavigationContainer>
      {user ? <MainRouter /> : <AuthRouter />}
    </NavigationContainer>
  );
};
