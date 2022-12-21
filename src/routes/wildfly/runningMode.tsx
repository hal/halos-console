import { Label, Tooltip } from '@patternfly/react-core';
import { CheckCircleIcon, LockedIcon, UnknownIcon } from '@patternfly/react-icons';

import { RunningMode, WildFlyServer } from '~/model/wildfly';

interface RunningModeLabelProps {
  server: WildFlyServer;
  tooltip: boolean;
}

const RunningModeLabel = ({ server, tooltip }: RunningModeLabelProps) => {
  const labelId = `${server.name}-running-mode-label`;
  const tooltipId = `${server.name}-running-mode-tooltip`;
  let labelElement;
  const tooltipElement = (
    <Tooltip
      id={tooltipId}
      content={<div>Running mode</div>}
      reference={() => document.getElementById(labelId) as HTMLElement}
    />
  );
  switch (server.runningMode) {
    case RunningMode.NORMAL:
      labelElement = (
        <Label id={labelId} color='green' icon={<CheckCircleIcon />} aria-describedby={tooltipId}>
          normal
        </Label>
      );

      break;
    case RunningMode.ADMIN_ONLY:
      labelElement = (
        <Label id={labelId} color='grey' icon={<LockedIcon />}>
          admin only
        </Label>
      );
      break;
    case RunningMode.UNDEFINED:
      labelElement = (
        <Label id={labelId} color='grey' icon={<UnknownIcon />}>
          undefined
        </Label>
      );
      break;
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

export default RunningModeLabel;
