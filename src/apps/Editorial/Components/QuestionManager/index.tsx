import React, { FC, createRef, useEffect, useRef, useState } from "react";
import { FaEdit, FaTimes } from "react-icons/fa";
import { ComponentBaseDataInterface } from "components/interface";

import { _getManager, setComponentLayout } from "apps/Editorial/Base/Manager";
import { baseApiHost } from "utilities/url";
import Configuration from "setup/configure";
import { ThreeDots } from "react-loader-spinner";
import katex from "katex";
import { QuestionInterface } from "apps/Editorial/Sidebars/RightSidebar/InactiveSidebar";

interface Props {
    close: Function;
    slide: {
        id: number;
        slide_index: number;
        slide_data: ComponentBaseDataInterface[];
        lesson_id: number;
    };
    questions: QuestionInterface[];
    updateSlideQuestions: Function;
}

interface MessageProps {
    content: string;
    role: "user" | "assistant";
}

const QuestionManager: FC<Props> = ({
    close,
    slide,
    questions,
    updateSlideQuestions,
}) => {
    const [message, setMessage] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [messages, setMessages] = useState<MessageProps[]>([]);
    const [isEditable, setIsEditable] = useState<boolean>(false);
    const [contentEdit, setContentEdit] = useState<string>("");
    const chatRef = useRef<any>();
    const promptAI = async () => {
        setIsLoading(true);
        const updatedConversation: any = [
            ...messages,
            { role: "user", content: message },
        ];
        setMessages(updatedConversation);
        setMessage("");
        if (chatRef.current) {
            setTimeout(() => {
                chatRef.current.scroll({
                    top: chatRef.current.scrollHeight,
                    behavior: "smooth",
                });
            }, 500);
        }
        const url: string = `${baseApiHost()}/admin/lessons/generate-response`;
        return fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Configuration.load()?.token}`,
            },
            body: JSON.stringify({
                slide_id: slide.id,
                lesson_id: slide.lesson_id,
                conversation: updatedConversation.map(
                    (convo: any) => convo.content
                ),
                query: "Give me step by step detailed working and answer to the question in this slide",
            }),
        })
            .then(async (response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                const updatedMessages: MessageProps[] = [
                    ...updatedConversation,
                    { role: "assistant", content: result.data },
                ];
                setMessages(updatedMessages);
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
            .then((data) => {})
            .catch((error) => {
                console.error("Update failed:", error);
            });
    };

    const assistantMessages = () => messages.filter((m) => m.role != "user");

    const saveResponse = (content: string) => {
        if (contentEdit) {
            content = contentEdit;
            setTimeout(() => {
                setContentEdit("");
                setIsEditable(false);
                setMessages((prev:any) => {
                    prev[prev.length - 1].content = content;
                    return [...prev];
                });
            },500);
        }
        updateSlideQuestions((prev: QuestionInterface[]) => {
            if (prev.length == 1) {
                const question = prev[0];
                question.explanation = content;
                return [question];
            }
            return prev;
        });
    };

    const saveEdited = (element : any) => {
        setContentEdit(element.innerHTML);
    }

    const getSaved = () => {
        return questions.length ? contentEdit ? contentEdit : questions[0].explanation : "";
    };

    useEffect(() => {
        if (questions.length && questions[0].explanation) {
            setMessages([
                {
                    role: "user",
                    content: "Show explanation/workings to the answer",
                },
                {
                    role: "assistant",
                    content: questions[0].explanation as string,
                },
            ]);
        }
    }, []);

    useEffect(() => {
        setIsEditable(false);
        setContentEdit("");
    },[messages]);
    
    return (
        <div className="w-screen h-screen absolute top-0 left-0 z-[30] flex justify-center items-center">
            <div className="overlay absolute w-full h-full bg-black opacity-[0.4]"></div>
            <div className="relative w-[90%] h-[90%] bg-white rounded-md">
                <button
                    className="absolute right-[12px] top-[10px]"
                    onClick={() => close()}
                >
                    <FaTimes color="black" size={20} />
                </button>
                <div className="w-full h-full py-[30px] px-[30px] flex flex-col">
                    {messages && (
                        <div
                            ref={chatRef}
                            className="grow p-2 border-[1px] border-[#d2d2d2] mb-[10px] overflow-y-scroll"
                        >
                            {assistantMessages().map((item, index) => (
                                <div className={`flex mb-6`} key={index}>
                                    <div className="w-[65%] relative">
                                        <p
                                            className={`px-4 py-4  urbanist w-full  rounded-l-[10px] break-words text-[18px] bg-[#f2f2f2] border-[1px] border-[#c2c2c2]`}
                                            contentEditable={
                                                isEditable &&
                                                index ==
                                                    assistantMessages().length -
                                                        1
                                            }
                                            dangerouslySetInnerHTML={{
                                                __html: item.content,
                                            }}
                                            onInput={(e) => saveEdited(e.target)}
                                        ></p>
                                        {!isEditable &&
                                            index ==
                                                assistantMessages().length -
                                                    1 && (
                                                <button
                                                    className="absolute top-[2px] right-[2px] p-1 hover:bg-gray-200"
                                                    onClick={() =>
                                                        setIsEditable(true)
                                                    }
                                                >
                                                    <FaEdit color="black" />
                                                </button>
                                            )}
                                    </div>
                                    <div className="px-[5px] h-full flex items-center">
                                        <button
                                            disabled={
                                                index <
                                                    assistantMessages().length -
                                                        1 ||
                                                getSaved() == item.content
                                            }
                                            className={`p-2 rounded-r-md ${
                                                index <
                                                assistantMessages().length - 1
                                                    ? "bg-gray-400 text-white"
                                                    : getSaved() == item.content
                                                    ? "bg-green-300 text-gray-100"
                                                    : "bg-green-500 text-white"
                                            }`}
                                            onClick={() =>
                                                saveResponse(item.content)
                                            }
                                        >
                                            {getSaved() == item.content
                                                ? "Saved"
                                                : "Save"}
                                        </button>
                                    </div>
                                </div>
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
                    <div className="h-[180px] w-full">
                        <div className="w-full h-[100px] mb-1">
                            <textarea
                                className="w-full h-full border-[1px] border-[#d2d2d2] p-2"
                                cols={8}
                                placeholder="Insert prompt here"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            ></textarea>
                        </div>
                        <button
                            className={`w-full h-[40px] text-white flex justify-center items-center ${
                                message ? "bg-green-500" : "bg-gray-400"
                            }`}
                            onClick={promptAI}
                            disabled={!message}
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuestionManager;
