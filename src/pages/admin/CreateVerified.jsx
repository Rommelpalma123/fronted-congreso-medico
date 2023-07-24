import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useLoader } from '@/contexts/LoaderContext';
import { useServer } from '@/contexts/ServerContext';

import { Sidebar } from './sidebar';

import { createVerified } from '@/helpers/constants';
import { showBasicAlert } from '@/helpers/sweetAlert';
import { validateEmail, cleanText } from '@/helpers/utils';

export const CreateVerified = () => {
  const navigate = useNavigate();
  const { showLoader, hideLoader } = useLoader();
  const server = useServer();

  const [form, setForm] = useState(createVerified);

  const validateVerified = (data) => {
    const icon = 'warning';

    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        data[key] = cleanText(data[key]);
      }
    }

    if (data?.name === '') {
      showBasicAlert('Llene el nombre', icon);
      return false;
    }

    if (data?.lastname === '') {
      showBasicAlert('Llene los apellidos', icon);
      return false;
    }

    if (data?.phone === '') {
      showBasicAlert('Llene el telefóno', icon);
      return false;
    }

    if (data?.email === '') {
      showBasicAlert('Llene el email', icon);
      return false;
    }

    if (!validateEmail(data?.email)) {
      showBasicAlert('El email que ingreso no es un email válido', icon);
      return false;
    }

    if (data?.address === '') {
      showBasicAlert('Llene su dirección', icon);
      return false;
    }

    if (data?.cedula === '') {
      showBasicAlert('Llene la cédula/pasaporte', icon);
      return false;
    }

    if (data?.company === '') {
      showBasicAlert('Llene la Institución', icon);
      return false;
    }

    return true;
  };

  const registerVerified = async () => {
    if (validateVerified(form)) {
      showLoader();
      try {
        await server.registerVerifier(form);
        showBasicAlert('Registro Exitoso!', 'success');
        setForm(createVerified);
      } catch (error) {
        console.log(error?.response?.data?.mensaje);
        showBasicAlert(
          error?.response?.data?.mensaje ?? 'Ocurrio un problema! Intentelo más tarde',
          'error'
        );
      } finally {
        hideLoader();
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div style={{ height: '100vh' }}>
      <Sidebar />
      <div className='contentwithoutsidebar3'>
        <div className='items-movil'>
          <div className='mt-3'>
            <form className='row g-3' onSubmit={handleSubmit}>
              <div className='col-md-4 p-2'>
                <label className='form-label'>Nombres</label>
                <input
                  value={form.name}
                  type='text'
                  placeholder='Escriba el nombre'
                  className='form-control p-2'
                  onChange={(e) => {
                    setForm({ ...form, name: e.target.value });
                  }}
                />
              </div>
              <div className='col-md-4 mt-2 p-2'>
                <label className='form-label'>Apellidos</label>
                <input
                  value={form.lastname}
                  type='text'
                  placeholder='Escriba los apellidos'
                  onChange={(e) => {
                    setForm({ ...form, lastname: e.target.value });
                  }}
                  className='form-control p-2'
                />
              </div>
              <div className='col-md-4 mt-2 p-2'>
                <label className='form-label'>Teléfono</label>
                <input
                  value={form.phone}
                  placeholder='Escriba el teléfono'
                  onChange={(e) => {
                    setForm({ ...form, phone: e.target.value });
                  }}
                  type='number'
                  className='form-control p-2'
                />
              </div>
              <div className='col-md-4 mt-2 p-2'>
                <label className='form-label'>Email</label>
                <input
                  value={form.email}
                  placeholder='Escriba un email'
                  onChange={(e) => {
                    setForm({ ...form, email: e.target.value });
                  }}
                  type='email'
                  className='form-control p-2'
                />
              </div>
              <div className='col-md-4 mt-2 p-2'>
                <label className='form-label'>Dirección</label>
                <input
                  value={form.address}
                  placeholder='Escriba la Dirección'
                  onChange={(e) => {
                    setForm({ ...form, address: e.target.value });
                  }}
                  type='text'
                  className='form-control p-2'
                />
              </div>
              <div className='col-md-4 mt-2 p-2'>
                <label className='form-label'>Cédula/Pasaporte</label>
                <input
                  value={form.cedula}
                  placeholder='Escriba la Cédula o pasaporte'
                  onChange={(e) => {
                    setForm({ ...form, cedula: e.target.value });
                  }}
                  type='text'
                  className='form-control p-2'
                />
              </div>
              <div className='col-md-4 mt-2 p-2'>
                <label className='form-label'>Institución</label>
                <input
                  className='form-control p-2'
                  value={form.company}
                  placeholder='Escriba la institución'
                  type='text'
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                />
              </div>
              <div>
                <button
                  type='button'
                  onClick={() => registerVerified()}
                  className='btn btn-success p-2 col-2 mt-4 m-2'>
                  Crear
                </button>
                <button
                  type='button'
                  onClick={() => navigate('/lista-verificados')}
                  className='btn btn-danger p-2 col-2 mt-4 m-2'>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
