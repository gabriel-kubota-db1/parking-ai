import React from 'react';
import { AuthProvider } from '../context/AuthContext';
import { AntdThemeProvider } from './AntdThemeProvider';
import { ReactQueryProvider } from './ReactQueryProvider';

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReactQueryProvider>
      <AntdThemeProvider>
        <AuthProvider>{children}</AuthProvider>
      </AntdThemeProvider>
    </ReactQueryProvider>
  );
};
