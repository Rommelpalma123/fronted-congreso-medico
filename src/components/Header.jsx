import React, { useState, useEffect } from 'react';

import { useAdmin } from '@/contexts/AdminContext';

export const Header = () => {
  const { getAppTitle, appTitle } = useAdmin();

  const [title, setTitle] = useState('');

  useEffect(() => {
    setTitle(getAppTitle());
  }, [appTitle]);

  return (
    <div className='row mb-4'>
      <div className='col-sm-12 d-flex justify-content-center p-3 bg-dark w-100 text-light text-center'>
        <h2>{title !== '' ? title : '2DO Congreso Internacional en Especialidades Médicas'}</h2>
      </div>
    </div>
  );
};
