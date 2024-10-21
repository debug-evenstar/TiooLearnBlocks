import { OptionInterface } from "apps/Editorial/Sidebars/RightSidebar/Questions/ActiveQuestion";
import { FeedbackType } from "components/NewLesson/Popups";

export const triggerFeedback = (
    option: OptionInterface,
    lessonContext: any,
    shouldContinue = true
) => {
    if (option.feedback && lessonContext) {
        const feedback = option.feedback;
        lessonContext.feedbackRef.current.showFeedback(
            feedback.title,
            feedback.content,
            option.isAnswer ? FeedbackType.CORRECT : FeedbackType.WRONG,
            shouldContinue
        );
    }
};

export const getQuestionsComponent = (slide: any, hash: string) => {
    const questions = slide.filter(
        (item: any) => item.component === "Questions"
    );
    if (questions && questions.length) {
        const question = questions[0].data.filter((q: any) => q.hash == hash);
        return question.length ? question[0] : false;
    }
    return false;
};

export const attachTextInputHandler = (
    element: HTMLElement,
    slide: any,
    onAnswer: Function
) => {
    if (element) {
        const inputs  = element
        .querySelectorAll("input[data-link=Questions]");
        
            inputs.forEach((input: any, index : number) => {
                const questionHash = input.getAttribute("data-question-hash");
                input.addEventListener("input", (e: any) => {
                    const val = e.target.value;
                    const question = getQuestionsComponent(slide, questionHash);
                    if (question && question.answer && val) {
                        if (question.answer.substring(0, val.length).toLowerCase() === val.toLowerCase()) {
                            input.classList.add("text-green-500");
                            input.classList.remove("text-red-500");
                            if (question.answer?.length === val.length) {
                                onAnswer({ question, answer: question.answer });
                            }
                        } else {
                            input.classList.add("text-red-500");
                            input.classList.remove("text-green-500");
                        }
                    }
                });
            });
    }
};

export const decorateActiveInput = (input: HTMLInputElement, isSubjectiveQuestion : boolean = false) => {
    console.log(isSubjectiveQuestion);
    isSubjectiveQuestion && (input.disabled = false);
    input.classList.add("input-is-active");
    input.focus();
};

export const disableInactiveInputs = (inputs: HTMLInputElement[]) => {
    inputs.forEach((input : HTMLInputElement) => {
        input.disabled = true;
    });
};
