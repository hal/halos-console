import '@patternfly/react-core/dist/styles/base.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import Error from '~/routes/error';
import Help from '~/routes/help';
import NotYetImplemented from '~/routes/nyi';
import QuarkusServices, { quarkusServicesLoader } from '~/routes/quarkus/services';
import ManagedServices from '~/routes/services';
import WelcomePage from '~/routes/welcome';
import WildFlyServerDetail, { wildFlyServerLoader } from '~/routes/wildfly/server';
import WildFlyServers, { wildFlyServersLoader } from '~/routes/wildfly/servers';
import '~/styles/main.css';

import { Root } from './root';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Root />} path='/' errorElement={<Error />}>
      <Route path='/' element={<WelcomePage />} />
      <Route path='services' element={<ManagedServices />} />
      <Route path='wildfly/servers' element={<WildFlyServers />} loader={wildFlyServersLoader} />
      <Route path='wildfly/servers/:serverName' element={<WildFlyServerDetail />} loader={wildFlyServerLoader} />
      <Route path='quarkus/services' element={<QuarkusServices />} loader={quarkusServicesLoader} />
      <Route path='help' element={<Help />} />
      <Route path='nyi' element={<NotYetImplemented />} />
    </Route>,
  ),
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
