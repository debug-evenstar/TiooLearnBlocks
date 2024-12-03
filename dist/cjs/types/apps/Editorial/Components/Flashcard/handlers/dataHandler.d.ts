import { ComponentBaseDataInterface, QuestionInterface } from "components/interface";
export interface Card {
    url: string;
    alternatives: any[];
}
interface FlashCardComponentDataInterface extends ComponentBaseDataInterface {
    cards?: [Card];
    question?: QuestionInterface;
}
export declare const setFlashCardComponentData: (cards: any) => FlashCardComponentDataInterface;
export declare const setFlashCardQuestionData: (question: QuestionInterface) => FlashCardComponentDataInterface;
export {};
