import React, { FC, useEffect, useRef, useState } from "react";
import {
    FaAngleDown,
    FaAngleUp,
    FaCheckCircle,
    FaPlusCircle,
    FaQuestionCircle,
    FaTimesCircle,
    FaTrash,
} from "react-icons/fa";
import PromptBox from "../../promptBox";
import { randomString } from "utilities/string";
import { FiArrowLeft } from "react-icons/fi";
import ActiveQuestion, {
    InputInterface,
    OptionInterface,
    OptionTypes,
} from "./Questions/ActiveQuestion";
import DataListManager from "./Questions/DataListManager";
import { _getManager, ManagerStates } from "apps/Editorial/Base/Manager";
import { CanvasStates } from "apps/Editorial/Base/CanvasManager";

interface Props {
    data: any;
    showComp: boolean;
    activeSlide: number;
    slides: any;
    lessonlist: any;
}

export interface QuestionInterface {
    hash: string;
    title: string;
    query: string;
    media: any[];
    optionType: OptionTypes;
    options?: OptionInterface[];
    inputs?: InputInterface[];
    topics?: any[];
    useOptionLayout? : boolean;
    layoutBoxConfig? : any;
}

const InactiveSidebar: FC<Props> = ({
    slides,
    data,
    showComp,
    activeSlide,
    lessonlist,
}) => {
    const compTypes = [
        "Text",
        "Image",
        "Video",
        "Flash Card",
        "Grid",
        "Slider",
        "FlashCards",
        "Sequence",
        "Multi Choice",
        "Dual Choice",
    ];

    const activeSlideData = slides && slides[activeSlide];
    const [comps, setComps] = useState<any[]>();
    const [activeQuestion, setActiveQuestion] = useState<any>(null);
    const scrRef = useRef<any>(null);
    const [questions, setQuestions] = useState<any[]>([]);
    const [questionToggleStates, setQuestionToggleStates] = useState<boolean[]>(
        []
    );
    const manager = _getManager();

    const loadQuestions = () => {
        if (activeSlideData) {
            const slideQuestions: any = activeSlideData.filter(
                (item: any) => item.component == "Questions"
            );
            if (slideQuestions.length) {
                return [...slideQuestions[0].data];
            }
        }
        return [];
    };

    const toggleQuestion = (question: QuestionInterface, state: boolean) => {
        const manager = _getManager();
        const updated: { [key: string]: boolean } = {};
        updated[question.hash] = state;
        manager.setState(
            "canvasStates",
            (prev: CanvasStates) =>
                ({
                    ...prev,
                    questionToggle: {
                        ...(prev?.questionToggle ?? {}),
                        ...updated,
                    },
                } as CanvasStates)
        );
    };

    const getActiveComps = () => {
        const comps = activeSlideData
            ? activeSlideData.map((item: any) => item.component)
            : [];
        setComps(comps);
    };

    const generateQuestion = (title: string) => {
        const question: QuestionInterface = {
            hash: randomString(10),
            title: title,
            query: "",
            media: [],
            optionType: OptionTypes.Single,
        };
        return question;
    };

    const scroll = (scrollOffset: any) => {
        scrRef.current.scrollTop += scrollOffset;
    };
    const formatTerm = (val: any) => {
        if (val === 1) {
            return "First Term";
        } else if (val === 2) {
            return "Second Term";
        } else return "Third Term";
    };

    const handleDragStart = (e: any, id: string) => {
        e.dataTransfer.setData("text/plain", id);
    };

    const updateSlideQuestions = (data: any) => {
        const manager = _getManager();
        if (
            manager.canvasManager.activeSlide &&
            manager.canvasManager.activeSlide.length
        ) {
            const updated = manager.canvasManager.activeSlide;
            const existing = manager.canvasManager.activeSlide.filter(
                (item: any) => item.component == "Questions"
            );
            const questionsData = {
                component: "Questions",
                theme: null,
                canvas: true,
                abstract: true,
                data: typeof data == "function" ? data(questions) : data,
            } as any;

            if (existing.length) {
                const questionIndex = updated.indexOf(existing[0]);
                updated[questionIndex] = questionsData;
            } else {
                updated.push(questionsData);
            }
            manager.canvasManager.updateActiveSlide(updated);
            manager.canvasManager.updateSlides();
        }
    };

    useEffect(() => {
        getActiveComps();
        setQuestions(loadQuestions());
        if (activeQuestion) {
            let previousActive = questions.find(
                (question: QuestionInterface) =>
                    question.hash == activeQuestion.hash
            );
            setActiveQuestion(previousActive ? { ...previousActive } : null);
        }
    }, [activeSlideData]);

    useEffect(() => {
        setQuestionToggleStates([
            ...questions.map((q:QuestionInterface) => {
                const questionToggle = manager.states.canvasStates?.questionToggle ?? {};
                return questionToggle[q.hash] ?? true;
            })
        ]);
    }, [questions, manager.states]);

    const Item = () => {
        const [isOpen, setIsOpen] = useState(true);
        const [isActive, setIsActive] = useState(1);
        return <div></div>
        // return (
        //     <div className="w-full my-5 p-4">
        //         <h3 className="text-[12px] text-[#87909E] font-medium">
        //             {formatTerm(lessonlist.term)}
        //         </h3>
        //         <div className="w-full flex items-center justify-between">
        //             <h3
        //                 className="text-[#030036] text-[13px] font-medium w-[137px] opacity-70 cursor-pointer py-[8px]"
        //                 onClick={() => setIsOpen(!isOpen)}
        //             >
        //                 {lessonlist.topic}
        //             </h3>
        //             <div
        //                 className="cursor-pointer"
        //                 onClick={() => setIsOpen(!isOpen)}
        //             >
        //                 {isOpen ? (
        //                     <FaAngleUp className="text-[15px] text-[#030036]" />
        //                 ) : (
        //                     <FaAngleDown className="text-[15px] text-[#030036]" />
        //                 )}
        //             </div>
        //         </div>
        //         {isOpen && (
        //             <div>
        //                 {lessonlist &&
        //                     lessonlist.lessons?.map(
        //                         (data: any, index: number) => {
        //                             return (
        //                                 <div
        //                                     key={index}
        //                                     onClick={() => setIsActive(data.id)}
        //                                     className={` ${
        //                                         isActive === data.id
        //                                             ? `w-full p-[9px] text-[#4F46E5] text-[11px] font-medium border-l-[3.3px] border-[#4F46E5] bg-[#E3E2FF] rounded-[4px] overflow-hidden cursor-pointer`
        //                                             : `w-full p-[9px] text-[#87909E] text-[11px] font-normal cursor-pointer`
        //                                     }`}
        //                                 >
        //                                     Lesson {index + 1}: {data.topic}
        //                                 </div>
        //                             );
        //                         }
        //                     )}
        //             </div>
        //         )}
        //     </div>
        // );
    };
    return (
        <div className="w-full h-full border shadow">
            {!showComp && <Item />}
            {showComp && (
                <>
                    {!activeQuestion && (
                        <div className="w-full mb-12 max-h-full overflow-y-scroll">
                            <h3 className="shadow-lg text-[15px] my-2 py-2 text-center text-[#87909E] font-medium">
                                Components
                            </h3>
                            <div className="mt-4 text-[14px]">
                                <FaAngleUp
                                    className="text-lg text-gray-500 mb-2 mx-auto cursor-pointer"
                                    onClick={() => scroll(-30)}
                                />
                                <div
                                    className="grid gap-4  p-3 h-[300px] overflow-y-scroll hide-scroll"
                                    ref={scrRef}
                                >
                                    {compTypes.map((item, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className={`${
                                                    comps &&
                                                    {
                                                        /* comps.includes(item) */
                                                    }
                                                        ? "compactive"
                                                        : "compinactive"
                                                } cursor-pointer mx-1 hover:scale-y-105 duration-100`}
                                                draggable
                                                onDragStart={(e) =>
                                                    handleDragStart(
                                                        e,
                                                        item === "Flashcard"
                                                            ? "Flash Card"
                                                            : item
                                                    )
                                                }
                                            >
                                                {item === "Flashcard"
                                                    ? "Flash Card"
                                                    : item}
                                            </div>
                                        );
                                    })}
                                </div>
                                <FaAngleDown
                                    className="text-xl text-gray-500 mx-auto mt-2 cursor-pointer"
                                    onClick={() => scroll(30)}
                                />
                            </div>
                            <h3 className="text-[15px] mt-5 py-2 text-center text-[#87909E] font-medium">
                                Utlilties
                            </h3>
                            <DataListManager
                                title="Questions"
                                data={questions}
                                setData={updateSlideQuestions}
                                setActiveItem={setActiveQuestion}
                                generateItem={generateQuestion}
                                bulletIcon={
                                    <FaQuestionCircle className="text-[15px] text-blue-400 mr-1" />
                                }
                                canToggle={true}
                                onToggle={toggleQuestion}
                                toggleStates={questionToggleStates}
                            />
                        </div>
                    )}
                    {activeQuestion && (
                        <ActiveQuestion
                            question={activeQuestion}
                            setActiveQuestion={setActiveQuestion}
                            setQuestions={updateSlideQuestions}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default InactiveSidebar;
