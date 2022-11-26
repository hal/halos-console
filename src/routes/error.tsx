import { EmptyState, EmptyStateBody, EmptyStateIcon, PageSection, Title } from '@patternfly/react-core';
import { ExclamationTriangleIcon } from '@patternfly/react-icons';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

import GoHome from '~/components/gohome';

import Layout from '../layout';

const Error = () => {
  const error = useRouteError();
  console.error(error);

  let title = 'Unknown error';
  let body = 'Something went wrong.';
  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      title = 'Page not found';
      body = "We didn't find a page that matches the address you navigated to.";
    }
    if (error.status === 401) {
      title = 'Not authorized';
      body = "You aren't allowed to see this.";
    }
    if (error.status === 500) {
      title = 'Internal server error';
      body = 'An error occurred on the server.';
    }
  }
  return (
    <Layout>
      <PageSection>
        <EmptyState variant='full'>
          <EmptyStateIcon icon={ExclamationTriangleIcon} />
          <Title headingLevel='h1' size='lg'>
            {title}
          </Title>
          <EmptyStateBody>{body}</EmptyStateBody>
          <GoHome title={'Take me home'} />
        </EmptyState>
      </PageSection>
    </Layout>
  );
};

export default Error;
