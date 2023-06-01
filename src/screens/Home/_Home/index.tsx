import React, { useContext } from 'react';
import { Components } from './styled';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { COLORS } from '../../../utils/styled/constants';
import { AuthContext } from '../../../providers/AuthProvider/context';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();

  const { logout } = useContext(AuthContext);

  return (
    <Components.Container>
      {/*@ts-ignore*/}
      <Components.Button onPress={() => navigation.navigate('Diaries')}>
        <Components.ButtonLabel>{'Diary'}</Components.ButtonLabel>
      </Components.Button>
      {/*@ts-ignore*/}
      <Components.Button onPress={() => navigation.navigate('Meals')}>
        <Components.ButtonLabel>{'Meals'}</Components.ButtonLabel>
      </Components.Button>
      {/*@ts-ignore*/}
      <Components.Button onPress={() => navigation.navigate('Products')}>
        <Components.ButtonLabel>{'Products'}</Components.ButtonLabel>
      </Components.Button>
      <Components.Button onPress={logout}>
        <FontAwesomeIcon icon={faGoogle} color={COLORS.black} />
        <Components.ButtonLabel>{'Logout'}</Components.ButtonLabel>
      </Components.Button>
    </Components.Container>
  );
};

export default Home;
