import { createContext } from 'react';

export interface AuthContextType {
  login: () => Promise<void>;
  logout: () => Promise<void>;
  isLoggedIn: boolean;
  user: any;
  userJWT: string | undefined;
}

// Context is used to pass data down the component tree without having to pass props down manually at every level.
export const AuthContext = createContext<AuthContextType>({
  login: async () => {},
  logout: async () => {},
  isLoggedIn: false,
  user: undefined,
  userJWT: undefined,
});
