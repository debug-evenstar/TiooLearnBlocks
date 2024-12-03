import { ManagerInterface } from "./Manager";
interface States {
    rightSidebarState: boolean;
}
export interface SidebarManagerInterface {
    manager: ManagerInterface;
    states: States;
    setState: Function;
}
export declare class SidebarManager implements SidebarManagerInterface {
    manager: ManagerInterface;
    states: States;
    constructor(manager: ManagerInterface);
    setState(data: {
        [key: string]: any;
    }): void;
}
export {};
