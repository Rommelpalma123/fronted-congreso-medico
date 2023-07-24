import { Route, Routes, Navigate } from 'react-router-dom';
import { SideBar } from '../../components/user/SideBar';
import { Profile } from '@/pages/user/Profile';
import { Register } from '@/pages/user/Register';
import '@/static/styles/layout.css';
import '@/static/styles/layout.css';
import { Certificate } from './Certificate';

export const Layout = () => {
  return (
    <div className='container-padre'>
      <SideBar />
      <div className='content' style={{ height: '100%', width: '100%' }}>
        <Routes>
          <Route path='/' element={<Profile />} />
          <Route path='/certificados' element={<Certificate />} />
          <Route path='/registros' element={<Register />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </div>
    </div>
  );
};
