/// <reference path="../.astro/types.d.ts" />

declare module "elevator.js" {
  export default class Elevator {
    constructor(options: Record<string, unknown>);
  }
}
