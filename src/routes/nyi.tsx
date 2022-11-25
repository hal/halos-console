import { EmptyState, EmptyStateBody, EmptyStateIcon, PageSection, Title } from '@patternfly/react-core';
import { ExclamationTriangleIcon } from '@patternfly/react-icons';

import GoHome from '../components/gohome';

const NotYetImplemented = () => (
  <PageSection>
    <EmptyState variant='full'>
      <EmptyStateIcon icon={ExclamationTriangleIcon} />
      <Title headingLevel='h1' size='lg'>
        Not yet implemented
      </Title>
      <EmptyStateBody>This feature hasn&apos;t been implemented yet.</EmptyStateBody>
      <GoHome title={'Take me home'} />
    </EmptyState>
  </PageSection>
);

export default NotYetImplemented;
