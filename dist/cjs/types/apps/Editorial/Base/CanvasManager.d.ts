import { ComponentBaseDataInterface } from "components/interface";
import { DataGroupInterface, ManagerInterface } from "./Manager";
interface CanvasInterface {
    manager: CanvasManagerInterface;
    components: ComponentBaseDataInterface[];
    getCanvasSize: Function;
    getComponentData: Function;
    parseSlideToCanvas: Function;
    updateActiveComponentData: Function;
    saveActiveComponentData: Function;
    history: ComponentBaseDataInterface[][];
    data: {
        [key: string]: any;
    };
    functions: {
        [key: string]: Function;
    };
}
export type CanvasStates = {
    [key: string]: any;
};
export interface CanvasManagerInterface {
    manager: ManagerInterface;
    canvas: CanvasInterface;
    activeComponent: DataGroupInterface;
    activeSlide?: ComponentBaseDataInterface[];
    setActiveComponent: Function;
    updateActiveSlide: Function;
    updateSlides: Function;
    updateComponentInSlide: Function;
    getComponentIndex: Function;
    getComponentData: Function;
    activeComponentElement: Function;
    componentDataHandlers: {
        [key: string]: Function;
    };
    createComponent: Function;
}
export declare class CanvasManager implements CanvasManagerInterface {
    manager: ManagerInterface;
    canvas: CanvasInterface;
    activeComponent: DataGroupInterface;
    activeSlide?: ComponentBaseDataInterface[];
    componentDataHandlers: {
        [key: string]: Function;
    };
    constructor(manager: ManagerInterface);
    setActiveComponent(id: string): void;
    updateComponentInSlide(component: ComponentBaseDataInterface): void;
    updateActiveSlide(slideData: ComponentBaseDataInterface[]): void;
    updateSlides(): void;
    getComponentIndex(id: string): number | undefined;
    getComponentData(id: string): {};
    activeComponentElement(): HTMLDivElement | undefined;
    registerComponentDataHandlers(): void;
    createComponent(componentName: string, id: string): any;
}
export {};
