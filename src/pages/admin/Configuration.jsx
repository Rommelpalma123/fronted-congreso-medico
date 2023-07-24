import { useEffect, useState } from 'react';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAdmin } from '@/contexts/AdminContext';

import { Sidebar } from '@/pages/admin/sidebar';

import { showBasicAlert } from '@/helpers/sweetAlert';

import '@/static/base/base.css';

export const ConfigurationPage = () => {
  const { configAppTitle, getAppTitle, appTitle } = useAdmin();

  const [title, setTitle] = useState('');

  useEffect(() => {
    setTitle(getAppTitle());
  }, [appTitle]);

  const handleConfigTitle = () => {
    configAppTitle(title);
    showBasicAlert('Titulo Cambiado!', 'success');
  };

  return (
    <div className='content_base'>
      <Sidebar />
      <div className='contentwithoutsidebar w-100 h-100'>
        <h1 className='mb-5'>
          Configuración <FontAwesomeIcon icon={faGear} />
        </h1>

        <div className='pe-5'>
          <div className='d-flex justify-content-start align-items-center' style={{ gap: 20 }}>
            <label htmlFor='title' className='form-label'>
              Titulo:
            </label>
            <input
              id='title'
              type='text'
              className='form-control p-2'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='Titulo'
            />
            <button
              type='button'
              className='btn btn-success rounded rounded-3 p-2 w-auto'
              onClick={() => handleConfigTitle()}>
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
