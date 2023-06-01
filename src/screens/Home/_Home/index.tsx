import React, { useContext, useEffect } from 'react';
import { Components } from './styled';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { COLORS } from '../../../utils/styled/constants';
import { AuthContext } from '../../../providers/AuthProvider/context';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();

  const { user, logout, isLoggedIn } = useContext(AuthContext);

  return (
    <>
      {user && (
        <Components.Container>
          <Components.Text>Home</Components.Text>
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
        </Components.Container>
      )}
    </>
  );
};

export default Home;
