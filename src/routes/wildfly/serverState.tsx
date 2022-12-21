import { Label, Tooltip } from '@patternfly/react-core';
import { HourglassStartIcon, PausedIcon, PlayIcon, RedoIcon, StopIcon, UnknownIcon } from '@patternfly/react-icons';

import { ServerState, SuspendState, WildFlyServer } from '~/model/wildfly';

interface ServerStateLabelProps {
  server: WildFlyServer;
  tooltip: boolean;
}

const ServerStateLabel = ({ server, tooltip }: ServerStateLabelProps) => {
  const labelId = `${server.name}-server-state-label`;
  const tooltipId = `${server.name}-server-state-tooltip`;
  let labelElement;
  const tooltipElement = tooltip ? (
    <Tooltip
      id={tooltipId}
      content={<div>Server state</div>}
      reference={() => document.getElementById(labelId) as HTMLElement}
    />
  ) : undefined;
  if (server.suspendState === SuspendState.SUSPENDING || server.suspendState === SuspendState.SUSPENDED) {
    labelElement = (
      <Label id={labelId} color='blue' icon={<PausedIcon />}>
        suspended
      </Label>
    );
  } else {
    switch (server.serverState) {
      case ServerState.STARTING:
        labelElement = (
          <Label id={labelId} color='orange' icon={<HourglassStartIcon />}>
            starting
          </Label>
        );
        break;
      case ServerState.RUNNING:
        labelElement = (
          <Label id={labelId} color='green' icon={<PlayIcon />}>
            running
          </Label>
        );
        break;
      case ServerState.STOPPED:
        labelElement = (
          <Label id={labelId} color='grey' icon={<StopIcon />}>
            stopped
          </Label>
        );
        break;
      case ServerState.RESTART_REQUIRED:
        labelElement = (
          <Label id={labelId} color='orange' icon={<RedoIcon />}>
            restart required
          </Label>
        );

        break;
      case ServerState.RELOAD_REQUIRED:
        labelElement = (
          <Label id={labelId} color='orange' icon={<RedoIcon />}>
            reload required
          </Label>
        );
        break;
      case ServerState.UNDEFINED:
        labelElement = (
          <Label id={labelId} color='grey' icon={<UnknownIcon />}>
            undefined
          </Label>
        );
        break;
    }
  }
  return tooltip ? (
    <>
      {labelElement}
      {tooltipElement}
    </>
  ) : (
    labelElement
  );
};

export default ServerStateLabel;
