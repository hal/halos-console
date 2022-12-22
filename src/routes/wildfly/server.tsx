import { ChartDonutUtilization } from '@patternfly/react-charts';
import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardBody,
  CardTitle,
  DescriptionList,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTermHelpText,
  DescriptionListTermHelpTextButton,
  Divider,
  Flex,
  FlexItem,
  Grid,
  GridItem,
  Label,
  PageBreadcrumb,
  PageSection,
  PageSectionVariants,
  Popover,
  Tab,
  TabContent,
  TabContentBody,
  TabTitleText,
  Tabs,
  Title,
  Tooltip,
} from '@patternfly/react-core';
import { BanIcon, CheckCircleIcon } from '@patternfly/react-icons';
import { TableComposable, Tbody, Td, Th, Thead, Tr } from '@patternfly/react-table';
import { DateTime, Duration } from 'luxon';
import { ReactNode, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';
import { LoaderFunctionArgs } from 'react-router-dom';

import { EMPTY_STATUS, Status } from '~/model/status';
import { WildFlyServer } from '~/model/wildfly';
import RunningModeLabel from '~/routes/wildfly/runningMode';
import ServerStateLabel from '~/routes/wildfly/serverState';

export const wildFlyServerLoader = async ({ params }: LoaderFunctionArgs): Promise<WildFlyServer> => {
  const results = await fetch(`/api/v1/wildfly/servers/${params.serverName}`);
  if (!results.ok) throw new Error(`Unable to load WildFly server ${params.serverName}!`);
  return await results.json();
};

const WildFlyServerDetail = () => {
  const server = useLoaderData() as WildFlyServer;
  const [status, setStatus] = useState(EMPTY_STATUS);
  const [activeTabKey, setActiveTabKey] = useState(0);
  const handleTabClick = (tabIndex: number) => setActiveTabKey(tabIndex);

  useEffect(() => {
    fetchStatus().then((newStatus) => setStatus(() => newStatus));
    const interval = setInterval(() => {
      fetchStatus().then((newStatus) => setStatus(() => newStatus));
    }, 5000);
    return () => clearInterval(interval);
  });

  const fetchStatus = () =>
    fetch(`/api/v1/wildfly/servers/${server.name}/status`)
      .then((response) => response.json())
      .then((json) => {
        return json as Status;
      });

  const description = (id: string, title: string, description: ReactNode, value: ReactNode) => (
    <DescriptionListGroup>
      <Popover
        headerContent={<div>{title}</div>}
        bodyContent={<div>{description}</div>}
        reference={() => document.getElementById(id) as HTMLElement}
      />
      <DescriptionListTermHelpText>
        <DescriptionListTermHelpTextButton id={id}>{title}</DescriptionListTermHelpTextButton>
      </DescriptionListTermHelpText>
      <DescriptionListDescription>{value}</DescriptionListDescription>
    </DescriptionListGroup>
  );

  return (
    <>
      <PageBreadcrumb isWidthLimited>
        <Breadcrumb>
          <BreadcrumbItem to='/wildfly/servers'>Servers</BreadcrumbItem>
          <BreadcrumbItem to='#' isActive>
            {server.name}
          </BreadcrumbItem>
        </Breadcrumb>
      </PageBreadcrumb>
      <PageSection variant={PageSectionVariants.light} isWidthLimited>
        <Title headingLevel='h1' size='2xl'>
          {server.name}
        </Title>
      </PageSection>
      <PageSection type='tabs' variant={PageSectionVariants.light} isWidthLimited>
        <Tabs
          activeKey={activeTabKey}
          onSelect={(_event, tabIndex) => handleTabClick(Number(tabIndex))}
          usePageInsets
          id='open-tabs-example-tabs-list'
        >
          <Tab eventKey={0} title={<TabTitleText>Details</TabTitleText>} tabContentId={`tabContent${0}`} />
          <Tab eventKey={1} title={<TabTitleText>Status</TabTitleText>} tabContentId={`tabContent${1}`} />
          <Tab eventKey={2} title={<TabTitleText>Properties</TabTitleText>} tabContentId={`tabContent${2}`} />
        </Tabs>
      </PageSection>
      <PageSection variant={PageSectionVariants.light} isWidthLimited>
        <TabContent key={0} eventKey={0} id={`tabContent${0}`} activeKey={activeTabKey} hidden={0 !== activeTabKey}>
          <TabContentBody>
            <Flex direction={{ default: 'column' }}>
              <FlexItem spacer={{ default: 'spacerXl' }}>
                <Flex direction={{ default: 'column' }}>
                  <FlexItem spacer={{ default: 'spacerLg' }}>
                    <Title headingLevel='h2' size='lg' id='wildfly-server-details'>
                      WildFly server details
                    </Title>
                  </FlexItem>
                  <FlexItem>
                    <DescriptionList columnModifier={{ lg: '2Col' }} aria-labelledby='wildfly-server-details'>
                      {description(
                        'desc-name',
                        'Name',
                        <div>
                          The name of this server. If not set, defaults to the runtime value of{' '}
                          <code>InetAddress.getLocalHost().getHostName()</code>.
                        </div>,
                        server.name,
                      )}
                      {description(
                        'desc-product-name',
                        'Product name',
                        <div>The name of the WildFly Core based product that is being run by this server.</div>,
                        server.productName,
                      )}
                      {description(
                        'desc-product-version',
                        'Product version',
                        <div>
                          The version of the WildFly Core based product release that is being run by this server.
                        </div>,
                        server.productVersion,
                      )}
                      {description(
                        'desc-management-version',
                        'Management version',
                        <div>
                          The version of the WildFly Core kernel management interface that is provided by this server.
                        </div>,
                        server.managementVersion,
                      )}
                      {description(
                        'desc-running-mode',
                        'Running mode',
                        <div>
                          The current running mode of the server. Either NORMAL (normal operations) or ADMIN_ONLY. An
                          ADMIN_ONLY server will start any configured management interfaces and accept management
                          requests, but will not start services used for handling end user requests.
                        </div>,
                        <RunningModeLabel server={server} tooltip={false} />,
                      )}
                      {description(
                        'desc-server-state',
                        'Server state',
                        <div>
                          The current state of the server controller; either STARTING, RUNNING, RESTART_REQUIRED,
                          RELOAD_REQUIRED or STOPPING.
                        </div>,
                        <ServerStateLabel server={server} tooltip={false} />,
                      )}
                    </DescriptionList>
                  </FlexItem>
                </Flex>
              </FlexItem>
              <FlexItem>
                {server.deployments.length != 0 && (
                  <>
                    <Title headingLevel='h2' size='lg' id='wildfly-server-details'>
                      Deployments
                    </Title>
                    <TableComposable aria-label='Deployments' variant={'compact'}>
                      <Thead>
                        <Tr>
                          <Th key='name'>Name</Th>
                          <Th key='status'>Status</Th>
                          <Th key='timestamp'>Timestamp</Th>
                          <Th />
                        </Tr>
                      </Thead>
                      <Tbody>
                        {server.deployments.map((deployment, rowIndex) => {
                          const labelId = `${deployment.name}-timestamp-label`;
                          const tooltipId = `${deployment.name}-timestamp-tooltip`;
                          const tooltip = (
                            <Tooltip
                              id={tooltipId}
                              content={
                                <div>
                                  {deployment.enabled
                                    ? DateTime.fromISO(deployment.enabledAt).toLocaleString(DateTime.DATETIME_FULL)
                                    : DateTime.fromISO(deployment.disabledAt).toLocaleString(DateTime.DATETIME_FULL)}
                                </div>
                              }
                              reference={() => document.getElementById(labelId)!}
                            />
                          );

                          return (
                            <Tr key={rowIndex}>
                              <Td key={`${rowIndex}-name`} dataLabel='Name'>
                                {deployment.name}
                              </Td>
                              <Td key={`${rowIndex}-status`} dataLabel='Status'>
                                {deployment.enabled ? (
                                  <Label color='green' icon={<CheckCircleIcon />}>
                                    Enabled
                                  </Label>
                                ) : (
                                  <Label color='red' icon={<BanIcon />}>
                                    Disabled
                                  </Label>
                                )}
                              </Td>
                              <Td key={`${rowIndex}-timestamp`} dataLabel='Timestamp'>
                                <>
                                  <span id={labelId}>
                                    {deployment.enabled
                                      ? DateTime.fromISO(deployment.enabledAt).toRelative()
                                      : DateTime.fromISO(deployment.disabledAt).toRelative()}
                                  </span>
                                  {tooltip}
                                </>
                              </Td>
                            </Tr>
                          );
                        })}
                      </Tbody>
                    </TableComposable>
                  </>
                )}
              </FlexItem>
            </Flex>
          </TabContentBody>
        </TabContent>
        <TabContent key={1} eventKey={1} id={`tabContent${1}`} activeKey={activeTabKey} hidden={1 !== activeTabKey}>
          <TabContentBody>
            <Grid hasGutter={true}>
              <GridItem lg={8}>
                <Card isFullHeight={true}>
                  <CardTitle>
                    <Title headingLevel='h3' size='lg'>
                      Operating System / JVM
                    </Title>
                  </CardTitle>
                  <CardBody>
                    {status.os.name} {status.os.version}, {status.os.processors} processor(s)
                    <br />
                    {status.runtime.jvmName} {status.runtime.spec}
                    <br />
                    Uptime:{' '}
                    {Duration.fromMillis(status.runtime.uptime)
                      .shiftTo('hours', 'minutes', 'seconds')
                      .toHuman({ listStyle: 'long' })}
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem lg={4}>
                <Card id='threads' component='div'>
                  <CardTitle>
                    <Title headingLevel='h4' size='lg'>
                      Threads
                    </Title>
                  </CardTitle>
                  <CardBody>
                    <ChartDonutUtilization
                      ariaDesc='Daemon threads'
                      ariaTitle='Daemon threads'
                      data={{ x: 'daemon threads', y: Number((status.threads.daemons / status.threads.threads) * 100) }}
                      labels={({ datum }) => (datum.x ? `${status.threads.daemons} ${datum.x}` : null)}
                      name='daemon-threads'
                      title={`${Number((status.threads.daemons / status.threads.threads) * 100).toFixed(0)}%`}
                      thresholds={[{ value: 75 }, { value: 90 }]}
                      subTitle={`of ${status.threads.threads} daemons`}
                      height={200}
                      width={350}
                      constrainToVisibleArea={true}
                    />
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem lg={6}>
                <Card id='heap-memory' component='div'>
                  <CardTitle>
                    <Title headingLevel='h3' size='lg'>
                      Heap memory
                    </Title>
                  </CardTitle>
                  <CardBody>
                    <Flex>
                      <FlexItem flex={{ default: 'flex_1' }}>
                        <p style={{ textAlign: 'center' }}>Used</p>
                        <ChartDonutUtilization
                          ariaDesc='Used heap memory'
                          ariaTitle='Used heap memory'
                          data={{ x: 'Used heap memory', y: Number((status.heap.used / status.heap.max) * 100) }}
                          labels={({ datum }) => (datum.x ? `${datum.x}: ${status.heap.used} MB` : null)}
                          name='used-heap'
                          title={`${Number((status.heap.used / status.heap.max) * 100).toFixed(0)}%`}
                          thresholds={[{ value: 75 }, { value: 90 }]}
                          subTitle={`of ${status.heap.max} MB`}
                          height={200}
                          width={350}
                          constrainToVisibleArea={true}
                        />
                      </FlexItem>
                      <Divider orientation={{ default: 'vertical' }} />
                      <FlexItem flex={{ default: 'flex_1' }}>
                        <p style={{ textAlign: 'center' }}>Committed</p>
                        <ChartDonutUtilization
                          ariaDesc='Committed heap memory'
                          ariaTitle='Committed heap memory'
                          data={{
                            x: 'Committed heap memory',
                            y: Number((status.heap.committed / status.heap.max) * 100),
                          }}
                          labels={({ datum }) => (datum.x ? `${datum.x}: ${status.heap.committed} MB` : null)}
                          name='committed-heap'
                          title={`${Number((status.heap.committed / status.heap.max) * 100).toFixed(0)}%`}
                          thresholds={[{ value: 75 }, { value: 90 }]}
                          subTitle={`of ${status.heap.max} MB`}
                          height={200}
                          width={350}
                          constrainToVisibleArea={true}
                        />
                      </FlexItem>
                    </Flex>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem lg={6}>
                <Card id='heap-memory' component='div'>
                  <CardTitle>
                    <Title headingLevel='h3' size='lg'>
                      Non-heap memory
                    </Title>
                  </CardTitle>
                  <CardBody>
                    <Flex>
                      <FlexItem flex={{ default: 'flex_1' }}>
                        <p style={{ textAlign: 'center' }}>Used</p>
                        <ChartDonutUtilization
                          ariaDesc='Used non-heap memory'
                          ariaTitle='Used non-heap memory'
                          data={{
                            x: 'Used non-heap memory',
                            y: Number((status.nonHeap.used / status.nonHeap.max) * 100),
                          }}
                          labels={({ datum }) => (datum.x ? `${datum.x}: ${status.nonHeap.used} MB` : null)}
                          name='used-non-heap'
                          title={`${Number((status.nonHeap.used / status.nonHeap.max) * 100).toFixed(0)}%`}
                          thresholds={[{ value: 75 }, { value: 90 }]}
                          subTitle={`of ${status.nonHeap.max} MB`}
                          height={200}
                          width={350}
                          constrainToVisibleArea={true}
                        />
                      </FlexItem>
                      <Divider orientation={{ default: 'vertical' }} />
                      <FlexItem flex={{ default: 'flex_1' }}>
                        <p style={{ textAlign: 'center' }}>Committed</p>
                        <ChartDonutUtilization
                          ariaDesc='Committed non-heap memory'
                          ariaTitle='Committed non-heap memory'
                          data={{
                            x: 'Committed non-heap memory',
                            y: Number((status.nonHeap.committed / status.nonHeap.max) * 100),
                          }}
                          labels={({ datum }) => (datum.x ? `${datum.x}: ${status.nonHeap.committed} MB` : null)}
                          name='committed-non-heap'
                          title={`${Number((status.nonHeap.committed / status.nonHeap.max) * 100).toFixed(0)}%`}
                          thresholds={[{ value: 75 }, { value: 90 }]}
                          subTitle={`of ${status.nonHeap.max} MB`}
                          height={200}
                          width={350}
                          constrainToVisibleArea={true}
                        />
                      </FlexItem>
                    </Flex>
                  </CardBody>
                </Card>
              </GridItem>
            </Grid>
          </TabContentBody>
        </TabContent>
        <TabContent key={2} eventKey={2} id={`tabContent${2}`} activeKey={activeTabKey} hidden={2 !== activeTabKey}>
          <TabContentBody>Properties panel - not yet implemented!</TabContentBody>
        </TabContent>
      </PageSection>
    </>
  );
};

export default WildFlyServerDetail;
