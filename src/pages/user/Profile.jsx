import { useState } from 'react';

import { CgProfile, CgOrganisation } from 'react-icons/cg';
import { MdLocationPin } from 'react-icons/md';
import { BsPhoneFill } from 'react-icons/bs';
import { HiOutlineIdentification } from 'react-icons/hi';
import { RiProfileLine } from 'react-icons/ri';

import { FiEdit } from 'react-icons/fi';
import { MdSave } from 'react-icons/md';
import { MdEmail } from 'react-icons/md';

import { useAuth } from '@/contexts/AuthContext';
import { useServer } from '@/contexts/ServerContext';
import { useLoader } from '@/contexts/LoaderContext';

import { InfoProfile } from '@/components/user/InfoProfile';

import { showBasicAlert } from '@/helpers/sweetAlert';
import { upperFirstWord } from '@/helpers/utils';

import '@/static/styles/layout.css';

export const Profile = () => {
  const { user, updateInformationUser } = useAuth();
  const { showLoader, hideLoader } = useLoader();
  const server = useServer();

  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const updateProfile = async () => {
    showLoader();
    try {
      const data = {
        name: editedUser.name,
        lastname: editedUser.lastname,
        address: editedUser.address,
        company: editedUser.company,
        phone: editedUser.phone,
        cedula: editedUser.cedula,
        email: editedUser.email,
      };
      const updateUser = await server.updatedUser(data);
      updateInformationUser(updateUser);
      showBasicAlert('Actializacion Exitosa!', 'success');
    } catch (error) {
      console.log(error);
      showBasicAlert(
        error?.response?.data?.mensaje ?? 'Ocurrio un problema! Intentelo más tarde',
        'error'
      );
    } finally {
      hideLoader();
      setEditMode(false);
    }
  };

  return (
    <div className='page-proflie'>
      <InfoProfile name={upperFirstWord(user?.name)} />
      <div className='row mt-2 justify-content-center'>
        <div className='col-sm-12 px-lg-5'>
          <div className='alerta card m-3 mt-4'>
            <div className='card-header m-1 p-2'>Informacion Personal</div>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className='card-body'>
                <div className='row row-cols-1 row-cols-md-2 row-cols-lg-2 ow-cols-xl-2'>
                  <div className='col-lg-4 col-xl-2 col-md-4 col-12 p-1'>
                    <b className='input-group-text p-1 fs-5'>
                      <div>
                        <CgProfile className='fs-4 text-info m-1' />
                      </div>
                      Nombre
                    </b>
                  </div>
                  <div className='col-lg-8 col-xl-10 col-md-8 col-12 p-1'>
                    <input
                      onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                      value={upperFirstWord(editedUser?.name)}
                      className='form-control p-1 fs-5'
                      type='text'
                      disabled={!editMode}
                    />
                  </div>
                </div>
                <div className='row row-cols-1 row-cols-md-2'>
                  <div className='col-lg-4 col-xl-2 col-md-4 col-12 p-1'>
                    <b className='input-group-text p-1 fs-5'>
                      <RiProfileLine className='fs-4 text-info m-1' />
                      <div></div>
                      Apellido
                    </b>
                  </div>
                  <div className='col-lg-8 col-xl-10 col-md-8 col-12 p-1'>
                    <input
                      onChange={(e) => setEditedUser({ ...editedUser, lastname: e.target.value })}
                      value={upperFirstWord(editedUser?.lastname)}
                      className='form-control p-1 fs-5 '
                      type='text'
                      disabled={!editMode}
                    />
                  </div>
                </div>

                <div className='row row-cols-1 row-cols-md-2'>
                  <div className='col-lg-4 col-xl-2 col-md-4 col-12 p-1'>
                    <b className='input-group-text p-1 fs-5'>
                      <div>
                        <MdLocationPin className='fs-4 text-success m-1' />
                      </div>
                      Direccion
                    </b>
                  </div>
                  <div className='col-lg-8 col-xl-10 col-md-8 col-12 p-1'>
                    <input
                      onChange={(e) => setEditedUser({ ...editedUser, address: e.target.value })}
                      value={upperFirstWord(editedUser?.address)}
                      className='form-control p-1 fs-5'
                      type='text'
                      disabled={!editMode}
                    />
                  </div>
                </div>

                <div className='row row-cols-1 row-cols-md-2'>
                  <div className='col-lg-5 col-xl-3 col-md-6 col-12 p-1'>
                    <b className='input-group-text p-1 fs-5'>
                      <div>
                        <CgOrganisation className='fs-4 text-secondary m-1' />
                      </div>
                      Empresa/Institucion
                    </b>
                  </div>
                  <div className='col-lg-7 col-xl-9 col-md-6 col-12 p-1'>
                    <input
                      onChange={(e) => setEditedUser({ ...editedUser, company: e.target.value })}
                      value={editedUser?.company}
                      className='form-control p-1 fs-5'
                      type='text'
                      disabled={!editMode}
                    />
                  </div>
                </div>

                <div className='row row-cols-1 row-cols-md-2'>
                  <div className='col-lg-4 col-xl-2 col-md-4 col-12 p-1'>
                    <b className='input-group-text p-1 fs-5'>
                      <div>
                        <BsPhoneFill className='fs-4 text-warning m-1' />
                      </div>
                      Telefono
                    </b>
                  </div>
                  <div className='col-lg-8 col-xl-10 col-md-8 col-12 p-1'>
                    <input
                      onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })}
                      value={editedUser?.phone}
                      className='form-control p-1 fs-5'
                      type='text'
                      disabled={!editMode}
                    />
                  </div>
                </div>

                <div className='row row-cols-1 row-cols-md-2'>
                  <div className='col-lg-4 col-xl-2 col-md-4 col-12 p-1'>
                    <b className='input-group-text p-1 fs-5'>
                      <div>
                        <HiOutlineIdentification className='fs-4 text-primary m-1' />
                      </div>
                      Cedula
                    </b>
                  </div>
                  <div className='col-lg-8 col-xl-10 col-md-8 col-12 p-1'>
                    <input
                      onChange={(e) => setEditedUser({ ...editedUser, cedula: e.target.value })}
                      value={editedUser?.cedula}
                      className='form-control p-1 fs-5'
                      type='text'
                      disabled={!editMode}
                    />
                  </div>
                </div>

                <div className='row row-cols-1 row-cols-md-2'>
                  <div className='col-lg-4 col-xl-2 col-md-4 col-12 p-1'>
                    <b className='input-group-text p-1 fs-5'>
                      <div>
                        <MdEmail className='fs-4 text-primary m-1' />
                      </div>
                      Email
                    </b>
                  </div>
                  <div className='col-lg-8 col-xl-10 col-md-8 col-12 p-1'>
                    <input
                      onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                      value={editedUser?.email}
                      className='form-control p-1 fs-5'
                      type='text'
                      disabled={!editMode}
                    />
                  </div>
                </div>
              </div>
            </form>
            <div className='d-flex justify-content-around'>
              {editMode ? (
                <button
                  type='button'
                  className='mt-2 mb-2 btn btn-success p-2'
                  onClick={async () => await updateProfile()}>
                  <MdSave className='fs-5' /> Guardar
                </button>
              ) : (
                <button
                  type='button'
                  className='mt-2 mb-2 btn btn-info p-2'
                  onClick={() => setEditMode(true)}>
                  <FiEdit className='fs-5' /> Editar
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
