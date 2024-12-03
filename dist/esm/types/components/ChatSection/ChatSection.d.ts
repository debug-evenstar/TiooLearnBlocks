import { FC } from "react";
interface ChatSectionProps {
    visible: boolean;
    slideData?: any;
    lesson: any;
    slide: number;
    close: Function;
}
declare const ChatSection: FC<ChatSectionProps>;
export default ChatSection;
