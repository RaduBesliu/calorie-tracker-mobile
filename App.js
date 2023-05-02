import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { COLORS } from './src/utils/styled/constants';
import Login from './src/screens/Login/_Login';
import Providers from './src/providers';
import { useContext } from 'react';
import { AuthContext } from './src/providers/AuthProvider/context';

const Stack = createNativeStackNavigator();

export default function App() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Providers>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: COLORS.red,
            },
          }}>
          <Stack.Screen name='Login' component={Login} />
        </Stack.Navigator>
      </Providers>
    </NavigationContainer>
  );
}
