import React, { createContext, useState, useEffect, ReactNode } from 'react';
import {
  getAuthToken,
  setAuthToken as storeToken,
  removeAuthToken,
  getUser,
  setUser as storeUser,
  removeUser,
} from '../storage/auth';
import { jwtDecode } from 'jwt-decode';

interface AuthContextType {
  user: any | null;
  token: string | null;
  login: (token: string, user: any) => void;
  logout: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [token, setToken] = useState<string | null>(getAuthToken());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = getAuthToken();
    const storedUser = getUser();

    if (storedToken && storedUser) {
      try {
        const decoded: { exp: number } = jwtDecode(storedToken);
        if (decoded.exp * 1000 > Date.now()) {
          setUser(storedUser);
          setToken(storedToken);
        } else {
          logout();
        }
      } catch (error) {
        logout();
      }
    }
    setLoading(false);
  }, []);

  const login = (newToken: string, userData: any) => {
    storeToken(newToken);
    storeUser(userData);
    setToken(newToken);
    setUser(userData);
  };

  const logout = () => {
    removeAuthToken();
    removeUser();
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
