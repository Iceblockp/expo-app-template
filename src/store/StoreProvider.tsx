import React from 'react';
import { Provider } from 'react-redux';
import { QueryProvider } from '../services/api/QueryProvider';
import { store } from './index';

interface StoreProviderProps {
  children: React.ReactNode;
}

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <QueryProvider>{children}</QueryProvider>
    </Provider>
  );
};
