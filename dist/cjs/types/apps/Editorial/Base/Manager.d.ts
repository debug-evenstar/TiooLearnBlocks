import { ComponentLayoutInterface } from "components/interface";
import { SlideManagerInterface } from "./SlideManager";
import { CanvasManagerInterface, CanvasStates } from "./CanvasManager";
import { SidebarManagerInterface } from "./SidebarManager";
import { ActiveViewBoxState, CurrentStylesState, NoTextInTextBoxState, RightSidebarState, TriggerState } from "./StateInterface";
import { EventManagerInterface } from "./EventManager";
export declare const setComponentLayout: (canvasProps: {
    width: number;
    height: number;
}, layoutData?: ComponentLayoutInterface) => {
    size?: {
        width: number;
        widthPercent: number;
        height: number;
        heightPercent: number;
    } | undefined;
    position?: {
        xAxis: {
            offset: number;
            offsetPercent: number;
        };
        yAxis: {
            offset: number;
            offsetPercent: number;
        };
    } | undefined;
};
export interface DataGroupInterface {
    data: {
        [key: string]: any;
    };
    functions: {
        [key: string]: Function;
    };
}
export interface ManagerStates {
    slideComponents: any[];
    canvasStates?: CanvasStates;
    activeViewBox: ActiveViewBoxState;
    trigger: TriggerState;
    rightSidebarState: RightSidebarState;
    currentStyles: CurrentStylesState;
    noTextInViewbox: NoTextInTextBoxState;
}
export interface ManagerInterface {
    sidebarManager: SidebarManagerInterface;
    canvasManager: CanvasManagerInterface;
    slideManager: SlideManagerInterface;
    states: ManagerStates;
    setState: Function;
    triggerRender: Function;
    lesson?: any;
    event: EventManagerInterface;
}
declare global {
    interface Window {
        Manager: ManagerInterface;
    }
}
export declare const _getManager: () => ManagerInterface;
export declare const CreateManager: (slides: any[]) => ManagerInterface;
