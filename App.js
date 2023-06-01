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
import Meals from './src/screens/Meals/_Meals';
import CreateMeal from './src/screens/Meals/CreateMeal';
import Diaries from './src/screens/Diaries/_Diaries';
import CreateDiary from './src/screens/Diaries/CreateDiary';

const Stack = createNativeStackNavigator();

const App = () => {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  useEffect(() => {
    console.log('IS LOGGED IN', isLoggedIn);
  }, [isLoggedIn]);

  return (
    <>
      {isLoading ? (
        <SplashScreen />
      ) : (
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: COLORS.green,
              },
            }}>
            {isLoggedIn ? (
              <Stack.Group>
                <Stack.Screen name='Home' component={Home} />
                <Stack.Screen name='Diaries' component={Diaries} />
                <Stack.Screen name='Meals' component={Meals} />
                <Stack.Screen name='Create Diary' component={CreateDiary} />
                <Stack.Screen name='Create Meal' component={CreateMeal} />
                <Stack.Screen name='Products' component={Products} />
                <Stack.Screen name='Create Product' component={CreateProduct} />
              </Stack.Group>
            ) : (
              <Stack.Group>
                <Stack.Screen name='Login' component={Login} />
              </Stack.Group>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </>
  );
};

export default App;
