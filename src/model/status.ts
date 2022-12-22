export interface Threads {
  threads: number;
  daemons: number;
}

export interface Memory {
  used: number;
  committed: number;
  max: number;
}

export interface Runtime {
  jvmName: string;
  spec: string;
  uptime: number;
}

export interface OperatingSystem {
  name: string;
  version: string;
  processors: number;
}

export interface Status {
  os: OperatingSystem;
  runtime: Runtime;
  heap: Memory;
  nonHeap: Memory;
  threads: Threads;
}

export const EMPTY_STATUS: Status = {
  os: {
    name: '',
    version: '',
    processors: 0,
  },
  runtime: {
    jvmName: '',
    spec: '',
    uptime: 0,
  },
  heap: {
    used: 0,
    committed: 0,
    max: 0,
  },
  nonHeap: {
    used: 0,
    committed: 0,
    max: 0,
  },
  threads: {
    threads: 0,
    daemons: 0,
  },
};
