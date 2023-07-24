import { useState, useEffect } from 'react';

import { useServer } from '@/contexts/ServerContext';
import { useLoader } from '@/contexts/LoaderContext';

import { see, showBasicAlert } from '@/helpers/sweetAlert';

export const Certificate = () => {
  const server = useServer();
  const { showLoader, hideLoader } = useLoader();

  const [certificates, setCertificates] = useState([]);

  const mostrarCertificado = (photoURL) => {
    if (photoURL === null || photoURL === undefined) {
      showBasicAlert('Certificado aun no disponible!', 'error');
      return;
    }

    see('', photoURL, '90%', '500px', '900px');
  };

  const downloadCertificate = async (photoURL) => {
    try {
      if (photoURL === null || photoURL === undefined) {
        throw new Error('Certificado aun no disponible!');
      }
      const response = await fetch(photoURL);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'certificado.png');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showBasicAlert('Certificado Descargado!', 'success');
    } catch (error) {
      showBasicAlert(error?.message ?? 'Error al descargar el certificado', 'error');
      console.log(error);
    }
  };

  const getAllCertificatesByUer = async () => {
    showLoader();
    try {
      const data = await server.GetAllRegisterByUser();

      const _inscriptions = [];

      data.forEach((item) => {
        item.inscriptions.forEach((element) => {
          if (element?.attendanceDate?.length > 0) {
            _inscriptions.push(element);
          }
        });
      });

      setCertificates(_inscriptions);
    } catch (error) {
      console.log(error);
    } finally {
      hideLoader();
    }
  };

  useEffect(() => {
    getAllCertificatesByUer();
  }, []);

  return (
    <div className='justificar-contenedor-certificado'>
      <h4 className='text-center mt-4 text-white'>
        <b>Certificados</b>
      </h4>

      <div className='row px-xl-5 px-lg-5 px-3 py-4'>
        {certificates?.map((item, index) => (
          <div key={index} className='p-2 col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12'>
            <div className='card p-3 d-flex justify-content-between align-items-center flex-column h-100'>
              <h5 className='card-title text-center mb-1'>{item?.courseId?.title}</h5>
              <div
                className='w-100 d-flex justify-content-between align-items-center row'
                style={{ gap: 10 }}>
                <div className='col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'>
                  <button
                    type='button'
                    onClick={() => mostrarCertificado(item?.certificateURL)}
                    className='btn btn-info rounded rounded-3 p-1 w-100'>
                    Ver Certificado
                  </button>
                </div>
                <div className='col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'>
                  <button
                    type='button'
                    className='btn btn-success rounded rounded-3 p-1 w-100'
                    onClick={() => downloadCertificate(item?.certificateURL)}>
                    Descargar Certificado
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {certificates?.length <= 0 && (
          <div className='m-3 alert alert-info p-2' role='alert'>
            <h3 className='text-center text-dark'>Sin Certificados!</h3>
          </div>
        )}
      </div>
    </div>
  );
};
