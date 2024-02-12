import { ManagerInterface } from "./Manager";

interface States {
  rightSidebarState: boolean;
}

export interface SidebarManagerInterface {
  manager: ManagerInterface;
  states: States;
  setState: Function;
}

export class SidebarManager
  implements SidebarManagerInterface
{
  manager: ManagerInterface;
  states: States;

  constructor(manager: ManagerInterface) {
    this.manager = manager;
    this.states = {
      rightSidebarState: false,
    };
  }

  setState(data: { [key: string]: any }) {
    this.states = {
      ...this.states,
      ...data,
    };
  }
}
