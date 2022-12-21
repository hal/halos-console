import {
  Flex,
  FlexItem,
  Label,
  List,
  ListItem,
  PageSection,
  PageSectionVariants,
  Text,
  TextContent,
  Tooltip,
} from '@patternfly/react-core';
import { BanIcon, CheckCircleIcon } from '@patternfly/react-icons';
import {
  ActionsColumn,
  ExpandableRowContent,
  IAction,
  OnCollapse,
  TableComposable,
  TableText,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@patternfly/react-table';
import { DateTime } from 'luxon';
import { useState } from 'react';
import { useLoaderData } from 'react-router';
import { NavLink } from 'react-router-dom';

import { Deployment, WildFlyServer } from '~/model/wildfly';
import RunningModeLabel from '~/routes/wildfly/runningMode';
import ServerStateLabel from '~/routes/wildfly/serverState';

export const wildFlyServersLoader = async (): Promise<WildFlyServer[]> => {
  const results = await fetch('/api/v1/wildfly/servers');
  if (!results.ok) throw new Error('Unable to load WildFly servers!');
  return await results.json();
};

function deploymentElement(deployment: Deployment) {
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
    <Flex>
      <FlexItem>{deployment.name}</FlexItem>
      <FlexItem>
        {deployment.enabled ? (
          <Label color='green' icon={<CheckCircleIcon />}>
            Enabled
          </Label>
        ) : (
          <Label color='red' icon={<BanIcon />}>
            Disabled
          </Label>
        )}
      </FlexItem>
      <FlexItem>
        <>
          <span id={labelId}>
            {deployment.enabled
              ? DateTime.fromISO(deployment.enabledAt).toRelative()
              : DateTime.fromISO(deployment.disabledAt).toRelative()}
          </span>
          {tooltip}
        </>
      </FlexItem>
    </Flex>
  );
}

const WildFlyServers = () => {
  const servers = useLoaderData() as WildFlyServer[];
  const [tableExpanded, setTableExpanded] = useState(servers.map(() => false));

  const toggleTable: OnCollapse = (_, index) => {
    setTableExpanded({
      ...tableExpanded,
      [index]: !tableExpanded[index],
    });
  };

  const serverActions = (server: WildFlyServer): IAction[] => [
    {
      title: 'Start',
      onClick: () => alert(`Start is not implemented for ${server.name}`),
    },
    {
      title: 'Stop',
      onClick: () => alert(`Stop is not implemented for ${server.name}`),
    },
    {
      isSeparator: true,
    },
    {
      title: 'Suspend',
      onClick: () => alert(`Suspend is not implemented for ${server.name}`),
    },
    {
      title: 'Resume',
      onClick: () => alert(`Resume is not implemented for ${server.name}`),
    },
  ];

  return (
    <>
      <PageSection variant={PageSectionVariants.light}>
        <TextContent>
          <Text component='h1'>WildFly Servers</Text>
          <Text>
            WildFly is a flexible, lightweight, managed application runtime that helps you build amazing applications.
          </Text>
          <Text>
            For more info, please visit{' '}
            <a href='https://www.wildfly.org/' target='_blank' rel='noreferrer'>
              https://www.wildfly.org/
            </a>
          </Text>
        </TextContent>
      </PageSection>
      <PageSection>
        <TableComposable aria-label='WildFly servers'>
          <Thead>
            <Tr>
              <Th />
              <Th key='name'>Name</Th>
              <Th key='server'>Server</Th>
              <Th key='management-version' modifier='wrap'>
                Management version
              </Th>
              <Th key='state'>Running mode / server state</Th>
              <Th />
            </Tr>
          </Thead>
          {servers.map((server, rowIndex) => {
            const expandable = server.deployments.length != 0;
            const deployments = expandable ? (
              <Tr key={`${rowIndex}-exp`} isExpanded={tableExpanded[rowIndex]}>
                <Td />
                <Td colSpan={5}>
                  <ExpandableRowContent>
                    <List isPlain>
                      {server.deployments.map((deployment) => (
                        <ListItem key={deployment.name}>{deploymentElement(deployment)}</ListItem>
                      ))}
                    </List>
                  </ExpandableRowContent>
                </Td>
              </Tr>
            ) : null;
            const row = (
              <Tr key={`${rowIndex}`}>
                <Td
                  key={`${rowIndex}-tgl`}
                  expand={
                    expandable
                      ? {
                          rowIndex: rowIndex,
                          isExpanded: tableExpanded[rowIndex],
                          onToggle: toggleTable,
                        }
                      : undefined
                  }
                />
                <Td key={`${rowIndex}-name`} dataLabel='Name'>
                  <TableText>
                    <NavLink to={`${server.name}`}>{server.name}</NavLink>
                  </TableText>
                </Td>
                <Td key={`${rowIndex}-product-name`} dataLabel='Product name'>
                  {server.productName} {server.productVersion}
                </Td>
                <Td key={`${rowIndex}-management-version`} dataLabel='Management version'>
                  {server.managementVersion}
                </Td>
                <Td key={`${rowIndex}-state`} dataLabel='State'>
                  <Flex>
                    <FlexItem>
                      <RunningModeLabel server={server} tooltip={true} />
                    </FlexItem>
                    <FlexItem>
                      <ServerStateLabel server={server} tooltip={true} />
                    </FlexItem>
                  </Flex>
                </Td>
                <Td isActionCell>
                  <ActionsColumn items={serverActions(server)}></ActionsColumn>
                </Td>
              </Tr>
            );
            return (
              <Tbody key={rowIndex} isExpanded={expandable ? tableExpanded[rowIndex] : false}>
                {row}
                {deployments}
              </Tbody>
            );
          })}
        </TableComposable>
      </PageSection>
    </>
  );
};

export default WildFlyServers;
