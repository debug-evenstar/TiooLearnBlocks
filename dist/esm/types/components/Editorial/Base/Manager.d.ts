import { ComponentLayoutInterface } from "components/interface";
import { SlideManagerInterface } from "./SlideManager";
import { CanvasManagerInterface, CanvasStates } from "./CanvasManager";
import { SidebarManagerInterface } from "./SidebarManager";
import { ActiveViewBoxState, CurrentStylesState, FeedbackState, GridState, NoTextInTextBoxState, OptionsDataState, OverlayActiveState, RightSidebarState, ShowOptionsBoxState, SliderState, TriggerState } from "./StateInterface";
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
interface States {
    slideComponents: any[];
    canvasStates?: CanvasStates;
    activeViewBox: ActiveViewBoxState;
    feedback: FeedbackState;
    optionsData: OptionsDataState;
    overlayActive: OverlayActiveState;
    showOptionsBox: ShowOptionsBoxState;
    slider: SliderState;
    trigger: TriggerState;
    rightSidebarState: RightSidebarState;
    grid: GridState;
    currentStyles: CurrentStylesState;
    noTextInViewbox: NoTextInTextBoxState;
}
export interface ManagerInterface {
    sidebarManager: SidebarManagerInterface;
    canvasManager: CanvasManagerInterface;
    slideManager: SlideManagerInterface;
    states: States;
    setState: Function;
    triggerRender: Function;
}
declare global {
    interface Window {
        Manager: ManagerInterface;
    }
}
export declare const _getManager: () => ManagerInterface;
export declare const CreateManager: (slides: any[]) => ManagerInterface;
export {};
