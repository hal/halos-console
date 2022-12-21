import {
  DataList,
  DataListCell,
  DataListItem,
  DataListItemCells,
  DataListItemRow,
  Icon,
  List,
  ListItem,
  PageSection,
  PageSectionVariants,
  Text,
  TextContent,
} from '@patternfly/react-core';
import { ExternalLinkAltIcon } from '@patternfly/react-icons';
import { useLoaderData } from 'react-router';

import { HostAndPort, QuarkusService } from '~/model/quarkus';
import { WildFlyServer } from '~/model/wildfly';

export const quarkusServicesLoader = async (): Promise<WildFlyServer[]> => {
  const results = await fetch('/api/v1/quarkus/services');
  if (!results.ok) throw new Error('Unable to load WildFly servers!');
  return await results.json();
};

function link(route: HostAndPort) {
  const scheme = route.port == 443 ? 'https' : 'http';
  return (
    <a href={`${scheme}://${route.host}`}>
      {`${scheme}://${route.host}`}{' '}
      <Icon isInline>
        <ExternalLinkAltIcon />
      </Icon>
    </a>
  );
}

const QuarkusServices = () => {
  const services = useLoaderData() as QuarkusService[];
  return (
    <>
      <PageSection variant={PageSectionVariants.light}>
        <TextContent>
          <Text component='h1'>Quarkus Services</Text>
          <Text>
            Quarkus is a Kubernetes Native Java stack tailored for OpenJDK HotSpot and GraalVM, crafted from the best of
            breed Java libraries and standards.
          </Text>
          <Text>
            For more info, please visit{' '}
            <a href='https://quarkus.io/' target='_blank' rel='noreferrer'>
              https://quarkus.io/
            </a>
          </Text>
        </TextContent>
      </PageSection>
      <PageSection>
        <DataList aria-label='Quarkus services'>
          {services.map((service, serviceIndex) => {
            const serviceLabel = `${service.managedService}-name`;
            return (
              <DataListItem key={serviceIndex} aria-labelledby={serviceLabel}>
                <DataListItemRow>
                  <DataListItemCells
                    dataListCells={[
                      <DataListCell key='name'>
                        <span id={serviceLabel}>{service.managedService}</span>
                      </DataListCell>,
                      <DataListCell key='routes'>
                        <List isPlain>
                          {service.routes.map((route, routeIndex) => (
                            <ListItem key={routeIndex}>{link(route)}</ListItem>
                          ))}
                        </List>
                      </DataListCell>,
                    ]}
                  />
                </DataListItemRow>
              </DataListItem>
            );
          })}
        </DataList>
      </PageSection>
    </>
  );
};

export default QuarkusServices;
