import { ComponentLayoutInterface, QuestionInterface } from "components/interface";
import { EditorialSlideManagerInterface } from "./EditorialSlideManager";
import { CanvasManagerInterface } from "./EditorialCanvasManager";
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
export interface EditorialManagerInterface {
    sidebarManager: DataGroupInterface;
    canvasManager: CanvasManagerInterface;
    slideManager: EditorialSlideManagerInterface;
}
declare class EditorialManager implements EditorialManagerInterface {
    sidebarManager: DataGroupInterface;
    canvasManager: CanvasManagerInterface;
    slideManager: EditorialSlideManagerInterface;
    constructor(slides: any[]);
    initCanvasManager(): void;
    updateActiveComponentObjective(data: any): void;
    updateObjectiveData(data: any, index: number, type?: string): void;
    updateObjectiveOptions(data: any, index: number, type?: string): void;
    deleteObjectiveOptions(data: any, index: number): void;
    updateObjectiveOption(data: any, index: number, optionIndex: number, type?: string): void;
    updateFeedbackType(type: any, index: number, optionIndex: number, componentType?: string): void;
    updateFeedbackContent(content: any, index: number, optionIndex: number, componentType?: string): void;
    updateFeedbackAnswer(answer: boolean, index: number, optionIndex: number, componentType?: string): void;
    updateWrongOptions(data: any, index: number): void;
    updateImageQuestions(data: QuestionInterface, index: number): void;
    updateImageObjectiveOption(data: any, index: number, optionIndex: number): void;
    updateFlashcardQuestion(data: QuestionInterface, index: number): void;
}
export declare const CreateEditorialManager: (slides: any[]) => EditorialManager;
export {};
