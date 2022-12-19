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
import { useEffect } from 'react';
import { useLoaderData } from 'react-router';

import {
  ConnectionStatus,
  ManagedService,
  ManagedServiceModification,
  capabilityDescription,
  capabilityLogo,
} from '~/model/service';

export const managedServiceLoader = async (): Promise<ManagedService[]> => {
  const results = await fetch('/api/v1/services');
  if (!results.ok) throw new Error('Unable to load servers!');
  return await results.json();
};

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
  const services = useLoaderData() as ManagedService[];

  useEffect(() => {
    const eventSource = new EventSource('/api/v1/services/modifications');
    eventSource.onmessage = (event) => {
      const msm = event.data as ManagedServiceModification;
      console.log(`msm: ${msm}`);
    };
  });

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
            const capability = service.capabilities[0];
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
                  {/*
                  <CardActions>
                    <Dropdown
                      onSelect={onSelect}
                      toggle={<KebabToggle onToggle={setIsOpen} />}
                      isOpen={isOpen}
                      isPlain
                      dropdownItems={dropdownItems}
                      position={'right'}
                    />
                  </CardActions>
*/}
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
