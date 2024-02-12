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
export interface CanvasManagerInterface {
    manager: ManagerInterface;
    canvas: CanvasInterface;
    activeComponent: DataGroupInterface;
    activeSlide?: ComponentBaseDataInterface[];
    setActiveComponent: Function;
    updateActiveSlide: Function;
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
    updateActiveSlide(slideData: ComponentBaseDataInterface[]): void;
    getComponentIndex(id: string): number | undefined;
    getComponentData(id: string): {};
    activeComponentElement(): HTMLDivElement | undefined;
    registerComponentDataHandlers(): void;
    createComponent(componentName: string, id: string): any;
}
export {};
