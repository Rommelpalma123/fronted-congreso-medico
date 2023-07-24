import { Routes, Route, Navigate } from 'react-router-dom';
import { Users } from '@/pages/admin/users';
import { usersfake } from '@/mock/users';
import { Regitsers } from '@/pages/admin/registers';
import { Asistencias } from '@/pages/admin/asistencia';
import { CreateCourse } from '@/pages/admin/CreateCourse';
import { UpdateCourse } from '@/pages/admin/UpdateCourse';
import { ListCourse } from '@/pages/admin/ListCourse';
import { ListVerified } from '@/pages/admin/ListVerified';
import { CreateVerified } from '@/pages/admin/CreateVerified';
import { UpdateVerified } from '@/pages/admin/UpdateVerified';
import { ConfigurationPage } from '@/pages/admin/Configuration';

const itemsPerPage = 11;
export const AdminRoutes = () => (
  <Routes>
    <Route path='/registros' element={<Regitsers />} />
    <Route path='/usuarios' element={<Users data={usersfake} itemsPerPage={itemsPerPage} />} />
    <Route path='/asistencias' element={<Asistencias />} />
    <Route path='/configuracion' element={<ConfigurationPage />} />
    <Route path='/crear-curso' element={<CreateCourse />} />
    <Route path='/editCourse/:curseId' element={<UpdateCourse />} />
    <Route path='/lista-cursos' element={<ListCourse />} />
    <Route path='/lista-verificados' element={<ListVerified />} />
    <Route path='/crear-verificador' element={<CreateVerified />} />
    <Route path='/editVerified/:idVerified' element={<UpdateVerified />} />
    <Route path='*' element={<Navigate to='/registros' />} />
  </Routes>
);
