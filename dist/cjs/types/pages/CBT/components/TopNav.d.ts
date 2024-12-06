import { FC } from "react";
import { SubjectLesson } from "../types";
interface TopNavProps {
    data: SubjectLesson[] | null;
    setCurrent: any;
    openSubmitModal: Function;
    inSession: boolean;
    setInSession: any;
    handleTimeUp: any;
    currentSubjectId?: number | null;
    duration: number;
}
declare const TopNav: FC<TopNavProps>;
export default TopNav;
