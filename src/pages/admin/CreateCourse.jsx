import { useState } from 'react';
import { Sidebar } from './sidebar';
import { createCourse } from '@/helpers/constants';
import { showBasicAlert } from '@/helpers/sweetAlert';
import { InputFileForm } from '@/components/InputFileForm';
import { useLoader } from '@/contexts/LoaderContext';
import { useServer } from '@/contexts/ServerContext';
import { useNavigate } from 'react-router-dom';

export const CreateCourse = () => {
  const [form, setForm] = useState(createCourse);
  const { showLoader, hideLoader } = useLoader();
  const server = useServer();
  const navigate = useNavigate();

  const crearCurso = async () => {
    if (validarCurso(form)) {
      showLoader();
      try {
        form.price = parseFloat(parseFloat(form.price).toFixed(2));
        await server.createCourse(form);
        showBasicAlert('Registro Exitoso!', 'success');
        setForm(createCourse);
        navigate('/lista-cursos');
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

  const validarCurso = (data) => {
    const icon = 'warning';

    if (!data?.title) {
      showBasicAlert('Llene el titulo', icon);
      return false;
    }

    if (!data?.type) {
      showBasicAlert('Seleccione un tipo', icon);
      return false;
    }

    if (!data?.startDate) {
      showBasicAlert('Seleccione una fecha de inicio', icon);
      return false;
    }

    if (!data?.endDate) {
      showBasicAlert('Seleccione una fecha de fin', icon);
      return false;
    }

    if (data?.endDate < data?.startDate) {
      showBasicAlert('La fecha de fin no puede ser menor a la de inicio', icon);
      return false;
    }

    if (!data?.photoBase64) {
      showBasicAlert('Suba la imagen que se mostrara en la web', icon);
      return false;
    }

    if (!data?.certificateTemplateBase64) {
      showBasicAlert('Suba la plantilla del certificado', icon);
      return false;
    }

    if (data.type === 'workshop' && !data?.price) {
      showBasicAlert('Ingrese el precio del taller', icon);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className='content_base' style={{ height: '100vh' }}>
      <Sidebar />
      <div className='contentwithoutsidebar2'>
        <div className='contenedorLista'>
          <div className='mt-3'>
            <form onSubmit={handleSubmit} className='row g-3'>
              <div className='col-md-12 p-2'>
                <label className='form-label'>Titulo</label>
                <input
                  value={form.title}
                  type='text'
                  placeholder='Escriba un titulo'
                  className='form-control p-2'
                  onChange={(e) => {
                    setForm({ ...form, title: e.target.value });
                  }}
                />
              </div>
              <div className='col-md-4 mt-2 p-2'>
                <label className='form-label'>Fecha de inicio</label>
                <input
                  type='date'
                  onChange={(e) => {
                    setForm({ ...form, startDate: e.target.value });
                  }}
                  className='form-control p-2'
                  id='inputAddress2'
                />
              </div>
              <div className='col-md-4 mt-2 p-2'>
                <label className='form-label'>Fecha de fin</label>
                <input
                  onChange={(e) => {
                    setForm({ ...form, endDate: e.target.value });
                  }}
                  type='date'
                  className='form-control p-2'
                  id='inputAddress2'
                />
              </div>
              <div className='col-md-4 mt-2 p-2'>
                <label className='form-label'>Tipo</label>
                <select
                  className='p-2 form-select'
                  onChange={(e) => {
                    setForm({ ...form, type: e.target.value });
                  }}>
                  <option value=''>Elige una opción</option>
                  <option value='congress'>Congreso</option>
                  <option value='workshop'>Taller</option>
                </select>
              </div>
              <div className='col-md-4 mt-2 p-2'>
                <label className='form-label'>Imagen</label>
                <InputFileForm
                  value={form.photoBase64}
                  acceptFile='image/*'
                  onChangeText={(base64String) => setForm({ ...form, photoBase64: base64String })}
                />
              </div>
              <div className='col-md-4 mt-2 p-2'>
                <label className='form-label'>Plantilla de Certificado</label>
                <InputFileForm
                  value={form.certificateTemplateBase64}
                  acceptFile='image/*'
                  onChangeText={(base64String) =>
                    setForm({ ...form, certificateTemplateBase64: base64String })
                  }
                />
              </div>
              {form.type === 'workshop' && (
                <div className='col-md-4 mt-2 p-2'>
                  <label className='form-label'>Precio</label>
                  <input
                    onChange={(e) => {
                      setForm({ ...form, price: e.target.value });
                    }}
                    type='number'
                    step='0.01'
                    className='form-control p-2'
                    disabled={form.type === 'congress'}
                  />
                </div>
              )}
              <div className='col-12 mt-2 p-2'>
                <label className='form-label'>Descripción</label>
                <textarea
                  value={form.description}
                  onChange={(e) => {
                    setForm({ ...form, description: e.target.value });
                  }}
                  type='text'
                  className='form-control p-3'
                  id='inputAddress'
                  placeholder='Descripcion'
                />
              </div>
              <button
                type='submit'
                onClick={() => crearCurso()}
                className='btn btn-success p-2 col-2 mt-4 m-2'>
                Crear
              </button>
              <button
                type='submit'
                onClick={() => navigate('/lista-cursos')}
                className='btn btn-danger p-2 col-2 mt-4 m-2'>
                Cancelar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
