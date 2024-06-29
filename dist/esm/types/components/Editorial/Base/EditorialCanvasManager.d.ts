import { ComponentBaseDataInterface } from "components/interface";
import { DataGroupInterface, EditorialManagerInterface } from "./EditorialManager";
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
    manager: EditorialManagerInterface;
    canvas: CanvasInterface;
    activeComponent: DataGroupInterface;
    activeSlide?: ComponentBaseDataInterface[];
    setActiveComponent: Function;
    updateActiveSlide: Function;
    getComponentIndex: Function;
    getComponentData: Function;
    activeComponentElement: Function;
}
export declare class CanvasManager implements CanvasManagerInterface {
    manager: EditorialManagerInterface;
    canvas: CanvasInterface;
    activeComponent: DataGroupInterface;
    activeSlide?: ComponentBaseDataInterface[];
    constructor(manager: EditorialManagerInterface);
    setActiveComponent(id: string): void;
    updateActiveSlide(slideData: ComponentBaseDataInterface[]): void;
    getComponentIndex(id: string): number | undefined;
    getComponentData(id: string): {};
    activeComponentElement(): HTMLDivElement | undefined;
}
export {};
