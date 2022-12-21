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

export enum DeploymentStatus {
  OK = 'OK',
  FAILED = 'FAILED',
  STOPPED = 'STOPPED',
  UNDEFINED = 'UNDEFINED',
}

export interface Deployment {
  name: string;
  status: DeploymentStatus;
  enabled: boolean;
  disabledAt: string;
  enabledAt: string;
}

export interface WildFlyServer {
  managedService: string;
  name: string;
  productName: string;
  productVersion: string;
  coreVersion: string;
  managementVersion: string;
  runningMode: RunningMode;
  serverState: ServerState;
  suspendState: SuspendState;
  deployments: Deployment[];
}
