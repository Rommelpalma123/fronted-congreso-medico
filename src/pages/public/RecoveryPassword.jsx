import { Fragment } from 'react';

import { Header } from '@/components/Header';
import { FormRecoveryPassword } from '@/components/public/FormRecoveryPassword';
import { Footer } from '@/components/Footer';

export const RecoveryPasswordPage = () => {
  return (
    <Fragment>
      <Header />

      <div style={{ minHeight: 'calc(100vh - 8.4rem)', boxSizing: 'border-box' }}>
        <FormRecoveryPassword />
      </div>

      <Footer />
    </Fragment>
  );
};
