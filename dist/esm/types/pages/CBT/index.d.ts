import React from "react";
export interface AssessmentAnswerInterface {
    [subject_id: string | number]: {
        [slide_id: string | number]: {
            hash: string;
            isAnswer: boolean;
        };
    };
}
interface AssessmentPageProps {
    goHome: Function;
    goBack: Function;
    duration: number;
    examData: any;
    studentName: string;
}
export interface ResultInterface {
    subject: {
        id: number;
        name: string;
    };
    scores: {
        correctCount: number;
        subjectScore: number;
        over: number;
    };
}
export interface AssessmentResultInterface {
    answers: ResultInterface[];
    slides: any;
    score: number;
}
declare const AssessmentPage: React.FC<AssessmentPageProps>;
export default AssessmentPage;
