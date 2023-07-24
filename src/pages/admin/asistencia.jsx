import React, { useState, useEffect, Fragment } from 'react';
import DataTable from 'react-data-table-component';

import { faEye, faAsterisk } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useLoader } from '@/contexts/LoaderContext';
import { useServer } from '@/contexts/ServerContext';

import { Sidebar } from '@/pages/admin/sidebar';

import { showBasicAlert, see } from '@/helpers/sweetAlert';
import { participantTypeOptions } from '@/helpers/constants';

import '@/static/base/base.css';

export const Asistencias = () => {
  const useserverapi = useServer();

  const { showLoader, hideLoader } = useLoader();
  const [regsters, setregisters] = useState([]);
  const [dnifilter, setdnfilter] = useState(regsters);

  const getregisterapi = async () => {
    showLoader();
    try {
      const datos = await useserverapi.getRegisters();
      const usuarios = datos?.filter((user) => user?.userId?.role === 'participant');

      console.log(usuarios);
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
      //quitar esto para que funcione
      setregisters([]);
      setdnfilter([]);
    }
  };

  useEffect(() => {
    getregisterapi();
  }, []);

  const getTypeParticipant = (type) => {
    const _participantType = participantTypeOptions.find((item) => item?._id === type).name;
    return _participantType;
  };

  const searchByDni = (event) => {
    const dnifilter = regsters.filter((dni) => {
      if (dni.userId !== null && dni.userId !== undefined) {
        return dni.userId.cedula.startsWith(event.target.value);
      }
    });
    setdnfilter(dnifilter);
  };

  const columns = [
    {
      name: 'Cédula/P.',
      selector: (row) => (row.userId === null ? '' : row.userId.cedula),
      sortable: true,
      width: '100px',
    },
    {
      name: 'Usuario',
      selector: (row) => (row.userId === null ? '' : row.userId.name + ' ' + row.userId.lastname),
      sortable: true,
      width: 'auto',
    },
    {
      name: 'T. Participante',
      selector: (row) =>
        row.userId === null ? '' : getTypeParticipant(row.userId.participantType),
      sortable: true,
      width: '210px',
    },

    {
      name: 'T. Pago',
      selector: (row) =>
        row.typePayment == 'transfer'
          ? 'Transferencia'
          : row.typePayment == 'efective'
          ? 'Efectivo'
          : '',
      sortable: true,
      width: '100px',
    },

    {
      name: 'Acciones',
      cell: (register) => (
        <td className='padding_td options d-flex'>
          {register?.inscriptions?.map(
            (curso) =>
              curso.certificateURL && (
                <a
                  key={curso?.courseId}
                  href={curso.certificateURL}
                  target='_blank'
                  className={
                    register.certificateURL
                      ? 'btn btn-secondary p-1 m-auto text-white'
                      : 'btn btn-primary p-1 m-auto text-white'
                  }
                  data-toggle='modal'
                  data-target='exampleModal'>
                  <FontAwesomeIcon icon={faEye} />
                </a>
              )
          )}
        </td>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: '150px',
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
        gap: '10px',
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
      <Sidebar />
      <div className=' contentwithoutsidebar'>
        <h1 className='mb-1'>
          Asistencias <FontAwesomeIcon icon={faAsterisk} />
        </h1>
        <div className='mt-2 mb-2 col-sm-4'>
          <input
            onChange={searchByDni}
            type='text'
            className='form-control p-2'
            placeholder='Buscar por Cedula/Pasaporte'
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
  );
};
