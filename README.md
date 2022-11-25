# halOS Console

halOS stands for HAL on OpenShift. It's a special [HAL](https://hal.github.io/) edition for WildFly instances running on OpenShift.

## Architecture

![halos](halos.png)

halOS consists of two parts:

1. [Proxy](https://github.com/hal/halos-proxy)
2. Console (this repository)

This repository contains the console. The console is a [RIA](https://en.wikipedia.org/wiki/Rich_web_application) / [SPA](https://en.wikipedia.org/wiki/Single-page_application) following the design guidelines from [PatternFly](https://www.patternfly.org/v4/). It uses the REST API exposed by the [proxy](https://github.com/hal/halos-proxy).  

## Technical Stack

- [TypeScript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/)
- [PatternFly](https://patternfly.org)
