import React, { useContext } from 'react';
import { Components } from './styled';
import { AuthContext } from '../../../providers/AuthProvider/context';

const SplashScreen = () => {
  return (
    <Components.Container>
      <Components.SplashText>Calorie Tracker</Components.SplashText>
    </Components.Container>
  );
};

export default SplashScreen;
