import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { COLORS } from './src/utils/styled/constants';
import Login from './src/screens/Login/_Login';
import Providers from './src/providers';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './src/providers/AuthProvider/context';
import SplashScreen from './src/screens/Login/SplashScreen';
import Home from './src/screens/Home/_Home';
import Products from './src/screens/Products/_Products';
import CreateProduct from './src/screens/Products/CreateProduct';

const Stack = createNativeStackNavigator();

export default function App() {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Providers>
      {!isLoading ? (
        <SplashScreen />
      ) : (
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: COLORS.green,
              },
            }}>
            <Stack.Screen name='Products' component={Products} />
            <Stack.Screen name='Create Product' component={CreateProduct} />
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </Providers>
  );
}
