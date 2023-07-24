import React, { Fragment, useState, useRef, useEffect } from 'react';
import QrReader from 'react-qr-reader';

import { useAuth } from '@/contexts/AuthContext';
import { useLoader } from '@/contexts/LoaderContext';
import { useServer } from '@/contexts/ServerContext';

import { Footer } from '@/components/Footer';

import { showBasicAlert } from '@/helpers/sweetAlert';

export const HomePage = ({}) => {
  // const videoRef = useRef(null);
  const { user, authLogout } = useAuth();
  const { showLoader, hideLoader } = useLoader();
  const server = useServer();

  const [widthScan, setWidthScan] = useState('w-50');
  const [viewMode, setViewMode] = useState('home');
  const [data, setData] = useState(null);

  const handleError = (error) => {
    showBasicAlert('Ocurrio un problema! Intentelo más tarde', 'error');
    console.log('Error de escaner!', error);
  };

  const handleScan = async (data) => {
    if (data) {
      showLoader();
      try {
        const _register = await server.getRegisterById(data);
        setData(_register);
        setViewMode('data');
      } catch (error) {
        console.log(error);
      } finally {
        hideLoader();
      }
    }
  };

  // useEffect(() => {
  //   if (navigator?.mediaDevices && navigator?.mediaDevices?.getUserMedia) {
  //     // Pedir permiso para acceder a la cámara
  //     navigator.mediaDevices
  //       .getUserMedia({ video: true })
  //       .then(function (stream) {
  //         // Mostrar el video de la cámara en un elemento HTML
  //         if (videoRef.current) {
  //           videoRef.current.srcObject = stream;
  //           videoRef.current.play();
  //         }
  //       })
  //       .catch(function (error) {
  //         // Ocurrió un error al acceder a la cámara
  //         console.error('Error al acceder a la cámara:', error);
  //       });
  //   } else {
  //     alert('no');
  //   }
  // }, []);

  const homeView = () => setViewMode('home');

  const registerAsistence = async (inscriptionId) => {
    showLoader();
    try {
      let _data = {
        registerId: data?._id,
        inscriptionId,
      };

      await server.registerAsistance(_data);
      showBasicAlert('Asistencia Confirmada!', 'success');
      homeView();
      setData(null);
    } catch (error) {
      console.log(error?.response?.data?.mensaje);
      showBasicAlert(
        error?.response?.data?.mensaje ?? 'Ocurrio un problema! Intentelo más tarde',
        'error'
      );
    } finally {
      hideLoader();
    }
  };

  useEffect(() => {
    setWidthScan(window.innerWidth <= 576 ? 'w-100' : 'w-50');
  }, []);

  return (
    <div className='min-vh-100 d-flex justify-content-space-between flex-column'>
      <div className=' row bg-dark w-100 text-light p-2'>
        <div className='col-lg-10 col-md-10 col-sm-10 col-12 d-flex justify-content-center align-items-center'>
          <h2 className='p-1 ps-lg-5 text-center'>
            Bienvenido {user?.name ?? ''} {user?.lastname ?? ''}
          </h2>
        </div>

        <div className='col-lg-2 col-md-2 col-sm-2 col-12 d-flex justify-content-center align-items-center'>
          <button className='btn btn-outline-danger p-2' onClick={() => authLogout()}>
            Cerrar Sesión
          </button>
        </div>
      </div>

      <div
        style={{ flex: 1 }}
        className='d-flex justify-content-center flex-column align-items-center'>
        {viewMode === 'home' && (
          <button
            className='btn btn-info py-2 px-3 rounded-pill'
            onClick={() => setViewMode('scan')}>
            Escanear Asistencia
          </button>
        )}

        {viewMode === 'scan' && (
          <Fragment>
            <div className={`border border-success border-2 ${widthScan}`}>
              <QrReader
                delay={300}
                onError={handleError}
                onScan={handleScan}
                onLoad={(data) => console.log('handleLoad', data)}
              />
            </div>
            <button
              className='btn btn-danger mt-3 py-2 px-3 rounded-pill'
              onClick={() => homeView()}>
              Cancelar
            </button>
          </Fragment>
        )}

        {viewMode === 'data' && (
          <Fragment>
            <div className='card'>
              <div className='card-header p-2 text-center bg-dark text-light'>
                <p>
                  {data?.userId?.name} {data?.userId?.lastname}
                </p>
                <b>{data?.userId?.cedula}</b>
              </div>

              <ul className='list-group list-group-flush'>
                {data?.inscriptions.map((item, index) => (
                  <li
                    key={index}
                    className='list-group-item p-2'
                    style={{ cursor: 'pointer' }}
                    onClick={() => registerAsistence(item?._id)}>
                    {item?.courseId?.title}
                  </li>
                ))}
              </ul>

              <div
                className={`card-footer text-center p-1 fw-bold ${
                  data?.status === 'reject'
                    ? 'text-danger'
                    : data?.status === 'paid'
                    ? 'text-success'
                    : data?.status === 'pending'
                    ? 'text-warning'
                    : ''
                }`}>
                {data?.status === 'paid'
                  ? 'Pagado'
                  : data?.status === 'reject'
                  ? 'Pago Rechazado'
                  : data?.status === 'pending'
                  ? 'Pago Pendiente'
                  : ''}
              </div>
            </div>
            <button
              className='btn btn-danger mt-3 py-2 px-3 rounded-pill'
              onClick={() => homeView()}>
              Cancelar
            </button>
          </Fragment>
        )}
      </div>

      <Footer />
    </div>
  );
};
