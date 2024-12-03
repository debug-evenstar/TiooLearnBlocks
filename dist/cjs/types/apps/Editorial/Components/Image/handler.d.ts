import { ComponentBaseDataInterface, ComponentLayoutInterface } from "components/interface";
interface ImageComponentDataInterface extends ComponentBaseDataInterface {
    url?: string;
}
export declare enum ImageExtensionTypes {
    InputOverlay = "InputOverlay"
}
export interface ImageExtension {
    type: ImageExtensionTypes;
    layout?: ComponentLayoutInterface;
    data: any;
}
export declare const imageComponentData: (imageData: {
    url?: string;
    extensions?: ImageExtension[];
}) => ImageComponentDataInterface;
export declare const uploadFile: (lessonId: number, file: File) => Promise<any>;
export declare const toggleWrapperSize: (element: HTMLDivElement, style: string, styleType: string) => void;
export declare const handleDropIntoImage: (e: any, extensions: ImageExtension[]) => ImageExtension[];
export {};
