import '@patternfly/react-core/dist/styles/base.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import Deployment from './routes/deployment';
import Error from './routes/error';
import Help from './routes/help';
import ModelBrowser from './routes/modelbrowser';
import NotYetImplemented from './routes/nyi';
import Root from './routes/root';
import Server from './routes/server';
import Welcome from './routes/welcome';

import './main.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Root />} path='/' errorElement={<Error />}>
      <Route path='/' element={<Welcome />} />
      <Route path='server' element={<Server />} />
      <Route path='deployment' element={<Deployment />} />
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
