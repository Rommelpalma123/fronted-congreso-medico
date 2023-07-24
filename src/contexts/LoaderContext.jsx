import React, { createContext, useContext, useState } from 'react';

import { Loader } from '@/components/Loader';

export const loaderContext = createContext(null);

export const useLoader = () => useContext(loaderContext);

export const LoaderProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);

  const showLoader = () => setVisible(true);

  const hideLoader = () => setVisible(false);

  return (
    <loaderContext.Provider value={{ showLoader, hideLoader }}>
      {visible && <Loader />}

      {children}
    </loaderContext.Provider>
  );
};
