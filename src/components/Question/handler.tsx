import { OptionInterface } from "apps/Editorial/Sidebars/RightSidebar/Questions/ActiveQuestion";
import { FeedbackType } from "components/NewLesson/Popups";

export const triggerFeedback = (option : OptionInterface, lessonContext : any, shouldContinue = true) => {
    if (option.feedback && lessonContext) {
        const feedback = option.feedback;
        lessonContext.feedbackRef.current.showFeedback(
            feedback.title,
            feedback.content,
            option.isAnswer ? FeedbackType.CORRECT : FeedbackType.WRONG,
            shouldContinue
        );
    }
}