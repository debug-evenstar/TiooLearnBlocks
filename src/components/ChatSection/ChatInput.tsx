import { FC } from 'react';
import { FaMicrophone } from "react-icons/fa";
import { PiPaperPlaneRightFill } from "react-icons/pi";


export interface ChatInputProps{
	message: string;
	setMessage: any;
	handleRecordAudio: any;
	handleSendMessage: any;
}

const ChatInput: FC<ChatInputProps> = ({message, setMessage, handleRecordAudio, handleSendMessage}) => {

	return (

		<div className="flex transition-none items-center h-[45px] w-full gap-x-5 justify-between">
          <div className="border rounded-[5px] h-full w-full flex items-center gap-x-3 px-3">
            <span>
              <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 20.7518H4.5C4.30109 20.7518 4.11032 20.6728 3.96967 20.5322C3.82902 20.3915 3.75 20.2008 3.75 20.0018V15.8125C3.75 15.714 3.7694 15.6165 3.80709 15.5255C3.84478 15.4345 3.90003 15.3518 3.96967 15.2822L15.2197 4.03217C15.3603 3.89152 15.5511 3.8125 15.75 3.8125C15.9489 3.8125 16.1397 3.89152 16.2803 4.03217L20.4697 8.22151C20.6103 8.36216 20.6893 8.55293 20.6893 8.75184C20.6893 8.95075 20.6103 9.14152 20.4697 9.28217L9 20.7518Z" stroke="#9C29B2"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12.75 6.5L18 11.75" stroke="#9C29B2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M20.2492 20.7492H8.99916L3.79688 15.5469" stroke="#9C29B2"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <input value={message} onChange={(e) => setMessage(e.target.value)} type="text" placeholder="Ask a question" className="text outline-none w-full"/>
          </div>
          <button onClick={ message.length ? handleSendMessage: handleRecordAudio} className="bg-main rounded-[5px] h-[45px] px-4 rounded text-xl">
              { message.length ? <PiPaperPlaneRightFill color="white" /> : <FaMicrophone color="white"/> }
          </button>
        </div>
	);
}

export default ChatInput;