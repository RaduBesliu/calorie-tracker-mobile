import React from 'react';
import { Components } from './styled';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { COLORS } from '../../../utils/styled/constants';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import useGoogleLogin from '../../../providers/AuthProvider/useGoogleLogin';

const Login = () => {
  // Google Login
  const { login } = useGoogleLogin();

  return (
    <Components.Container>
      <Components.Button onPress={login}>
        <FontAwesomeIcon icon={faGoogle} color={COLORS.black} />
        <Components.ButtonLabel>{'Login'}</Components.ButtonLabel>
      </Components.Button>
    </Components.Container>
  );
};

export default Login;
