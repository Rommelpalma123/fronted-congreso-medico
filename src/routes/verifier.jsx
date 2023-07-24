import { Routes, Route, Navigate } from 'react-router-dom';

import { HomePage } from '@/pages/verifier/Home';

export const VerifierRoutes = () => (
  <Routes>
    <Route path='/' element={<HomePage />} />
    <Route path='*' element={<Navigate to='/' />} />
  </Routes>
);
