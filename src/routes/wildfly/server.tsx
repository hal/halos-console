import {
  Breadcrumb,
  BreadcrumbItem,
  DescriptionList,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTermHelpText,
  DescriptionListTermHelpTextButton,
  Flex,
  FlexItem,
  PageBreadcrumb,
  PageSection,
  PageSectionVariants,
  Popover,
  Tab,
  TabContent,
  TabContentBody,
  Tabs,
  TabTitleText,
  Title,
} from '@patternfly/react-core';
import { ReactNode, useState } from 'react';
import { useLoaderData } from 'react-router';
import { LoaderFunctionArgs } from 'react-router-dom';

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
  const [activeTabKey, setActiveTabKey] = useState(0);
  const handleTabClick = (tabIndex: number) => setActiveTabKey(tabIndex);

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
      <PageSection isWidthLimited variant={PageSectionVariants.light}>
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
      <PageSection isWidthLimited variant={PageSectionVariants.light}>
        <TabContent key={0} eventKey={0} id={`tabContent${0}`} activeKey={activeTabKey} hidden={0 !== activeTabKey}>
          <TabContentBody>
            <Flex direction={{ default: 'column' }}>
              <FlexItem spacer={{ default: 'spacerLg' }}>
                <Title
                  headingLevel='h2'
                  size='lg'
                  className='pf-u-mt-sm'
                  id='wildfly-server-details'
                >
                  WildFly server details
                </Title>
              </FlexItem>
              <FlexItem>
                <DescriptionList
                  columnModifier={{ lg: '2Col' }}
                  aria-labelledby='wildfly-server-details'
                >
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
                    <div>The version of the WildFly Core based product release that is being run by this server.</div>,
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
                      ADMIN_ONLY server will start any configured management interfaces and accept management requests,
                      but will not start services used for handling end user requests.
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
          </TabContentBody>
        </TabContent>
        <TabContent key={1} eventKey={1} id={`tabContent${1}`} activeKey={activeTabKey} hidden={1 !== activeTabKey}>
          <TabContentBody>Status panel</TabContentBody>
        </TabContent>
        <TabContent key={2} eventKey={2} id={`tabContent${2}`} activeKey={activeTabKey} hidden={2 !== activeTabKey}>
          <TabContentBody>Properties panel</TabContentBody>
        </TabContent>
      </PageSection>
    </>
  );
};

export default WildFlyServerDetail;
