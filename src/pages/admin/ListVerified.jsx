import DataTable from 'react-data-table-component';
import { useServer } from '@/contexts/ServerContext';
import { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useLoader } from '@/contexts/LoaderContext';
import { Sidebar } from './sidebar';
import { GoVerified } from 'react-icons/go';
import { MdAddToPhotos } from 'react-icons/md';

import '@/static/base/base.css';

export const ListVerified = () => {
  const useserverapi = useServer();

  const { showLoader, hideLoader } = useLoader();
  const [regsters, setregisters] = useState([]);
  const [dnifilter, setdnfilter] = useState(regsters);

  const getData = async () => {
    showLoader();
    try {
      const datos = await useserverapi.getAllUser();
      const usuarios = datos?.filter((user) => user?.role === 'verifier');
      setregisters(usuarios);
      setdnfilter(usuarios);
    } catch (error) {
      console.log(error);
      showBasicAlert(
        error?.response?.data?.mensaje ?? 'Ocurrio un problema! Intentelo más tarde',
        'error'
      );
    } finally {
      hideLoader();
    }
  };

  const searchByDni = (event) => {
    const dnifilter = regsters.filter((dni) => {
      if (dni.cedula !== null && dni.cedula !== undefined) {
        return dni.cedula.startsWith(event.target.value);
      }
    });
    setdnfilter(dnifilter);
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      name: 'Cédula/P.',
      selector: (row) => row?.cedula ?? '',
      sortable: true,
      width: '100px ',
    },
    {
      name: 'Nombre',
      selector: (row) => row?.name + ' ' + row?.lastname ?? '',
      sortable: true,
      width: 'auto',
    },
    {
      name: 'Correo',
      selector: (row) => row?.email ?? '',
      sortable: true,
      width: '250px',
    },
    {
      name: 'Teléfono',
      selector: (row) => row?.phone ?? '',
      sortable: true,
      width: '100px',
    },
    {
      name: 'Dirección',
      selector: (row) => row?.address ?? '',
      sortable: true,
      width: '220px',
    },

    {
      name: 'Empresa/Institución',
      selector: (row) => row?.company,
      sortable: true,
      width: '240px',
    },
  ];

  const customStyles = {
    headRow: {
      style: {
        color: 'white',
        backgroundColor: 'black',
        fontSize: '15px',
      },
    },
    pagination: {
      style: {
        display: 'grid',
        gridTemplateColumns: 'auto auto auto auto',
        gap: '20px',
        alignItems: 'center',
        marginTop: '10px',
      },
    },
  };

  const paginationComponentOptions = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
  };

  return (
    <div style={{ height: '100vh' }}>
      <Sidebar />
      <div className='contentwithoutsidebar3'>
        <div className='items-movil'>
          <h1 style={{ fontWeight: '500', fontSize: '2rem', color: '#212529' }}>
            Verificadores <GoVerified className='text-dark fs-1' />
          </h1>
          <div className='selector-items'>
            <Link to='/crear-verificador' className='btn btn-success p-3'>
              <MdAddToPhotos className='fs-4' /> Crear Verificador
            </Link>
            <div className='mt-2 mb-2 col-sm-4 d-flex'>
              <input
                onChange={searchByDni}
                type='text'
                className='form-control p-2'
                placeholder='Buscar por Cédula/Pasaporte'
              />
            </div>
            {dnifilter.length > 0 ? (
              <Fragment>
                <DataTable
                  columns={columns}
                  striped
                  highlightOnHover
                  selectableRowsComponent={() => <div></div>}
                  fixedHeader
                  data={dnifilter}
                  customStyles={customStyles}
                  selectableRows
                  pagination
                  paginationComponentOptions={paginationComponentOptions}
                />
                <div className='p-3'></div>
              </Fragment>
            ) : (
              <div className='bg-light text-dark d-flex justify-content-center py-2'>
                Registros vacios
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
