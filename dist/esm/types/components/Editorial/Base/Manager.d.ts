import { ComponentLayoutInterface, QuestionInterface } from "components/interface";
import { SlideManagerInterface } from "./SlideManager";
import { CanvasManagerInterface } from "./CanvasManager";
import { SidebarManagerInterface } from "./SidebarManager";
import { ActiveViewBoxState, CurrentStylesState, FeedbackState, GridState, OptionsDataState, OverlayActiveState, RightSidebarState, ShowOptionsBoxState, SliderState, TriggerState } from "./StateInterface";
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
}
export interface ManagerInterface {
    sidebarManager: SidebarManagerInterface;
    canvasManager: CanvasManagerInterface;
    slideManager: SlideManagerInterface;
    states: States;
    setState: Function;
    triggerRender: Function;
}
declare class Manager implements ManagerInterface {
    sidebarManager: SidebarManagerInterface;
    canvasManager: CanvasManagerInterface;
    slideManager: SlideManagerInterface;
    states: States;
    triggerRender: Function;
    constructor(slides: any[]);
    setState(key: string, setter: any | Function): void;
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
    addOrRemoveRowOrColumns(parsedDimensions: {
        rows: number;
        cols: number;
    }, type: string, direction: "rows" | "cols"): void;
}
export declare const CreateManager: (slides: any[]) => Manager;
export {};
