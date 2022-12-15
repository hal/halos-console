import '@patternfly/react-core/dist/styles/base.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import Deployment, { deploymentsLoader } from '~/routes/deployment';
import Error from '~/routes/error';
import Help from '~/routes/help';
import ModelBrowser from '~/routes/modelbrowser';
import NotYetImplemented from '~/routes/nyi';
import Server, { serversLoader } from '~/routes/server';
import Welcome from '~/routes/welcome';
import '~/styles/main.css';

import Root from './root';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Root />} path='/' errorElement={<Error />}>
      <Route path='/' element={<Welcome />} />
      <Route path='server' element={<Server />} loader={serversLoader} />
      <Route path='deployment' element={<Deployment />} loader={deploymentsLoader} />
      <Route path='modelbrowser' element={<ModelBrowser />} />
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
