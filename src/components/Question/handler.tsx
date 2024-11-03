import {
    QuestionInterface,
    QuestionTypes,
} from "apps/Editorial/Sidebars/RightSidebar/InactiveSidebar";
import { OptionInterface } from "apps/Editorial/Sidebars/RightSidebar/Questions/ActiveQuestion";
import { FeedbackType } from "components/NewLesson/Popups";

export const triggerFeedback = (
    initiator: OptionInterface | QuestionInterface,
    lessonContext: any,
    shouldContinue = true
) => {
    if (initiator.feedback && lessonContext) {
        const feedback = initiator.feedback;
        lessonContext.feedbackRef.current.showFeedback(
            feedback.title,
            feedback.content,
            (initiator as OptionInterface).isAnswer ||
                (initiator as QuestionInterface).type ==
                    QuestionTypes.Subjective
                ? FeedbackType.CORRECT
                : FeedbackType.WRONG,
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
        const inputs = element.querySelectorAll("input[data-link=Questions]");
        inputs.forEach((input: any, index: number) => {
            const questionHash = input.getAttribute("data-question-hash");
            input.addEventListener("input", (e: any) => {
                const val = e.target.value;
                const question = getQuestionsComponent(slide, questionHash);
                if (question && question.answer && val) {
                    if (
                        question.answer
                            .substring(0, val.length)
                            .toLowerCase() === val.toLowerCase()
                    ) {
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

interface fillOptions {
    parentType: string;
    styles?: any;
}

export const handleAnswerQuestion = (data: any, options: fillOptions) => {
    // Check if any linked inputs exists and populate them
    const linkedInput = document.querySelector(
        `.lesson-slide .${options.parentType}-render input[data-question-hash='${data.question.hash}']`
    );
    if (linkedInput) {
        const { top, left } = (linkedInput as HTMLElement).style;
        const parent = linkedInput.parentElement;
        const textFill = document.createElement("span");
        textFill.className = `relative inline-block font-bold text-[#089c28] text-[20px] mx-[3px] -bottom-[0.5px]`;
        textFill.innerHTML = ` ${data.option?.title ?? data.answer} `;
        textFill.style.setProperty(
            "transition",
            "transform 0.4s, text-shadow 0.4s"
        );
        textFill.style.setProperty("transition-timing-function", "linear");
        textFill.style.setProperty("text-shadow", "0px 0px 0px #fff");
        if (top || left) {
            textFill.style.setProperty("position", "absolute");
            textFill.style.setProperty("top", top ?? 0);
            textFill.style.setProperty("left", left ?? 0);
        }
        parent?.replaceChild(textFill, linkedInput);
        // setTimeout(() => {
        //     animate(textFill);
        // }, 300);
    }
};

export const decorateActiveInput = (
    input: HTMLInputElement,
    isSubjectiveQuestion: boolean = false
) => {
    // isSubjectiveQuestion && (input.disabled = false);
    input.focus();
    input.classList.add("input-is-active");
};

export const disableInactiveInputs = (inputs: HTMLInputElement[]) => {
    inputs.forEach((input: HTMLInputElement) => {
        input.disabled = true;
    });
};

export const tooltipListener = (container: HTMLElement) => {
    if (container) {
        container.querySelectorAll(".tooltip").forEach((element: any) => {
            element.addEventListener("mouseenter", () => {
                document
                    .getElementsByClassName("slide-area")[0]
                    .classList.add("tip-visible");
            });
            element.addEventListener("mouseleave", () => {
                document
                    .getElementsByClassName("slide-area")[0]
                    .classList.remove("tip-visible");
            });
        });
    }
};
