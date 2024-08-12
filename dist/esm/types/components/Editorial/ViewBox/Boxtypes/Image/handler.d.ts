import { ComponentBaseDataInterface, QuestionInterface } from "components/interface";
interface ImageComponentDataInterface extends ComponentBaseDataInterface {
    url?: string;
}
interface ImageExtensions {
    type: "input";
    x: number;
    y: number;
    width: number;
    height: number;
    question?: QuestionInterface;
}
export declare const imageComponentData: (imageData: {
    url?: string;
    extensions?: ImageExtensions[];
}) => ImageComponentDataInterface;
export declare const uploadFile: (lessonId: number, file: File) => Promise<any>;
export declare const toggleWrapperSize: (element: HTMLDivElement, style: string, styleType: string) => void;
export {};
