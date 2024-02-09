import { EditorialManagerInterface } from "./EditorialManager";
interface States {
    rightSidebarState: boolean;
}
export interface EditorialSidebarManagerInterface {
    manager: EditorialManagerInterface;
    states: States;
    setState: Function;
}
export declare class EditorialSidebarManager implements EditorialSidebarManagerInterface {
    manager: EditorialManagerInterface;
    states: States;
    constructor(manager: EditorialManagerInterface);
    setState(data: {
        [key: string]: any;
    }): void;
}
export {};
