import React, { useEffect, useMemo, useState } from 'react';
import useGoogleLogin from './useGoogleLogin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from './context';
import { apiFetch } from '../../api';
import { User } from '../../api/types/user';

// Provider for authentication
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { login: googleLogin, logout: googleLogout } = useGoogleLogin();

  // States for authentication
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | undefined>(undefined);
  const [userJWT, setUserJWT] = useState<string | undefined>();

  // Check if user is logged in on app start
  useEffect(() => {
    AsyncStorage.getItem('userJWT').then((userJWT) => {
      // If userJWT is found, set userJWT, user and isLoggedIn
      if (userJWT) {
        setIsLoggedIn(true);
        setUserJWT(userJWT);

        // Fetch user data
        apiFetch({
          path: '/user/me',
        }).then((data) => {
          if (data) {
            setUser(data);
            return;
          }

          // If no user is found, logout
          console.log('[AUTH] No user found');
          logout().then();
        });

        // Log user in with JWT
        console.log('[AUTH] Logged in with JWT', userJWT);
        return;
      }

      // If no userJWT is found, logout
      console.log('[AUTH] No JWT found');
      setIsLoggedIn(false);
      setUserJWT(undefined);
    });
  }, []);

  // Console log user data when userJWT, user or isLoggedIn changes
  useEffect(() => {
    if (!userJWT) {
      console.log('[AUTH] No JWT found');
      return;
    }

    console.log('----------------');
    console.log('[AUTH] Logged in with JWT', userJWT);
    console.log('[AUTH] User', user);
    console.log('[AUTH] isLoggedIn', isLoggedIn);
    console.log('----------------');
  }, [userJWT, user, isLoggedIn]);

  // Login function
  const login = async () => {
    // Logout first
    await logout();

    // Login with Google
    const user = await googleLogin();

    // If no user or no user.idToken is found, return
    if (!user || !user.idToken) {
      return;
    }

    // Get the JWT token from the API
    const userJWT = await apiFetch({
      method: 'POST',
      path: '/login',
      body: {
        token: user.idToken,
      },
    });

    // If no userJWT is found, return
    if (!userJWT) {
      return;
    }

    // Set userJWT, user and isLoggedIn
    setIsLoggedIn(true);
    setUserJWT(userJWT);
    await AsyncStorage.setItem('userJWT', userJWT);

    // Fetch user data
    apiFetch({
      path: '/user/me',
    }).then((data) => {
      if (data) {
        setUser(data);
        return;
      }

      console.log('[AUTH] No user found');
      logout().then();
    });
  };

  // Logout function
  const logout = async () => {
    // Logout from Google
    await googleLogout();

    // Remove userJWT, user and isLoggedIn
    await AsyncStorage.removeItem('userJWT');
    setIsLoggedIn(false);
    setUserJWT(undefined);
    setUser(undefined);
  };

  // Create value object for context
  const value = useMemo(() => ({ isLoggedIn, login, logout, user, userJWT }), [isLoggedIn, user, userJWT]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
