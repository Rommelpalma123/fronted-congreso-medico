import React, { useEffect, useState } from 'react';
import '@/static/base/base.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { Sidebar } from '@/pages/admin/sidebar';
import { useServer } from '@/contexts/ServerContext';
import { useLoader } from '@/contexts/LoaderContext';
import { participantTypeOptions } from '@/helpers/constants';
import DataTable from 'react-data-table-component';
import { showBasicAlert } from '@/helpers/sweetAlert';

export const Users = () => {
  const useserverapi = useServer();

  const { showLoader, hideLoader } = useLoader();
  const [regsters, setregisters] = useState([]);
  const [dnifilter, setdnfilter] = useState(regsters);

  const getregisterapi = async () => {
    showLoader();
    try {
      const datos = await useserverapi.getAllUser();
      const usuarios = datos?.filter((user) => user?.role === 'participant');
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
    getregisterapi();
  }, []);

  const getTypeParticipant = (type) => {
    const _participantType = participantTypeOptions.find((item) => item?._id === type).name;
    return _participantType;
  };

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
      selector: (row) => row.email ?? '',
      sortable: true,
      width: '200px',
    },
    {
      name: 'Teléfono',
      selector: (row) => row.phone ?? '',
      sortable: true,
      width: '100px',
    },
    {
      name: 'Dirección',
      selector: (row) => row.address ?? '',
      sortable: true,
      width: '160px',
    },
    {
      name: 'T. Participante',
      selector: (row) => getTypeParticipant(row?.participantType),
      sortable: true,
      width: '210px',
    },
    {
      name: 'Empresa/Institución',
      selector: (row) => row?.company,
      sortable: true,
      width: '180px',
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
    <div className='content_base'>
      <Sidebar></Sidebar>
      <div className=' contentwithoutsidebar'>
        <h1 className='mb-2'>
          Usuarios Registrados <FontAwesomeIcon icon={faUsers} />
        </h1>
        <div className='mt-2 mb-2 col-sm-4'>
          <input
            onChange={searchByDni}
            type='text'
            className='form-control p-2'
            placeholder='Buscar por Cédula/Pasaporte'
          />
        </div>

        {dnifilter.length > 0 ? (
          <>
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
          </>
        ) : (
          <div className='bg-light text-dark d-flex justify-content-center py-2'>
            Registros vacios
          </div>
        )}
      </div>
    </div>
  );
};
