export interface HostAndPort {
  host: string;
  port: number;
}

export interface QuarkusService {
  managedService: string;
  routes: HostAndPort[];
}
