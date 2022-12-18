import {
  Bullseye,
  Button,
  Card,
  CardActions,
  CardBody,
  CardHeader,
  CardHeaderMain,
  CardTitle,
  Dropdown,
  DropdownItem,
  DropdownSeparator,
  EmptyState,
  EmptyStateIcon,
  EmptyStateSecondaryActions,
  EmptyStateVariant,
  Gallery,
  KebabToggle,
  Label,
  PageSection,
  PageSectionVariants,
  Text,
  TextContent,
  Title,
} from '@patternfly/react-core';
import { PlusCircleIcon } from '@patternfly/react-icons';
import { useState } from 'react';
import { useLoaderData } from 'react-router';

export enum ConnectionStatus {
  PENDING = 'PENDING',
  CONNECTED = 'CONNECTED',
  FAILED = 'FAILED',
}

export interface Capability {
  id: string;
  title: string;
}

export interface ServiceType {
  id: string;
  name: string;
  status: ConnectionStatus;
  capabilities: Capability[];
}

export const servicesLoader = async (): Promise<ServiceType[]> => {
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

const Service = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const services = useLoaderData() as ServiceType[];

  const onSelect = () => {
    setIsOpen(!isOpen);
  };

  const dropdownItems = [
    <DropdownItem key='link'>Link</DropdownItem>,
    <DropdownItem key='action' component='button'>
      Action
    </DropdownItem>,
    <DropdownItem key='disabled link' isDisabled>
      Disabled Link
    </DropdownItem>,
    <DropdownItem key='disabled action' isDisabled component='button'>
      Disabled Action
    </DropdownItem>,
    <DropdownSeparator key='separator' />,
    <DropdownItem key='separated link'>Separated Link</DropdownItem>,
    <DropdownItem key='separated action' component='button'>
      Separated Action
    </DropdownItem>,
  ];

  return (
    <>
      <PageSection variant={PageSectionVariants.light}>
        <TextContent>
          <Text component='h1'>Services</Text>
          <Text component='p'>
            This page lists all services discovered by halOS. In case you&apos;re missing a service use the first card
            to
            manually add one.
          </Text>
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
          {services.map((service) => (
            <Card key={service.id} isCompact>
              <CardHeader>
                <CardHeaderMain>
                  <img
                    src={`src/assets/${service.capabilities[0].id}.svg`}
                    alt={`${service.name} icon`} style={{ height: '32px', maxWidth: '60px' }} />
                </CardHeaderMain>
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
              </CardHeader>
              <CardTitle>{service.name}</CardTitle>
              <CardBody>
                WildFly is a flexible, lightweight, managed application runtime that helps you build amazing
                applications.
              </CardBody>
              <CardBody>Connection status{' '}{connectionStatusLabel(service.status)}</CardBody>
              <CardBody>
                Capabilities{' '}
                {service.capabilities.map((capability) => (
                  <Label key={capability.id} variant={'outline'}>
                    {capability.title}
                  </Label>
                ))}
              </CardBody>
            </Card>
          ))}
        </Gallery>
      </PageSection>
    </>
  );
};

export default Service;
