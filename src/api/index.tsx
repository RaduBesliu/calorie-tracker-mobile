import AsyncStorage from '@react-native-async-storage/async-storage';
import { BACKEND_URL } from '../env';

// Custom API fetch function
export const apiFetch = async ({
  method = 'GET',
  path,
  body,
}: {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  body?: unknown;
}) => {
  // Check if there is a JWT in storage
  const userJWT = await AsyncStorage.getItem('userJWT');

  // If there is no JWT and the path is not /login, return
  if (!userJWT && path !== '/login') {
    console.log('[API] No JWT found');
    return;
  }

  const defaultHeaders = {
    Accept: 'application/json',
  };

  const authHeaders = {
    Authorization: `Bearer ${userJWT}`,
  };

  // If the method is GET and there is a body, return
  if (method === 'GET' && body) {
    console.log('[API] GET request with body');
    return;
  }

  let data;
  try {
    // If the path is /login, send a POST request with the token as a query parameter
    if (path === '/login') {
      console.log('[API] Login request');
      console.log(BACKEND_URL + path, `?token=${(body as any).token}`);
      const response = await fetch(BACKEND_URL + path + `?token=${(body as any).token}`, {
        method,
        headers: {
          ...defaultHeaders,
        },
      });
      data = await response.json();

      // Return the JWT
      return data.token;
    }

    // If the path is not /login, send a request with the JWT in the Authorization header
    console.log('[API] Request', method, path);
    const response = await fetch(BACKEND_URL + path, {
      method,
      body: body ? JSON.stringify(body) : undefined,
      headers: {
        ...defaultHeaders,
        ...authHeaders,
      },
    });

    data = await response.json();
  } catch (error) {
    console.log(`[API] ${path} Error`, error);
  }

  // Return the data
  return data;
};
