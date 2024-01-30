import { ComponentLayoutInterface, QuestionInterface } from "components/interface";
import { EditorialSlideManagerInterface } from "./EditorialSlideManager";
import { CanvasManagerInterface } from "./EditorialCanvasManager";
import { EditorialSidebarManagerInterface } from "./EditorialSidebarManager";
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
    sidebarManager: EditorialSidebarManagerInterface;
    canvasManager: CanvasManagerInterface;
    slideManager: EditorialSlideManagerInterface;
}
declare class EditorialManager implements EditorialManagerInterface {
    sidebarManager: EditorialSidebarManagerInterface;
    canvasManager: CanvasManagerInterface;
    slideManager: EditorialSlideManagerInterface;
    constructor(slides: any[]);
    initCanvasManager(): void;
    updateActiveComponentData(data: any, type?: string, index?: number): void;
    updateSliderTextContent(content: string, index: number): void;
    updateSliderImageURL(url: string, index: number): void;
    updateActiveComponentObjective(data: any, type?: string, index?: number): void;
    updateObjectiveData(data: any, index: number, type?: string, slideIndex?: number): void;
    updateImageQuestion(data: any, type?: string, slideIndex?: string): void;
    updateObjectiveOptions(data: any, index: number, type?: string, slideIndex?: number): void;
    deleteObjectiveOptions(data: any, index: number, type?: string, slideIndex?: number): void;
    updateObjectiveOption(data: any, index: number, optionIndex: number, type?: string, slideIndex?: number): void;
    updateFeedbackType(type: any, index: number, optionIndex: number, componentType?: string, slideIndex?: number): void;
    updateFeedbackContent(content: any, index: number, optionIndex: number, componentType?: string, slideIndex?: number): void;
    updateFeedbackAnswer(answer: boolean, index: number, optionIndex: number, componentType?: string, slideIndex?: number): void;
    updateWrongOptions(data: any, index: number): void;
    updateImageQuestions(data: QuestionInterface, index: number): void;
    updateImageObjectiveOption(data: any, index: number, optionIndex: number): void;
    updateFlashcardQuestions(data: QuestionInterface, index: number): void;
    updateFlashcardQuestion(data: QuestionInterface, index: number): void;
    addComponentToSlider(data: any): void;
    getCanvasSize(): {
        width: number | undefined;
        height: number | undefined;
    };
    getComponentData(id: string): any;
    saveActiveComponentData(): void;
}
export declare const CreateEditorialManager: (slides: any[]) => EditorialManager;
export {};
