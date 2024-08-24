import { FC, useState, useRef, useEffect } from "react";

import { FaMicrophone } from "react-icons/fa";
import { PiPaperPlaneRightFill } from "react-icons/pi";
import { ThreeDots } from "react-loader-spinner";
import { baseApiHost } from "utilities/url";

interface MessageProps {
    content: string;
    role: "user" | "assistant";
}

interface ChatSectionProps {
    visible: boolean;
    slideData?: any;
    lesson: any;
    slide: number;
}

const ChatMessage: FC<MessageProps> = ({ content, role }) => {
    const isUser = role === "user";
    return (
        <div
            className={`flex ${isUser ? "justify-end" : "justify-start"} mb-6`}
        >
            <p
                className={`px-3 py-2  urbanist w-[65%]  rounded-[10px] break-words ${
                    !isUser ? "text-gray-500 border" : "text-white bg-main"
                } `}
                dangerouslySetInnerHTML={{ __html: content }}
            ></p>
        </div>
    );
};

const ChatSection: FC<ChatSectionProps> = ({
    visible,
    slideData,
    lesson,
    slide,
}) => {
    const [message, setMessage] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const chatRef = useRef<any>();

    const handleRecordAudio = () => {};

    const [messages, setMessages] = useState<MessageProps[]>([]);

    const handleSendMessage = () => {
        setIsLoading(true);
        let updatedConversation: any[] = [];
        if (messages.length) {
            updatedConversation = [
                ...messages,
                { role: "user", content: message },
            ];
            setMessages(updatedConversation);
            setMessage("");
            if (chatRef.current) {
                console.log(chatRef.current.scrollHeight);
                setTimeout(() => {
                    chatRef.current.scroll({
                        top: chatRef.current.scrollHeight,
                        behavior: "smooth",
                    });
                }, 500);
            }
        }

        const url = `${baseApiHost()}/open/lesson/asktutor`;
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                lesson_id: lesson.id,
                slide_id: lesson.lesson_slides[slide - 1].id,
                conversation: updatedConversation.map((convo) => convo.content),
            }),
        })
            .then(async (response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                setMessages([
                    ...updatedConversation,
                    { role: "assistant", content: result.data },
                ]);
                setIsLoading(false);
                if (chatRef.current) {
                    setTimeout(() => {
                        chatRef.current.scroll({
                            top: chatRef.current.scrollHeight,
                            behavior: "smooth",
                        });
                    }, 500);
                }
            })
            .catch((error) => {
                console.error("Update failed:", error);
            });
    };

    useEffect(() => {
        if (!messages.length && visible) {
            handleSendMessage();
        }
    }, [visible]);

    return (
        <div
            className={`${
                visible ? "w-[35%]" : "w-0"
            } overflow-hidden relative border-l h-full flex flex-col justify-between `}
        >
            {visible && (
                <div
                    id="chat-box"
                    className="grow px-4 max-h-[calc(70vh)] transition-none overflow-y-auto pt-5"
                    ref={chatRef}
                >
                    {messages?.map((item) => (
                        <ChatMessage {...item} />
                    ))}
                    {isLoading && (
                        <div className="w-[30%] border-[1px] rounded-[10px] flex justify-center">
                            <ThreeDots
                                visible={true}
                                height="45"
                                width="45"
                                color="rgba(126,21,147,1)"
                                radius="9"
                                ariaLabel="three-dots-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                            />
                        </div>
                    )}
                </div>
            )}
            <div className="border-t transition-none h-[80px] flex items-center px-4 w-full px-">
                <div className="flex transition-none items-center h-[45px] w-full gap-x-5 justify-between">
                    <div className="border rounded-[5px] h-full w-full flex items-center gap-x-3 px-3">
                        <span>
                            <svg
                                width="24"
                                height="25"
                                viewBox="0 0 24 25"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M9 20.7518H4.5C4.30109 20.7518 4.11032 20.6728 3.96967 20.5322C3.82902 20.3915 3.75 20.2008 3.75 20.0018V15.8125C3.75 15.714 3.7694 15.6165 3.80709 15.5255C3.84478 15.4345 3.90003 15.3518 3.96967 15.2822L15.2197 4.03217C15.3603 3.89152 15.5511 3.8125 15.75 3.8125C15.9489 3.8125 16.1397 3.89152 16.2803 4.03217L20.4697 8.22151C20.6103 8.36216 20.6893 8.55293 20.6893 8.75184C20.6893 8.95075 20.6103 9.14152 20.4697 9.28217L9 20.7518Z"
                                    stroke="#9C29B2"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M12.75 6.5L18 11.75"
                                    stroke="#9C29B2"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M20.2492 20.7492H8.99916L3.79688 15.5469"
                                    stroke="#9C29B2"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </span>
                        <input
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            type="text"
                            placeholder="Ask a question"
                            className="text outline-none w-full"
                        />
                    </div>
                    <button
                        onClick={
                            message.length
                                ? handleSendMessage
                                : handleRecordAudio
                        }
                        className="bg-main rounded-[5px] h-[45px] px-4 text-xl"
                    >
                        {message.length ? (
                            <PiPaperPlaneRightFill color="white" />
                        ) : (
                            <FaMicrophone color="white" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatSection;
