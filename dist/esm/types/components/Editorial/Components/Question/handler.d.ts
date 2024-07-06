import { QuestionInterface } from "components/Editorial/Sidebars/RightSidebar/InactiveSidebar";
export {};
export declare const getQuestionsComponent: () => false | import("../../../interface").ComponentBaseDataInterface;
export declare const getQuestionIndex: (hash: string) => any;
export declare const updateQuestionData: (dataIndex: number, questionHash: string, data: any, dataKey: string) => void;
export declare const updateQuestionInSlide: (questionData: QuestionInterface) => void;
