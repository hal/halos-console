import {
  Bullseye,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardHeaderMain,
  CardTitle,
  EmptyState,
  EmptyStateIcon,
  EmptyStateSecondaryActions,
  EmptyStateVariant,
  Gallery,
  Label,
  PageSection,
  PageSectionVariants,
  Text,
  TextContent,
  Title,
} from '@patternfly/react-core';
import { PlusCircleIcon } from '@patternfly/react-icons';
import { useOutletContext } from 'react-router';

import { ConnectionStatus, UNKNOWN_CAPABILITY, capabilityDescription, capabilityLogo } from '~/model/service';

import { RootState } from '../root';

function connectionStatusLabel(status: ConnectionStatus) {
  switch (status) {
    case ConnectionStatus.PENDING:
      return <Label color='orange'>Pending</Label>;
    case ConnectionStatus.CONNECTED:
      return <Label color='green'>Connected</Label>;
    case ConnectionStatus.FAILED:
      return <Label color='red'>Failed</Label>;
    default:
      return <Label color='grey'>Unknown</Label>;
  }
}

const ManagedServiceView = () => {
  const { services } = useOutletContext<RootState>();
  return (
    <>
      <PageSection variant={PageSectionVariants.light}>
        <TextContent>
          <Text component='h1'>Managed Services</Text>
          <Text>
            This page lists all managed services discovered by halOS. Managed services are discovered based on labels.
            Each managed service provides one or more capabilities. The capabilities of a managed service determine the
            possible features and the type of information halOS will monitor.
          </Text>
          <Text>In case you&apos;re missing a service, you can manually add managed services.</Text>
        </TextContent>
      </PageSection>
      <PageSection>
        <Gallery hasGutter aria-label='Available managed services'>
          <Card isCompact>
            <Bullseye>
              <EmptyState variant={EmptyStateVariant.xs}>
                <EmptyStateIcon icon={PlusCircleIcon} />
                <Title headingLevel='h2' size='md'>
                  Manually add a managed service
                </Title>
                <EmptyStateSecondaryActions>
                  <Button variant='link' onClick={() => alert('Not yet implemented!')}>
                    Add managed service
                  </Button>
                </EmptyStateSecondaryActions>
              </EmptyState>
            </Bullseye>
          </Card>
          {services.map((service) => {
            const capability =
              service.capabilities != null && service.capabilities.length != 0
                ? service.capabilities[0]
                : UNKNOWN_CAPABILITY;
            return (
              <Card key={service.name} isCompact>
                <CardHeader>
                  <CardHeaderMain>
                    <img
                      src={capabilityLogo(capability)}
                      alt={`${service.name} icon`}
                      style={{ height: '32px', maxWidth: '60px' }}
                    />
                  </CardHeaderMain>
                </CardHeader>
                <CardTitle>{service.name}</CardTitle>
                <CardBody>{capabilityDescription(capability)}</CardBody>
                <CardBody>Connection status {connectionStatusLabel(service.connection.status)}</CardBody>
                <CardBody>
                  Capabilities{' '}
                  {service.capabilities.map((capability) => (
                    <Label key={capability.name} variant={'outline'}>
                      {capability.title}
                    </Label>
                  ))}
                </CardBody>
              </Card>
            );
          })}
        </Gallery>
      </PageSection>
    </>
  );
};

export default ManagedServiceView;
