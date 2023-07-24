import { LoaderProvider } from '@/contexts/LoaderContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { ServerProvider } from '@/contexts/ServerContext';
import { AdminProvider } from '@/contexts/AdminContext';

import { RouterManager } from '@/routes';

export const App = () => (
  <LoaderProvider>
    <AuthProvider>
      <ServerProvider>
        <AdminProvider>
          <RouterManager />
        </AdminProvider>
      </ServerProvider>
    </AuthProvider>
  </LoaderProvider>
);
