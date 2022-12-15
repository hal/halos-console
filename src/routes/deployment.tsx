import { Card, CardBody, Gallery, GalleryItem, PageSection } from '@patternfly/react-core';
import { useLoaderData } from 'react-router';

import { ServerType } from '~/routes/server';

export interface DeploymentType {
  server: ServerType;
  name: string;
  status: DeploymentStatus;
  enabled: boolean;
  disabledAt: Date;
  enabledAt: Date;
}

export enum DeploymentStatus {
  OK = 'OK',
  FAILED = 'FAILED',
  STOPPED = 'STOPPED',
  UNDEFINED = 'UNDEFINED',
}

export const deploymentsLoader = async (): Promise<DeploymentType[]> => {
  const results = await fetch('/api/v1/deployment');
  if (!results.ok) throw new Error('Unable to load deployments!');
  return await results.json();
};

const Deployment = () => {
  const deployments = useLoaderData() as DeploymentType[];
  return (
    <PageSection>
      <Gallery hasGutter>
        {deployments.map((deployment, i) => (
          <GalleryItem key={i}>
            <Card>
              <CardBody>{deployment.name}</CardBody>
            </Card>
          </GalleryItem>
        ))}
      </Gallery>
    </PageSection>
  );
};

export default Deployment;
