import { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import moment from 'moment';
import html2canvas from 'html2canvas';
import '@/static/styles/layout.css';

import { useServer } from '@/contexts/ServerContext';
import { useLoader } from '@/contexts/LoaderContext';

import { upperFirstWord } from '@/helpers/utils';

import congreso from '@/assets/images/congreso.png';
import uleam from '@/assets/images/uleam.png';
import zulia from '@/assets/images/zulia.png';
import qrBlank from '@/assets/images/qr_blank.png';

export const Register = () => {
  const server = useServer();
  const { showLoader, hideLoader } = useLoader();

  const [registers, setRegisters] = useState([]);

  const getAllRegisterByUer = async () => {
    showLoader();
    try {
      const data = await server.GetAllRegisterByUser();
      setRegisters(data);
    } catch (error) {
      console.log(error);
      setRegisters([]);
    } finally {
      hideLoader();
    }
  };

  const downloadImage = async () => {
    try {
      const screen = document.getElementById('card');
      const canvas = await html2canvas(screen);
      const base64 = canvas.toDataURL('image/png');
      const anchor = document.createElement('a');
      anchor.setAttribute('href', base64);
      anchor.setAttribute('download', 'registro.png');
      anchor.click();
    } catch (error) {
      console.log('Error al descargar la imagen:', error);
    }
  };

  useEffect(() => {
    getAllRegisterByUer();
  }, []);

  return (
    <div className='contenedor-registro'>
      <h4 className='text-center mt-4 text-white'>
        <b>Registros</b>
      </h4>
      <div className='row py-4 estilo-movil'>
        {registers?.length > 0 &&
          registers.map((registro, index) => (
            <div key={index} className='px-4 py-2 col-lg-6 col-md-12 col-sm-12 col-12'>
              <div className='bg-light  p-3 pb-lg-3 pb-md-3 pb-sm-3 pb-0 rounded-top' id='card'>
                <div className='text-center p-2'>
                  <h2 className='fs-4'>2DO Congreso Internacional en Especialidades Médicas</h2>
                </div>

                <div className='row'>
                  <div className='col-4 d-flex justify-content-center align-items-center'>
                    <img
                      className='imagen-registro'
                      src={congreso}
                      alt='logo'
                      style={{
                        height: '80px',
                        width: '80px',
                      }}
                    />
                  </div>

                  <div className='col-4 d-flex justify-content-center align-items-center'>
                    <img
                      className='imagen-registro'
                      src={uleam}
                      alt='logo-uleam'
                      style={{
                        height: '80px',
                        width: '120px',
                      }}
                    />
                  </div>

                  <div className='col-4 d-flex justify-content-center align-items-center'>
                    <img
                      className='imagen-registro'
                      src={zulia}
                      alt='logo-zulia'
                      style={{
                        height: '60px',
                        width: '120px',
                      }}
                    />
                  </div>
                </div>

                <div className='row py-3'>
                  <div className='col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12 d-flex justify-content-center'>
                    {registro?.status === 'paid' && (
                      <QRCode
                        value={registro?._id}
                        size={200}
                        fgColor='#000000'
                        bgColor='#FFFFFF'
                      />
                    )}

                    {registro?.status !== 'paid' && (
                      <div>
                        <img
                          className='imagen-registro'
                          src={qrBlank}
                          alt='qr'
                          style={{
                            height: '200px',
                            width: '200px',
                          }}
                        />
                      </div>
                    )}
                  </div>

                  <div className='col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12 d-flex justify-content-center flex-column'>
                    <p className='text-center fw-bold'>Incripciones</p>
                    <ul className='text-center'>
                      {registro?.inscriptions?.length > 0 ? (
                        registro.inscriptions.map((curso, index) => (
                          <li key={index}>- {curso.courseId?.title}</li>
                        ))
                      ) : (
                        <li>Sin Inscripciones</li>
                      )}
                    </ul>

                    <p className='fs-6 text-center mt-3'>
                      Nombre:
                      <span className='fs-6 text-dark ms-1 fw-bold'>
                        {upperFirstWord(registro?.userId?.name) +
                          ' ' +
                          upperFirstWord(registro?.userId?.lastname)}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className='bg-light p-3 rounded-bottom'>
                <div className='row'>
                  <div className='col-xl-6 col-lg-12 col-md-6 col-sm-6 col-12'>
                    <p className='fs-6'>
                      Fecha:
                      <span className='fs-6 text-success ms-1'>
                        {registro?.createdAt
                          ? moment(registro?.createdAt).format('DD/MM/YYYY')
                          : ''}
                      </span>
                    </p>
                  </div>

                  <div className='col-xl-6 col-lg-12 col-md-6 col-sm-6 col-12'>
                    <p className='fs-6'>
                      Estado:
                      <span
                        className={`fs-6 ms-1 ${
                          registro?.status === 'reject'
                            ? 'text-danger'
                            : registro?.status === 'paid'
                            ? 'text-success'
                            : registro?.status === 'pending'
                            ? 'text-warning'
                            : ''
                        }`}>
                        {registro?.status === 'reject'
                          ? 'Rechazado'
                          : registro?.status === 'paid'
                          ? 'Pagado'
                          : registro?.status === 'pending'
                          ? 'Pendiente'
                          : ''}
                      </span>
                    </p>
                  </div>
                </div>

                <div className='row'>
                  <div className='col-xl-6 col-lg-12 col-md-6 col-sm-6 col-12'>
                    <p className='fs-6'>
                      Tipo de pago:
                      <span className='fs-6 text-success ms-1'>
                        {registro?.typePayment === 'transfer'
                          ? 'Transferencia'
                          : registro?.typePayment === 'efective'
                          ? 'Efectivo'
                          : ''}
                      </span>
                    </p>
                  </div>

                  <div className='col-xl-6 col-lg-12 col-md-6 col-sm-6 col-12'>
                    <p className='fs-6'>
                      Total:
                      <span className='fs-6 text-success ms-1'>{`$${registro?.total}`}</span>
                    </p>
                  </div>
                </div>

                <div className='row'>
                  <div className='col-12'>
                    <button
                      onClick={() => downloadImage()}
                      className='btn btn-success p-2 w-100 my-1'>
                      Descargar Registro
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      {registers?.length <= 0 && (
        <div className='m-3 alert alert-info p-2 ' role='alert'>
          <h3 className='text-center text-dark' style={{ marginRight: '50px' }}>
            Sin Registros!
          </h3>
        </div>
      )}
    </div>
  );
};
