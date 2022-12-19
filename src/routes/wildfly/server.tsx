import { Card, CardBody, Gallery, GalleryItem, PageSection } from '@patternfly/react-core';
import { useLoaderData } from 'react-router';

import { WildFlyServer } from '~/model/wildfly';

export const wildFlyServerLoader = async (): Promise<WildFlyServer[]> => {
  const results = await fetch('/api/v1/wildfly/servers');
  if (!results.ok) throw new Error('Unable to load WildFly servers!');
  return await results.json();
};

const WildFlyServerComponent = () => {
  const servers = useLoaderData() as WildFlyServer[];
  return (
    <PageSection>
      <Gallery hasGutter>
        {servers.map((server, i) => (
          <GalleryItem key={i}>
            <Card>
              <CardBody>{server.name}</CardBody>
            </Card>
          </GalleryItem>
        ))}
      </Gallery>
    </PageSection>
  );
};

export default WildFlyServerComponent;
