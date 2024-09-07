import { _getManager, ManagerInterface } from "apps/Editorial/Base/Manager";
import { QuestionInterface } from "apps/Editorial/Sidebars/RightSidebar/InactiveSidebar";

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
    const questionIndex = questions.data.findIndex((q:QuestionInterface) => q.hash == hash);
    return questionIndex;
}

export const updateQuestionData = (dataIndex : number, questionHash : string, data : any, dataKey : string) => {
    const questionComponent : any = getQuestionsComponent();
    if (questionComponent) {
        const questionList = questionComponent.data;
        const activeQuestionIndex = getQuestionIndex(questionHash);
        const previousData = questionList[activeQuestionIndex][dataKey] ?? [];
        previousData[dataIndex] = {
            ...(previousData[dataIndex] ?? {}),
            ...data
        }
        const questionData = {
            ...questionList[activeQuestionIndex],
        }
        questionData[dataKey] = previousData;
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

export const questionLayoutInitialized = (question : QuestionInterface) => {
    const manager = _getManager();
    const slides = manager.lesson.lesson_slides;
    const activeSlide = slides[manager.slideManager.activeSlide];
    const questionsComponent = activeSlide.slide_data.find((c:any) => c.component == "Questions")
    const getQuestion = questionsComponent.data.find((q:any) => q.hash == question.hash);
    return !!getQuestion.useOptionLayout && !!question.useOptionLayout;
}