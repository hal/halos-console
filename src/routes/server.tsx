import { Card, CardBody, Gallery, GalleryItem, PageSection } from '@patternfly/react-core';
import { useLoaderData } from 'react-router';

export interface ServerType {
  uid: string;
  serverId: string;
  serverName: string;
  productName: string;
  productVersion: string;
  coreVersion: string;
  managementVersion: string;
  runningMode: RunningMode;
  serverState: ServerState;
  suspendState: SuspendState;
}

export enum RunningMode {
  NORMAL = 'NORMAL',
  ADMIN_ONLY = 'ADMIN_ONLY',
  UNDEFINED = 'UNDEFINED',
}

export enum ServerState {
  STARTING = 'STARTING',
  RUNNING = 'RUNNING',
  STOPPED = 'STOPPED',
  RESTART_REQUIRED = 'RESTART_REQUIRED',
  RELOAD_REQUIRED = 'RELOAD_REQUIRED',
  UNDEFINED = 'UNDEFINED',
}

export enum SuspendState {
  RUNNING = 'RUNNING',
  PRE_SUSPEND = 'PRE_SUSPEND',
  SUSPENDING = 'SUSPENDING',
  SUSPENDED = 'SUSPENDED',
  UNDEFINED = 'UNDEFINED',
}

export const serversLoader = async (): Promise<ServerType[]> => {
  const results = await fetch('/api/v1/server');
  if (!results.ok) throw new Error('Unable to load servers!');
  return await results.json();
};

const Server = () => {
  const servers = useLoaderData() as ServerType[];
  return (
    <PageSection>
      <Gallery hasGutter>
        {servers.map((server, i) => (
          <GalleryItem key={i}>
            <Card>
              <CardBody>{server.serverName}</CardBody>
            </Card>
          </GalleryItem>
        ))}
      </Gallery>
    </PageSection>
  );
};

export default Server;
