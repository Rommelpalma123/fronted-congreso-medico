import { Fragment } from 'react';

import { Header } from '@/components/Header';
import { FormLogin } from '@/components/public/FormLogin';
import { Footer } from '@/components/Footer';

export const LoginPage = () => {
  return (
    <Fragment>
      <Header />

      <div style={{ minHeight: 'calc(100vh - 8.4rem)', boxSizing: 'border-box' }}>
        <FormLogin />
      </div>

      <Footer />
    </Fragment>
  );
};
