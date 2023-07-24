import React, { createContext, useContext, useState, useEffect } from 'react';

import { storage } from '@/helpers/storage';
import { auth_token, auth_user, auth_role } from '@/helpers/constants';

export const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState('');
  const [user, setUser] = useState(null);

  const authLogin = (user, token) => {
    storage.set(auth_token, token);
    storage.set(auth_user, user, 'object');
    storage.set(auth_role, user?.role ?? '');

    setToken(token);
    setUser(user);
    setRole(user?.role ?? '');
  };

  const updateInformationUser = (dataUpdate) => {
    const updatedUser = { ...user, ...dataUpdate };
    storage.set(auth_user, updatedUser, 'object');
    setUser(updatedUser);
  };

  const authLogout = () => {
    setUser(null);
    setToken(null);
    setRole('');

    storage.remove(auth_user);
    storage.remove(auth_token);
    storage.remove(auth_role);
  };

  const getInfo = () => {
    const user = storage.get(auth_user, 'object');
    const token = storage.get(auth_token);
    const role = storage.get(auth_role);

    setUser(user);
    setToken(token);
    setRole(role);
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authLogin,
        authLogout,
        user,
        role,
        token,
        updateInformationUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
