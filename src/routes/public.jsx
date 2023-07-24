import { Routes, Route, Navigate } from 'react-router-dom';

import { HomePage } from '@/pages/public/Home';
import { LoginPage } from '@/pages/public/Login';
import { RecoveryPasswordPage } from '@/pages/public/RecoveryPassword';

export const PublicRoutes = () => (
  <Routes>
    <Route path='/' element={<HomePage />} />
    <Route path='/login' element={<LoginPage />} />
    <Route path='/recovery-password' element={<RecoveryPasswordPage />} />
    <Route path='*' element={<Navigate to='/' />} />
  </Routes>
);
