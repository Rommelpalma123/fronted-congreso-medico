import { useState } from 'react';
import { Sidebar } from './sidebar';
import { GoVerified } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import { updateVeri } from '@/mock/verified';

export const UpdateVerified = () => {
  const [updateVerified, setUpdateVerified] = useState(updateVeri);
  const navigate = useNavigate();

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
                <label className='form-label'>Nombre</label>
                <input
                  type='text'
                  placeholder='Escriba un titulo'
                  className='form-control p-2'
                  value={updateVerified.name}
                  onChange={(e) => {
                    setForm({ ...updateVerified, name: e.target.value });
                  }}
                />
              </div>
              <div className='col-md-4 mt-2 p-2'>
                <label className='form-label'>Apellido</label>
                <input
                  type='text'
                  value={updateVerified.lastname}
                  placeholder='Escriba sus apellidos'
                  onChange={(e) => {
                    setForm({ ...updateVerified, lastname: e.target.value });
                  }}
                  className='form-control p-2'
                />
              </div>
              <div className='col-md-4 mt-2 p-2'>
                <label className='form-label'>Telefono</label>
                <input
                  placeholder='Escriba su telefono movil'
                  value={updateVerified.phone}
                  onChange={(e) => {
                    setForm({ ...updateVerified, phone: e.target.value });
                  }}
                  type='text'
                  className='form-control p-2'
                />
              </div>
              <div className='col-md-4 mt-2 p-2'>
                <label className='form-label'>Email</label>
                <input
                  placeholder='Escriba un correo'
                  value={updateVerified.email}
                  onChange={(e) => {
                    setForm({ ...updateVerified, email: e.target.value });
                  }}
                  type='email'
                  className='form-control p-2'
                />
              </div>
              <div className='col-md-4 mt-2 p-2'>
                <label className='form-label'>Direccion</label>
                <input
                  placeholder='Direccion'
                  value={updateVerified.address}
                  onChange={(e) => {
                    setForm({ ...updateVerified, address: e.target.value });
                  }}
                  type='text'
                  className='form-control p-2'
                />
              </div>
              <div className='col-md-4 mt-2 p-2'>
                <label className='form-label'>Cedula/Pasaporte</label>
                <input
                  placeholder='Escriba su cedula'
                  value={updateVerified.identification}
                  onChange={(e) => {
                    setForm({ ...updateVerified, identification: e.target.value });
                  }}
                  type='email'
                  className='form-control p-2'
                />
              </div>
              <div className='col-md-4 mt-2 p-2'>
                <label className='form-label'>Contraseña</label>
                <input
                  placeholder={`contraseña`}
                  onChange={(e) => {
                    setForm({ ...updateVerified, password: e.target.value });
                  }}
                  disabled={true}
                  type='password'
                  className='form-control p-2'
                />
              </div>
              <div>
                <button
                  type='submit'
                  //onClick={() => updateVerified()}
                  className='btn btn-success p-2 col-2 mt-4 m-2'>
                  Crear
                </button>
                <button
                  type='submit'
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
