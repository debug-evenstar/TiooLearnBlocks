import { _getManager } from "components/Editorial/Base/Manager";
import { QuestionInterface } from "components/Editorial/Sidebars/RightSidebar/InactiveSidebar";

export {};

export const getQuestionsComponent = () => {
    const manager = _getManager();
    const questions = manager.canvasManager.activeSlide?.filter((item : any) => item.component == "Questions");
    if (questions && questions.length) {
        return questions[0];
    }
    return false;
}

export const getQuestionIndex = (hash : string) => {
    const questions : any = getQuestionsComponent();
    const questionIndex = questions.data.indexOf(
        questions.data.filter((q:QuestionInterface) => q.hash == hash)[0]
    );
    return questionIndex;
}

export const updateQuestionOption = (optionIndex : number, questionHash : string, optionData : any) => {
    const questionComponent : any = getQuestionsComponent();
    if (questionComponent) {
        const questionList = questionComponent.data;
        const activeQuestionIndex = getQuestionIndex(questionHash);
        const options = questionList[activeQuestionIndex].options;
        options[optionIndex] = {
            ...(options[optionIndex] ?? {}),
            ...optionData
        }
        const questionData = {
            ...questionList[activeQuestionIndex],
            options
        }
        updateQuestionInSlide(questionData);
    }
}

export const updateQuestionInSlide = (questionData : QuestionInterface) => {
    const manager = _getManager();
    const updated = manager.canvasManager.activeSlide;
    const questionComponent : any = getQuestionsComponent();
    if (questionComponent && updated) {
        const questionsComponentIndex = updated?.indexOf(questionComponent);
        const questionClone = questionComponent.data;
        const activeQuestionIndex = getQuestionIndex(questionData.hash);
        questionClone[activeQuestionIndex] = {
            ...questionClone[activeQuestionIndex],
            ...questionData
        }
        updated[questionsComponentIndex] = {
            ...updated[questionsComponentIndex],
            data : questionClone
        } as any
    }
    manager.canvasManager.updateActiveSlide(updated);
    manager.canvasManager.updateSlides();
}