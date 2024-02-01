import { EditorialManagerInterface } from "./EditorialManager";

interface States {
  rightSidebarState: boolean;
}

export interface EditorialSidebarManagerInterface {
  manager: EditorialManagerInterface;
  states: States;
  setState: Function;
}

export class EditorialSidebarManager
  implements EditorialSidebarManagerInterface
{
  manager: EditorialManagerInterface;
  states: States;

  constructor(manager: EditorialManagerInterface) {
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
