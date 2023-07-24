import React, { createContext, useContext, useState, useEffect } from 'react';

import { storage } from '@/helpers/storage';
import { app_title } from '@/helpers/constants';

export const AdminContext = createContext(null);

export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }) => {
  const [appTitle, setAppTitle] = useState('');

  const configAppTitle = (text) => {
    storage.set(app_title, text);
    setAppTitle(text);
  };

  const getInfo = () => {
    const _title = storage.get(app_title);
    setAppTitle(_title);
  };

  const getAppTitle = () => appTitle ?? '';

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <AdminContext.Provider
      value={{
        configAppTitle,
        getAppTitle,
        appTitle,
      }}>
      {children}
    </AdminContext.Provider>
  );
};
