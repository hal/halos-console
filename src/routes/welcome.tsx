import { PageSection, PageSectionVariants, Text, TextContent, TextVariants } from '@patternfly/react-core';

const Welcome = () => (
  <PageSection variant={PageSectionVariants.light}>
    <TextContent>
      <Text component={TextVariants.h1}>halOS</Text>
      <Text component={TextVariants.p}>Welcome to halOS</Text>
    </TextContent>
  </PageSection>
);

export default Welcome;
