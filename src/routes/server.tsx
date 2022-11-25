import { Card, CardBody, Gallery, GalleryItem, PageSection } from '@patternfly/react-core';

const Server = () => {
  return (
    <PageSection>
      <Gallery hasGutter>
        {Array.apply(0, Array(50)).map((_x, i) => (
          <GalleryItem key={i}>
            <Card>
              <CardBody>This is a server</CardBody>
            </Card>
          </GalleryItem>
        ))}
      </Gallery>
    </PageSection>
  );
};

export default Server;
