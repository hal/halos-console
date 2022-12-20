import '@patternfly/react-core/dist/styles/base.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import Error from '~/routes/error';
import Help from '~/routes/help';
import ModelBrowser from '~/routes/modelbrowser';
import NotYetImplemented from '~/routes/nyi';
import ManagedServiceView from '~/routes/service';
import WelcomePage from '~/routes/welcome';
import '~/styles/main.css';

import { Root } from './root';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Root />} path='/' errorElement={<Error />}>
      <Route path='/' element={<WelcomePage />} />
      <Route path='services' element={<ManagedServiceView />} />
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
