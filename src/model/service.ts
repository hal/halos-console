import quarkusLogo from '~/assets/quarkus.svg';
import serviceLogo from '~/assets/service.svg';
import wildFlyLogo from '~/assets/wildfly.svg';

export enum ConnectionStatus {
  PENDING = 'PENDING',
  CONNECTED = 'CONNECTED',
  FAILED = 'FAILED',
}

export enum Modification {
  ADD = 'ADD',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export interface Capability {
  name: string;
  title: string;
}

export interface Connection {
  status: ConnectionStatus;
  timestamp: Date;
  message: string;
}

export interface ManagedService {
  name: string;
  connection: Connection;
  capabilities: Capability[];
}

export interface ManagedServiceModification {
  modification: Modification;
  managedService: ManagedService;
}

export const UNKNOWN_CAPABILITY: Capability = {
  name: 'unknown',
  title: 'Unknown',
};

export function capabilityDescription(capability: Capability): string {
  switch (capability.name) {
    case 'quarkus':
      return 'Quarkus is a Kubernetes Native Java stack tailored for OpenJDK HotSpot and GraalVM, crafted from the best of breed Java libraries and standards.';
    case 'wildfly':
      return 'WildFly is a flexible, lightweight, managed application runtime that helps you build amazing applications.';
    default:
      return 'Unknown service';
  }
}

export function capabilityLogo(capability: Capability) {
  switch (capability.name) {
    case 'quarkus':
      return quarkusLogo;
    case 'wildfly':
      return wildFlyLogo;
    default:
      return serviceLogo;
  }
}
