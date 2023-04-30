import React from 'react';
import { Components } from './styled';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { COLORS } from '../../../utils/styled/constants';

const Login = () => {
  return (
    <Components.Container>
      <Components.Button>
        <FontAwesomeIcon icon={faGoogle} color={COLORS.black} />
        <Components.ButtonLabel>{'Login'}</Components.ButtonLabel>
      </Components.Button>
    </Components.Container>
  );
};

export default Login;
