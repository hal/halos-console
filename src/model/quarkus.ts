import { ManagedService } from '~/model/service';

export interface QuarkusServiceType {
  managedService: ManagedService;
  routes: string[];
}
