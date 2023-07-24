import DataTable from 'react-data-table-component';
import { useServer } from '@/contexts/ServerContext';
import { useState, useEffect } from 'react';
import { BiEdit } from 'react-icons/bi';
import { AiFillEye, AiFillSafetyCertificate } from 'react-icons/ai';
import '@/static/base/base.css';
import { Sidebar } from '@/pages/admin/sidebar';
import { see } from '@/helpers/sweetAlert';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { MdAddToPhotos } from 'react-icons/md';
import { useLoader } from '@/contexts/LoaderContext';
import { BiTask } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import { showBasicAlert } from '@/helpers/sweetAlert';

export const ListCourse = () => {
  const server = useServer();
  const { showLoader, hideLoader } = useLoader();
  const [courses, setCourses] = useState([]);
  const [titleFilter, setTitleFilter] = useState(courses);

  const sumOneDay = (fecha) => {
    const fechaModificada = new Date(fecha);
    fechaModificada.setDate(fechaModificada.getDate() + 1);
    return fechaModificada;
  };

  const getCourses = async () => {
    showLoader();
    try {
      const data = await server.getCourses();
      const modifiedData = data.map((course) => {
        const startDate = sumOneDay(course.startDate);
        const endDate = sumOneDay(course.endDate);
        return { ...course, startDate, endDate };
      });
      setCourses(modifiedData);
      setTitleFilter(modifiedData);
    } catch (error) {
      setCourses([]);
    } finally {
      hideLoader();
    }
  };

  const eliminarBiId = async (id) => {
    showLoader();
    try {
      await server.deleleCourse(id);
      showBasicAlert('Eliminado Correctamente!', 'success');
      const updatedCourses = courses.filter((course) => course._id !== id);
      setCourses(updatedCourses);
      setTitleFilter(updatedCourses);
    } catch (err) {
      showBasicAlert('Error, El curso tiene un registro', 'error');
      console.log(err);
    } finally {
      hideLoader();
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  const seePhoto = (photo) => {
    see('Imagen que se muestra en la web', photo, '90%', '400px', '700px');
  };

  const seeCertificado = (certificate) => {
    see('Imagen de Certificado', certificate, '90%', '400px', '700px');
  };

  const columns = [
    {
      name: 'Título',
      selector: (row) => row?.title,
      sortable: true,
      width: '500px',
    },
    {
      name: 'Tipo',
      selector: (row) =>
        row.type === 'workshop' ? 'Taller' : row?.type === 'congress' ? 'Congreso' : '',
      sortable: true,
      width: '100px',
    },
    {
      name: 'Precio',
      selector: (row) => `$ ${row?.price?.toLocaleString()}`,
      sortable: true,
      width: '100px',
    },
    {
      name: 'Descripción',
      selector: (row) => row?.description,
      sortable: true,
      width: '150px',
    },
    {
      name: 'Fecha Inicio',
      selector: (row) => (row?.startDate ? moment(row?.startDate).format('DD/MM/YYYY') : ''),
      sortable: true,
      width: '100px',
    },
    {
      name: 'Fecha Fin',
      selector: (row) => (row.endDate ? moment(row.endDate).format('DD/MM/YYYY') : ''),
      sortable: true,
      width: '100px',
    },

    {
      name: 'Acciones',
      cell: (curso) => (
        <div>
          <AiFillEye
            onClick={() => (curso?.photoURL ? seePhoto(curso?.photoURL) : {})}
            className={`fs-4 btn m-1 ${curso?.photoURL ? 'btn-info' : 'btn-secondary'}`}
          />
          <AiFillSafetyCertificate
            onClick={() =>
              curso?.certificateTemplateURL ? seeCertificado(curso?.certificateTemplateURL) : {}
            }
            className={`fs-4 m-2 btn ${
              curso?.certificateTemplateURL ? 'btn-warning' : 'btn-secondary'
            }`}
          />
          <Link to={`/editCourse/${curso?._id}`}>
            <BiEdit className='fs-4 btn btn-success' />
          </Link>
          <MdDelete
            onClick={() => (curso?._id ? eliminarBiId(curso?._id) : {})}
            className={`fs-4 m-2 btn ${curso?._id ? 'btn-danger' : 'btn-secondary'}`}
          />
        </div>
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
        gap: '20px',
        alignItems: 'center',
        marginTop: '10px',
      },
    },
  };

  const searchByTitle = (event) => {
    const filterTitle = courses.filter((curso) => {
      return curso.title.toLowerCase().includes(event.target.value.toLowerCase());
    });

    setTitleFilter(filterTitle);
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
            Cursos <BiTask className='text-dark fs-1' />
          </h1>

          <Link to='/crear-curso' className='btn btn-success p-3'>
            <MdAddToPhotos className='fs-4' /> Crear Curso
          </Link>
          <div className='selector-items'>
            <div className='mt-2 mb-2 col-sm-4'>
              <input
                onChange={searchByTitle}
                type='text'
                className='form-control p-2'
                placeholder='Buscar por titulo'
              />
            </div>
            {titleFilter.length > 0 ? (
              <DataTable
                columns={columns}
                striped
                highlightOnHover
                selectableRowsComponent={() => <div></div>}
                fixedHeader
                data={titleFilter}
                customStyles={customStyles}
                selectableRows
                pagination
                paginationComponentOptions={paginationComponentOptions}
              />
            ) : (
              <DataTable />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
