import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useLoader } from '@/contexts/LoaderContext';
import { useServer } from '@/contexts/ServerContext';

import { InputForm } from '../InputForm';
import { Button } from '../Button';

import { showBasicAlert } from '@/helpers/sweetAlert';
import { cleanText, validateEmail, validatePassword, validateRecoveryCode } from '@/helpers/utils';
import { initFormRecoveryPassword } from '@/helpers/constants';

export const FormRecoveryPassword = () => {
  const { showLoader, hideLoader } = useLoader();
  const server = useServer();
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [formValues, setFormValues] = useState(initFormRecoveryPassword);

  const searchEmail = async () => {
    if (validateFormatEmail(formValues.email)) {
      showLoader();
      try {
        await server.recoveryPasswordSendCode({ email: formValues.email });
        showBasicAlert('Revise su bandeja de entrada o el spam!', 'success');
        setStep(1);
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

  const validateFormatEmail = (email) => {
    const icon = 'warning';

    email = cleanText(email);

    if (email === '') {
      showBasicAlert('Llene su email', icon);
      return false;
    }

    if (!validateEmail(email)) {
      showBasicAlert('Email Inválido', icon);
      return false;
    }

    return true;
  };

  const changePassword = async () => {
    if (validateRecoveryForm(formValues)) {
      showLoader();
      try {
        let _data = { ...formValues, codeChangePassword: parseInt(formValues.codeChangePassword) };
        await server.recoveryPassword(_data);
        showBasicAlert('Contraseña cambiada exitosamente!', 'success');
        setFormValues(initFormRecoveryPassword);
        navigate('/login');
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

  const validateRecoveryForm = (data) => {
    const icon = 'warning';

    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        data[key] = cleanText(data[key]);
      }
    }

    if (data?.codeChangePassword === '') {
      showBasicAlert('Llene el código de recuperación', icon);
      return false;
    }

    if (!validateRecoveryCode(data?.codeChangePassword)) {
      showBasicAlert('Código de recuperación inválido', icon);
      return false;
    }

    if (data?.newPassword === '') {
      showBasicAlert('Llene la contraseña', icon);
      return false;
    }

    if (!validatePassword(data?.newPassword)) {
      showBasicAlert(
        'Ingrese una contraseña segura',
        icon,
        'La contraseña debe tener al menos 8 caracteres, una letra minúscula, una letra mayúscula, un número y un carácter especial'
      );
      return false;
    }

    return true;
  };

  return (
    <div className='row d-flex justify-content-center pt-5 animate__animated animate__fadeInUp animate__slow'>
      <div className='col-lg-3 col-md-4 col-sm-6 col-9'>
        <form
          style={{
            boxShadow: '0px 5px 30px rgba(0, 0, 0, 0.9)',
          }}
          className='border border-dark bg-secondary p-4 rounded rounded-3'
          onSubmit={(e) => e.preventDefault()}>
          {step === 0 && (
            <Fragment>
              <div className='mb-3 d-flex justify-content-center flex-column'>
                <h4 className='text-light text-center'>Busca tu cuenta</h4>
                <p className='text-center'>Ingrese su correo electrónico para buscar su cuenta.</p>
              </div>

              <InputForm
                value={formValues.email}
                type='email'
                placeholder='Email'
                onChangeText={(text) => setFormValues({ ...formValues, email: text })}
              />

              <div className='d-flex justify-content-center align-items-center' style={{ gap: 20 }}>
                <Button onClick={() => navigate('/login')} title='Cancelar' btnColor='btn-danger' />
                <Button onClick={() => searchEmail()} title='Buscar' btnColor='btn-info' />
              </div>
            </Fragment>
          )}

          {step === 1 && (
            <Fragment>
              <div className='mb-3 d-flex justify-content-center flex-column'>
                <h4 className='text-light text-center'>Cambie la contraseña</h4>
                <p className='text-center'>
                  Ingrese el código que le llego a su correo electrónico y su nueva contraseña.
                </p>
              </div>

              <InputForm
                value={formValues.codeChangePassword}
                type='number'
                placeholder='Código'
                onChangeText={(text) => setFormValues({ ...formValues, codeChangePassword: text })}
              />

              <InputForm
                value={formValues.newPassword}
                type='password'
                placeholder='Nueva contraseña'
                secure
                onChangeText={(text) => setFormValues({ ...formValues, newPassword: text })}
              />

              <div className='d-flex justify-content-center align-items-center' style={{ gap: 20 }}>
                <Button onClick={() => setStep(0)} title='Cancelar' btnColor='btn-danger' />
                <Button onClick={() => changePassword()} title='Enviar' btnColor='btn-primary' />
              </div>
            </Fragment>
          )}
        </form>
      </div>
    </div>
  );
};
