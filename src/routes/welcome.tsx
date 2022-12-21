import { PageSection, PageSectionVariants, Text, TextContent, TextVariants } from '@patternfly/react-core';

import halosArchitecture from '~/assets/halos.png';

const Welcome = () => (
  <PageSection variant={PageSectionVariants.light}>
    <TextContent>
      <Text component={TextVariants.h1}>halOS</Text>
      <Text>Welcome to halOS!</Text>
      <Text>
        halOS stands for <strong>HAL</strong> on <strong>O</strong>pen<strong>S</strong>hift. It is derived from HAL and
        allows monitoring and inspection of WildFly and other services running on OpenShift. Although the focus is on
        WildFly, halOS supports monitoring arbitrary services. This is achieved through the concept of capabilities and
        extensions.
      </Text>
      <Text>
        The services page lists all managed services discovered by halOS. Depending on the provided capabilities there
        are additional pages to interact with the services based on their capabilities.{' '}
      </Text>
      <img src={halosArchitecture} alt='halOS architecture' />
    </TextContent>
  </PageSection>
);

export default Welcome;
