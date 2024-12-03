import { FC } from 'react';
export interface ChatInputProps {
    message: string;
    setMessage: any;
    handleRecordAudio: any;
    handleSendMessage: any;
}
declare const ChatInput: FC<ChatInputProps>;
export default ChatInput;
