
import { FC, useState, useRef } from "react";

import ChatInput from "./ChatInput";

interface MessageProps {
  text: string;
  role: 'user' | 'ai';
}

interface ChatSectionProps {
  visible: boolean;
  slideData?: any;
}


const ChatMessage: FC<MessageProps> = ({text, role}) => {
  const isUser = role === 'user';
  return (
    <div className={`flex ${ isUser ? "justify-end":"justify-start"} mb-6`}>
      <p className={`px-3 py-2  urbanist w-[65%]  rounded-[10px] ${!isUser? "text-gray-500 border": "text-white bg-main" } `}>
        {text}
      </p>
    </div>
  );
}


const ChatSection: FC<ChatSectionProps> = ({visible, slideData}) => {
  const [ message, setMessage ] = useState<string>('');

  const chatRef = useRef<any>();

  const handleSendMessage = () => {
  	setMessages([ ... messages, { text: message, role: 'user'}]);
  	if(chatRef.current){
  		chatRef.current.scrollTop = chatRef.current.scrollHeight;
  	}
  } 

  const handleRecordAudio = () => {

  }


  const [ messages, setMessages ] = useState<MessageProps[]>([
    { text: "Hi there 👋. I’m Longs, do you need help solving this problem?", role: 'ai'},
    { text: "Yes please", role: "user"},
    { text: "Hi there 👋. I’m Longs, do you need help solving this problem?", role: 'ai'},
    { text: "Yes please", role: "user"},
    { text: "Hi there 👋. I’m Longs, do you need help solving this problem?", role: 'ai'},
    { text: "Yes please", role: "user"},

    { text: `Calculate the amount of reduction: 
              Reduction = 5% of N160,000
              Reduction = (5/100) * N160,000 = N8,000

              Subtract the reduction from the original price to find the amount Mrs. Udeme paid: 
              Amount Paid = Original Price - Reduction Amount Paid = N160,000 - N8,000 = N152,000
              So, Mrs. Udeme paid N152,000 after receiving a 5% reduction in price.`,
      role: "ai"
    }
  ]);

  return (
    <div className={`${visible? "w-[60rem]":"w-0"} overflow-hidden duration-300 relative border-l h-full flex flex-col justify-between `}>
      { visible && 
          <div className="grow px-4 max-h-[calc(70vh)] transition-none overflow-y-auto pt-5" ref={chatRef}>
	            { messages?.map((item) => <ChatMessage {...item} />)}
          </div>
      }
      <div className="border-t transition-none h-[80px] flex items-center px-4 w-full px-">
        <ChatInput {...{message, setMessage, handleRecordAudio, handleSendMessage}}/>
      </div>
    </div>
  );
}

export default ChatSection;