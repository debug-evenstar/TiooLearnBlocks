interface PositionProperties {
    offset: number;
    offsetPercent?: number;
}
interface ComponentPositionInterface {
    xAxis: PositionProperties;
    yAxis: PositionProperties;
}
interface ComponentSizeInterface {
    width: number;
    widthPercent?: number;
    height: number;
    heightPercent?: number;
}
interface ComponentLayoutInterface {
    position?: ComponentPositionInterface;
    size: ComponentSizeInterface;
}
export declare const setComponentLayout: (canvasProps: {
    width: number;
    height: number;
}, layoutData?: ComponentLayoutInterface) => {
    position: {
        xAxis: {
            offset: number;
            offsetPercent: number;
        };
        yAxis: {
            offset: number;
            offsetPercent: number;
        };
    };
    size: {
        width: number;
        widthPercent: number;
        height: number;
        heightPercent: number;
    };
};
interface ComponentStylesInterface {
    backgroundColor?: string;
    borderProperties?: {
        radius: string;
        stroke: number;
    };
}
export interface ComponentBaseDataInterface {
    component: string;
    theme: string | any;
    extensions?: any[];
    layout?: ComponentLayoutInterface;
    styles?: ComponentStylesInterface;
}
export interface DataGroupInterface {
    data: {
        [key: string]: any;
    };
    functions: {
        [key: string]: Function;
    };
    setFunction: Function;
}
export interface CanvasManagerInterface {
    parent: EditorialManagerInterface;
    canvas: DataGroupInterface;
    activeComponent: DataGroupInterface;
}
interface EditorialSlideManager {
    slides: any[];
    activeSlide: number;
}
export interface EditorialManagerInterface {
    sidebarManager: DataGroupInterface;
    canvasManager: CanvasManagerInterface;
    slideManager: EditorialSlideManager;
}
declare class EditorialManager implements EditorialManagerInterface {
    sidebarManager: DataGroupInterface;
    canvasManager: CanvasManagerInterface;
    slideManager: EditorialSlideManager;
    constructor(slides: any[]);
}
export declare const CreateEditorialManager: (slides: any[]) => EditorialManager;
export {};
