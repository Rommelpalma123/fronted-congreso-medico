import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';

import { useLoader } from '@/contexts/LoaderContext';
import { useServer } from '@/contexts/ServerContext';

import { InputForm } from '../InputForm';
import { SelectForm } from '../SelectForm';
import { InputFileForm } from '../InputFileForm';
import { CheckBox } from '../CheckBox';
import { Button } from '../Button';

import { paymentOptions, initFormRegister, participantTypeOptions } from '@/helpers/constants';
import { showBasicAlert } from '@/helpers/sweetAlert';
import { cleanText, validateEmail, validatePassword, validatePhone } from '@/helpers/utils';

import BankImage from '@/assets/images/bank_accounts.png';

export const FormRegister = ({ data = [] }) => {
  const { showLoader, hideLoader } = useLoader();
  const server = useServer();

  const [formValues, setFormValues] = useState(initFormRegister);
  const [courses, setCourses] = useState([]);
  const [total, setTotal] = useState(0);

  const register = async () => {
    formValues.inscriptions = courses.filter((item) => item?.select).map((item) => item._id);

    if (validRegisterForm(formValues)) {
      showLoader();
      try {
        await server.registerParticipant(formValues);
        showBasicAlert('Registro Exitoso!', 'success');
        setFormValues(initFormRegister);
        initCourses();
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

  const validRegisterForm = (data) => {
    const icon = 'warning';

    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        if (key !== 'inscriptions') {
          data[key] = cleanText(data[key]);
        }
      }
    }

    if (data?.name === '') {
      showBasicAlert('Llene sus nombres', icon);
      return false;
    }

    if (data?.lastname === '') {
      showBasicAlert('Llene sus apellidos', icon);
      return false;
    }

    if (data?.cedula === '') {
      showBasicAlert('Llene su cédula/pasaporte', icon);
      return false;
    }

    if (data?.phone === '') {
      showBasicAlert('Llene su celular', icon);
      return false;
    }

    if (!validatePhone(data?.phone)) {
      showBasicAlert('El número celular debe contener solo números', icon);
      return false;
    }

    if (data?.email === '') {
      showBasicAlert('Llene su email', icon);
      return false;
    }

    if (!validateEmail(data?.email)) {
      showBasicAlert('Ingrese un email válido', icon);
      return false;
    }

    if (data?.password === '') {
      showBasicAlert('Llene su contraseña', icon);
      return false;
    }

    if (!validatePassword(data?.password)) {
      showBasicAlert(
        'Ingrese una contraseña segura',
        icon,
        'La contraseña debe tener al menos 8 caracteres, una letra minúscula, una letra mayúscula, un número y un carácter especial'
      );
      return false;
    }

    if (data?.address === '') {
      showBasicAlert('Llene su dirección', icon);
      return false;
    }

    if (data?.company === '') {
      showBasicAlert('Llene sus Empresa/Institución', icon);
      return false;
    }

    if (data?.participantType === '') {
      showBasicAlert('Seleccione un Tipo de Participante', icon);
      return false;
    }

    if (data?.typePayment === '') {
      showBasicAlert('Seleccione un método de pago', icon);
      return false;
    }

    if (data?.inscriptions?.length <= 0) {
      showBasicAlert('Debe inscribirse en algun taller o en el congreso', icon);
      return false;
    }

    if (data?.typePayment === 'transfer' && data?.voucherBase64 === '') {
      showBasicAlert('Suba su comprobante de pago', icon);
      return false;
    }

    return true;
  };

  const handleCheckboxChange = (id, isChecked) => {
    const _courses = courses.map((item) => {
      if (item?._id === id) {
        item.select = isChecked;
      }

      return item;
    });

    setCourses(_courses);
  };

  const initCourses = () => {
    const _courses = data?.map((item) => ({
      ...item,
      select: false,
    }));

    setCourses(_courses);
  };

  useEffect(() => {
    initCourses();
  }, []);

  useEffect(() => {
    const total = courses.reduce((accumulator, current) => {
      if (current.select) {
        return accumulator + current?.price;
      }
      return accumulator;
    }, 0);

    setTotal(total);
  }, [courses]);

  useEffect(() => {
    if (formValues?.participantType !== '') {
      const _courses = courses.map((item) => {
        if (item?.type === 'congress' && item?.congressPrice) {
          item.price = item?.congressPrice[formValues?.participantType] ?? 0;
        }
        return item;
      });
      setCourses(_courses);
    }
  }, [formValues?.participantType]);

  return (
    <div className='w-100  mb-5'>
      <div className='position-sticky top-0'>
        <form
          style={{
            boxShadow: '0px 5px 30px rgba(0, 0, 0, 0.9)',
          }}
          className='border border-dark bg-secondary p-4 w-100 rounded rounded-3 animate__animated animate__fadeInUp animate__slow'
          onSubmit={(e) => e.preventDefault()}>
          <div className='mb-3 d-flex justify-content-center'>
            <h4 className='text-light text-center'>Registro de Participante</h4>
          </div>

          <div className='row'>
            <div className='col-lg-6 col-md-6 col-sm-6 col-12 pe-lg-2 pe-md-1 pe-sm-1'>
              <InputForm
                value={formValues.name}
                placeholder='Nombres'
                onChangeText={(text) => setFormValues({ ...formValues, name: text })}
              />
            </div>

            <div className='col-lg-6 col-md-6 col-sm-6 col-12 ps-lg-2 ps-md-1 ps-sm-1'>
              <InputForm
                value={formValues.lastname}
                placeholder='Apellidos'
                onChangeText={(text) => setFormValues({ ...formValues, lastname: text })}
              />
            </div>
          </div>

          <div className='row'>
            <div className='col-lg-6 col-md-6 col-sm-6 col-12 pe-lg-2 pe-md-1 pe-sm-1'>
              <InputForm
                value={formValues.cedula}
                placeholder='Cédula/Pasaporte'
                onChangeText={(text) => setFormValues({ ...formValues, cedula: text })}
              />
            </div>

            <div className='col-lg-6 col-md-6 col-sm-6 col-12 ps-lg-2 ps-md-1 ps-sm-1'>
              <InputForm
                value={formValues.phone}
                placeholder='Celular'
                onChangeText={(text) => setFormValues({ ...formValues, phone: text })}
              />
            </div>
          </div>

          <div className='row'>
            <div className='col-lg-6 col-md-6 col-sm-6 col-12 pe-lg-2 pe-md-1 pe-sm-1'>
              <InputForm
                value={formValues.email}
                type='email'
                placeholder='Email'
                onChangeText={(text) => setFormValues({ ...formValues, email: text })}
              />
            </div>

            <div className='col-lg-6 col-md-6 col-sm-6 col-12 ps-lg-2 ps-md-1 ps-sm-1'>
              <InputForm
                value={formValues.password}
                placeholder='Contraseña'
                type='password'
                onChangeText={(text) => setFormValues({ ...formValues, password: text })}
                secure
              />
            </div>
          </div>

          <InputForm
            value={formValues.address}
            placeholder='Dirección'
            onChangeText={(text) => setFormValues({ ...formValues, address: text })}
          />

          <InputForm
            value={formValues.company}
            placeholder='Empresa/Institución'
            onChangeText={(text) => setFormValues({ ...formValues, company: text })}
          />

          <div className='row'>
            <div className='col-lg-6 col-md-6 col-sm-6 col-12 pe-lg-2 pe-md-1 pe-sm-1'>
              <SelectForm
                options={participantTypeOptions}
                value={formValues.participantType}
                onChangeValue={(text) => setFormValues({ ...formValues, participantType: text })}
                disableFirstOption
              />
            </div>

            <div className='col-lg-6 col-md-6 col-sm-6 col-12 ps-lg-2 ps-md-1 ps-sm-1'>
              <SelectForm
                options={paymentOptions}
                value={formValues.typePayment}
                onChangeValue={(text) => setFormValues({ ...formValues, typePayment: text })}
                disableFirstOption
              />
            </div>
          </div>

          {courses.length > 0 && (
            <div className='px-2'>
              {courses?.map((item, index) => (
                <CheckBox
                  key={index}
                  label={`${item?.title} - ${item?.price} $`}
                  id={item?._id}
                  checked={item?.select}
                  onChange={handleCheckboxChange}
                />
              ))}
            </div>
          )}

          <div className='w-100 my-2 text-light px-3'>
            <span>Total: {total} $</span>
          </div>

          {formValues.typePayment === 'transfer' && (
            <Fragment>
              <div style={{ width: '100%', height: '350px' }} className='mb-3'>
                <img
                  src={BankImage}
                  alt='Cuentas bancarias'
                  height={'100%'}
                  width={'100%'}
                  className='rounded rounded-3'
                />
              </div>

              <InputFileForm
                acceptFile='image/*'
                onChangeText={(text) => setFormValues({ ...formValues, voucherBase64: text })}
              />
            </Fragment>
          )}

          <Button onClick={() => register()} title='Registrarse' />

          <div className='row mt-2 w-100 p-1 d-flex justify-content-center'>
            <div className='col-12 col-lg-12 col-md-12 col-sm-12'>
              <p className='text-light text-center'>Si ya te registraste </p>
            </div>
            <div className='col-12 col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center'>
              <Link to='/login' className='text-info text-center'>
                Inicia sesión
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
