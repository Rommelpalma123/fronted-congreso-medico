import { useEffect, useState } from 'react';
import { Sidebar } from './sidebar';
import { showBasicAlert } from '@/helpers/sweetAlert';
import { InputFileForm } from '@/components/InputFileForm';
import { useServer } from '@/contexts/ServerContext';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useLoader } from '@/contexts/LoaderContext';
import { updateCourse } from '@/helpers/constants';

export const UpdateCourse = () => {
  const [updateForm, setUpdateForm] = useState(updateCourse);
  const [currentData, setCurrentData] = useState({ photo: null, certificate: null });

  const server = useServer();
  const { curseId } = useParams();
  const navigate = useNavigate();
  const { showLoader, hideLoader } = useLoader();

  const updateCurse = async () => {
    if (validarCurso(updateForm)) {
      showLoader();
      try {
        const data = {
          title: updateForm.title,
          description: updateForm.description,
          price: parseFloat(parseFloat(updateForm.price).toFixed(2)),
          type: updateForm.type,
          startDate: updateForm.startDate,
          endDate: updateForm.endDate,
        };

        if (updateForm.photoURL !== currentData.photo) {
          data.photoBase64 = updateForm.photoURL;
        }

        if (updateForm.certificateTemplateURL !== currentData.certificate) {
          data.certificateTemplateBase64 = updateForm.certificateTemplateURL;
        }

        await server.updateCourse(curseId, data);
        showBasicAlert('Actializacion Exitosa!', 'success');
        navigate('/lista-cursos');
      } catch (error) {
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

    if (data.endDate < data.startDate) {
      showBasicAlert('La fecha de fin no puede ser menor a la de inicio', icon);
      return false;
    }

    if (data.type === 'workshop' && !data?.price) {
      showBasicAlert('Ingrese el precio del taller', icon);
      return false;
    }
    return true;
  };

  useEffect(() => {
    const fetchCourseById = async () => {
      try {
        const curso = await server.getCourseById(curseId);
        setCurrentData({ photo: curso.photoURL, certificate: curso.certificateTemplateURL });
        setUpdateForm(curso);
      } catch (error) {
        showBasicAlert(error ?? 'Ocurrió un problema! Inténtelo más tarde', 'error');
      }
    };

    fetchCourseById();
  }, [curseId]);  

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
                  value={updateForm.title}
                  type='text'
                  placeholder='Escriba un titulo'
                  className='form-control p-2'
                  onChange={(e) => {
                    setUpdateForm({ ...updateForm, title: e.target.value });
                  }}
                />
              </div>
              <div className='col-md-4 mt-2 p-2'>
                <label className='form-label'>Fecha de inicio</label>
                <input
                  type='date'
                  value={
                    updateForm.startDate
                      ? new Date(updateForm.startDate).toISOString().split('T')[0]
                      : ''
                  }
                  onChange={(e) => {
                    setUpdateForm({ ...updateForm, startDate: e.target.value });
                  }}
                  className='form-control p-2'
                  id='inputAddress2'
                />
              </div>
              <div className='col-md-4 mt-2 p-2'>
                <label className='form-label'>Fecha de fin</label>
                <input
                  value={
                    updateForm.endDate
                      ? new Date(updateForm.endDate).toISOString().split('T')[0]
                      : ''
                  }
                  onChange={(e) => {
                    setUpdateForm({ ...updateForm, endDate: e.target.value });
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
                    setUpdateForm({ ...updateForm, type: e.target.value });
                  }}
                  value={updateForm.type}>
                  <option value='congress'>Congreso</option>
                  <option value='workshop'>Taller</option>
                </select>
              </div>
              <div className='col-md-4 mt-2 p-2'>
                <label className='form-label'>Imagen</label>
                <InputFileForm
                  acceptFile='image/*'
                  onChangeText={(base64String) =>
                    setUpdateForm({ ...updateForm, photoURL: base64String })
                  }
                />
              </div>
              <div className='col-md-4 mt-2 p-2'>
                <label className='form-label'>Plantilla de Certificado</label>
                <InputFileForm
                  acceptFile='image/*'
                  onChangeText={(base64String) =>
                    setUpdateForm({ ...updateForm, certificateTemplateURL: base64String })
                  }
                />
              </div>
              <div className='col-md-4 mt-2 p-2'>
                <label className='form-label'>Precio</label>
                <input
                  value={updateForm.price}
                  onChange={(e) => {
                    setUpdateForm({ ...updateForm, price: e.target.value });
                  }}
                  type='number'
                  className='form-control p-2'
                  disabled={updateForm.type === 'congress'}
                />
              </div>
              <div className='col-12 mt-2 p-2'>
                <label className='form-label'>Descripción</label>
                <textarea
                  value={updateForm.description}
                  onChange={(e) => {
                    setUpdateForm({ ...updateForm, description: e.target.value });
                  }}
                  type='text'
                  className='form-control p-3'
                  id='inputAddress'
                  placeholder='Descripcion'
                />
              </div>
              <button
                onClick={() => updateCurse()}
                type='submit'
                className='btn btn-success p-2 col-2 mt-4 m-2'>
                Actualizar
              </button>
              <button
                type='submit'
                onClick={() => navigate('/lista-cursos')}
                className='btn btn-danger p-2 col-2 mt-4 m-2'>
                Regresar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
