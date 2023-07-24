import React, { useState, useEffect, Fragment } from 'react';
import momentjs from 'moment';
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2';

import { faXmark, faEye, faCheck, faFolder } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useLoader } from '@/contexts/LoaderContext';
import { useServer } from '@/contexts/ServerContext';

import { Sidebar } from '@/pages/admin/sidebar';

import { showBasicAlert, see } from '@/helpers/sweetAlert';
import { participantTypeOptions } from '@/helpers/constants';

import '@/static/base/base.css';

export const Regitsers = () => {
  const useserverapi = useServer();

  const { showLoader, hideLoader } = useLoader();
  const [regsters, setregisters] = useState([]);
  const [dnifilter, setdnfilter] = useState(regsters);

  const getregisterapi = async () => {
    showLoader();
    try {
      const datos = await useserverapi.getRegisters();
      setregisters(datos);
      setdnfilter(datos);
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

  const confirmRegister = async (registerid) => {
    const datosupdate = Object.freeze({
      status: 'paid',
      registerId: registerid,
    });

    showLoader();
    try {
      await useserverapi.UpdateStatus(datosupdate);
      showBasicAlert('El Registro fue aceptado exitosamente!', 'success');
    } catch (error) {
      console.log(error);
      showBasicAlert(
        error?.response?.data?.mensaje ?? 'Ocurrio un problema! Intentelo más tarde',
        'error'
      );
    } finally {
      hideLoader();
      getregisterapi();
    }
  };

  const cancelRegister = async (registerid) => {
    const datosupdate = Object.freeze({
      status: 'reject',
      registerId: registerid,
    });

    Swal.fire({
      title: 'Esta seguro de rechazar el registro?',
      text: 'Esta acción no puede ser revertida',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
    }).then(async (willDelete) => {
      if (willDelete.isConfirmed) {
        showLoader();
        try {
          await useserverapi.UpdateStatus(datosupdate);
          showBasicAlert('El Registro fue rechazado exitosamente!', 'success');
        } catch (error) {
          console.log(error);
          showBasicAlert(
            error?.response?.data?.mensaje ?? 'Ocurrio un problema! Intentelo más tarde',
            'error'
          );
        } finally {
          hideLoader();
          getregisterapi();
        }
      } else {
        showBasicAlert('Acción Cancelada!', 'info');
      }
    });
  };

  useEffect(() => {
    getregisterapi();
  }, []);

  const ver = (url) => see('Verificación de voucher', url, '200px', '200px');

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
      name: 'F. Registro',
      selector: (row) => momentjs(row.createdAt).format('DD-MM-YYYY'),
      sortable: true,
      width: '100px',
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
      name: 'N. Inscri.',
      selector: (row) => row.inscriptions.length,
      sortable: true,
      width: '80px',
    },
    {
      name: 'Total',
      selector: (row) => `$ ${row.total}`,
      sortable: true,
      width: '70px',
    },

    {
      name: 'Estado',
      selector: (row) =>
        row.status == 'paid'
          ? 'Pagado'
          : row.status == 'pending'
          ? 'Pendiente'
          : row.status == 'reject'
          ? 'Rechazado'
          : '',
      sortable: true,
      width: '70px',
    },

    {
      name: 'Acciones',
      cell: (register) => (
        <td className='padding_td options'>
          <button
            onClick={() => confirmRegister(register._id)}
            className='btn btn-success p-1 left'>
            <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
          </button>
          <button onClick={() => cancelRegister(register._id)} className='btn btn-danger p-1 left'>
            <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
          </button>
          <button
            disabled={register.voucherURL === null}
            onClick={() => ver(register.voucherURL)}
            className={
              register.voucherURL === null
                ? 'btn btn-secondary p-1 left'
                : 'btn btn-primary p-1 left'
            }
            data-toggle='modal'
            data-target='exampleModal'>
            <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>
          </button>
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
          Registros <FontAwesomeIcon icon={faFolder} />
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
