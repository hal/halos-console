import { Component } from 'react';
import { Outlet } from 'react-router';

import { ManagedService, ManagedServiceModification, Modification } from '~/model/service';

import Layout from './layout';

export interface RootState {
  services: ManagedService[];
}

export class Root extends Component<object, RootState> {
  eventSource: EventSource | undefined;

  componentWillUnmount() {
    if (this.eventSource != null) {
      this.eventSource.close();
    }
  }

  componentDidMount() {
    fetch('/api/v1/services')
      .then((response) => response.json())
      .then((json) => {
        const services = json as ManagedService[];
        this.setState({ services: services });
      });

    this.eventSource = new EventSource('/api/v1/services/modifications');
    this.eventSource.onmessage = (event) => {
      const msm = JSON.parse(event.data) as ManagedServiceModification;

      if (msm.modification === Modification.ADD) {
        const added = [...this.state.services, msm.managedService];
        this.setState({ services: added });
      } else if (msm.modification === Modification.UPDATE) {
        const currentIndex = this.state.services.findIndex((ms) => ms.name === msm.managedService.name);
        const updated = [
          ...this.state.services.slice(0, currentIndex),
          msm.managedService,
          ...this.state.services.slice(currentIndex + 1),
        ];
        this.setState({ services: updated });
      } else if (msm.modification === Modification.DELETE) {
        const deleted = this.state.services.filter((ms) => ms.name !== msm.managedService.name);
        this.setState({ services: deleted });
      }
    };
  }

  render() {
    return (
      <Layout>
        <Outlet context={this.state} />
      </Layout>
    );
  }
}
