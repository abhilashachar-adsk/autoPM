// Libraries
import React, { useEffect, useState } from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider
} from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@weave-mui/material';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// State
import getStore from 'state';
import { SpindleProvider } from 'state/SpindleContext';
import queryClientService from 'service/queryClientService';

// Components
import StoragePage from 'components/storage/StoragePage';
import OrchestrationPage from 'components/orchestration/OrchestrationPage';

import useWeaveTheme from '../../hooks/useWeaveTheme';
import '../../styles/typography.css';

const App = () => {
  const [theme, initialized] = useWeaveTheme('light-gray', 'medium');

  const [store, setStore] = useState<Store | null>(null);

  useEffect(() => {
    const reduxStore = getStore();
    setStore(reduxStore);

    window.cfp.providers.communication.register(
      'adp-infra-project-resources-mfe',
      {
        store: reduxStore
      }
    );

    return () =>
      window.cfp.providers.communication.unregister(
        'adp-infra-project-resources-mfe'
      );
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Outlet />}>
        <Route path="storage" element={<StoragePage />} />
        <Route path="orchestration" element={<OrchestrationPage />} />
      </Route>
    ),
    {
      basename: '/adp-infra-project-resources'
    }
  );

  const isLocal = process.env.LOCAL_TOKEN !== undefined;

  if (!store) {
    return null;
  }

  return (
    <Provider store={store}>
      {initialized && (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <QueryClientProvider client={queryClientService}>
            <SpindleProvider>
              <RouterProvider router={router} />
            </SpindleProvider>
            {isLocal && <ReactQueryDevtools initialIsOpen={false} />}
          </QueryClientProvider>
        </ThemeProvider>
      )}
    </Provider>
  );
};

export default App;
