import { Outlet } from 'react-router';

import Layout from './layout';

const Root = () => (
  <Layout>
    <Outlet />
  </Layout>
);

export default Root;
