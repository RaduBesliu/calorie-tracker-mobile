import React, { useContext } from 'react';
import { Components } from './styled';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { COLORS } from '../../../utils/styled/constants';
import { AuthContext } from '../../../providers/AuthProvider/context';

const Login = () => {
  // Variables from the authentication context
  const { login, logout, isLoggedIn, user } = useContext(AuthContext);

  return (
    <Components.Container>
      {!isLoggedIn && (
        <Components.Button onPress={login}>
          <FontAwesomeIcon icon={faGoogle} color={COLORS.black} />
          <Components.ButtonLabel>{'Login'}</Components.ButtonLabel>
        </Components.Button>
      )}
      {isLoggedIn && user && (
        <>
          {Object.keys(user).map((key) => {
            return (
              <Components.Text key={key}>
                {key}: {user[key as keyof typeof user]}
              </Components.Text>
            );
          })}
          <Components.Button onPress={logout}>
            <FontAwesomeIcon icon={faGoogle} color={COLORS.black} />
            <Components.ButtonLabel>{'Logout'}</Components.ButtonLabel>
          </Components.Button>
        </>
      )}
    </Components.Container>
  );
};

export default Login;
