import { Card, CardBody, Gallery, GalleryItem, PageSection } from '@patternfly/react-core';

const Deployment = () => {
  return (
    <PageSection>
      <Gallery hasGutter>
        {Array.apply(0, Array(50)).map((_x, i) => (
          <GalleryItem key={i}>
            <Card>
              <CardBody>This is a deployment</CardBody>
            </Card>
          </GalleryItem>
        ))}
      </Gallery>
    </PageSection>
  );
};

export default Deployment;
