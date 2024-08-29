import React, { FC, useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import DataListManager from "./DataListManager";
import { randomString } from "utilities/string";
import {
    FaAnchor,
    FaBriefcase,
    FaFill,
    FaStar,
    FaStickyNote,
} from "react-icons/fa";
import { ComponentLayoutInterface } from "components/interface";
import OptionSideModal from "./OptionSideModal";
import { _getManager, setComponentLayout } from "apps/Editorial/Base/Manager";
import { QuestionInterface } from "../InactiveSidebar";
import { Feedback } from "apps/Editorial/interfaces";
import QuestionsResource from "services/api/resources/QuestionsResource";
import InputSideModal from "./InputSideModal";

interface Props {
    question: QuestionInterface;
    setActiveQuestion: Function;
    setQuestions: Function;
}

export enum OptionTypes {
    Single = "single",
    Multiple = "multi",
    Button = "button",
}

export enum InputTypes {
    Objective = "objective",
    Subjective = "subjective",
}

export enum InputLinkedStates {
    Unlinked = 0,
    PendingLink = 1,
    Linked = 2,
}
export interface OptionInterface {
    title: string;
    hash: string;
    value?: string;
    isAnswer?: boolean;
    feedback?: Feedback;
    layout?: ComponentLayoutInterface;
}

export interface InputInterface {
    hash: string;
    title: string;
    type: string;
    linkState?: number;
    layout?: ComponentLayoutInterface;
}

const ActiveQuestion: FC<Props> = ({
    question,
    setActiveQuestion,
    setQuestions,
}) => {
    const [options, setOptions] = useState<any>(question.options ?? []);
    const [activeOption, setActiveOption] = useState<any>(null);
    const [activeInput, setActiveInput] = useState<any>(null);
    const [optionType, setOptionType] = useState<OptionTypes>(
        question.optionType ?? OptionTypes.Single
    );
    const [inputs, setInputs] = useState(question.inputs ?? []);
    const [questionQuery, setQuestionQuery] = useState<any>({
        previous: "",
        current: "",
    });
    const [topicSearchValue, setTopicSearchValue] = useState<string>("");
    const [topicSearchResults, setTopicSearchResults] = useState<any[]>([]);
    const [linkedTopics, setLinkedTopics] = useState<any>([]);
    const [subjectTopics, setSubjectTopics] = useState<any[]>([]);
    const manager = _getManager();

    const optionBulletIcon = (item: any) =>
        item.isAnswer ? (
            <FaStar className="text-[15px] text-blue-400 mr-1" />
        ) : (
            <FaStar className="text-[15px] text-[#c9c9c9] mr-1" />
        );

    const generateOption = (title: string) => {
        const option: OptionInterface = {
            title,
            hash: randomString(8),
            value: title,
            layout: setComponentLayout(
                manager.canvasManager.canvas.getCanvasSize(),
                { size: { width: 100, height: 50 } }
            ),
        };
        return option;
    };

    const generateInput = (title: string) => {
        const input: InputInterface = {
            hash: randomString(8),
            title,
            type: InputTypes.Objective,
            linkState: InputLinkedStates.Unlinked,
            layout: setComponentLayout(
                manager.canvasManager.canvas.getCanvasSize(),
                { size: { width: 80, height: 40 } }
            ),
        };
        return input;
    };

    const resetAnswers = () => {
        setOptions((prev: OptionInterface[]) =>
            prev.map((option: OptionInterface) => {
                return { ...option, isAnswer: false };
            })
        );
    };

    const setOptionAsAnswer = (item: OptionInterface) => {
        const updated = options.map((option: OptionInterface) => {
            return option.hash === item.hash
                ? {
                      ...option,
                      isAnswer:
                          question.optionType == OptionTypes.Single
                              ? true
                              : !option.isAnswer,
                  }
                : {
                      ...option,
                      isAnswer:
                          question.optionType == OptionTypes.Single
                              ? false
                              : option.isAnswer,
                  };
        });
        setOptions([...updated]);
    };

    const queryCanSave = () =>
        questionQuery.current !== "" &&
        questionQuery.current !== questionQuery.previous;

    const saveQuestionQuery = () => {
        setQuestionQuery((prev: any) => ({
            ...prev,
            previous: questionQuery.current,
        }));
    };

    const searchTopic = (value: string) => {
        if (value !== "") {
            setTopicSearchResults(
                subjectTopics.filter((topic: any) => {
                    return (
                        topic.name
                            .toLowerCase()
                            .includes(value.toLowerCase()) &&
                        !linkedTopics
                            .map((t: any) => t.name.toLowerCase())
                            .includes(topic.name.toLowerCase())
                    );
                })
            );
        } else {
            setTopicSearchResults([]);
        }
        setTopicSearchValue(value);
    };

    const linkTopic = (topic: any) => {
        setLinkedTopics((prev: any) => [...prev, topic]);
        setTopicSearchValue("");
    };

    const loadTopics = async () => {
        const subjectId = _getManager()?.lesson?.Textbook?.subject_id;
        if (subjectId) {
            const topics = await QuestionsResource.getTopics(subjectId);
            setSubjectTopics(topics.data);
            if (question.topics && question.topics.length) {
                setLinkedTopics(
                    topics.data.filter((topic: any) =>
                        question.topics?.includes(topic.id)
                    )
                );
            }
        }
    };

    const updateOptionsData = () => {
        setQuestions((prev: any) => {
            const questionIndex = prev.findIndex(
                (q: QuestionInterface) => question.hash == q.hash
            );
            question.options = [...options];
            prev[questionIndex] = question;
            return [...prev];
        });
        if (activeOption) {
            setActiveOption(
                options.filter(
                    (option: OptionInterface) =>
                        option.hash == activeOption.hash
                )[0]
            );
        }
    };

    const updateOptionType = () => {
        setQuestions((prev: any) => {
            const questionIndex = prev.findIndex(
                (q: QuestionInterface) => question.hash == q.hash
            );
            question.optionType = optionType;
            prev[questionIndex] = question;
            return [...prev];
        });
    };

    const updateInputsData = () => {
        setQuestions((prev: any) => {
            const questionIndex = prev.findIndex(
                (q: QuestionInterface) => question.hash == q.hash
            );
            question.inputs = [...inputs];
            prev[questionIndex] = question;
            return [...prev];
        });
        if (activeInput) {
            setActiveInput(
                inputs.filter(
                    (input: InputInterface) =>
                        input.hash == activeInput.hash
                )[0]
            );
        }
    };

    useEffect(() => {
        // Temporary solution to prevent multiple update
        if (JSON.stringify(options) !== JSON.stringify(question.options)) {
            updateOptionsData();
        }
        if (optionType !== question.optionType) {
            updateOptionType();
        }
    }, [options, optionType]);

    useEffect(() => {
        if (JSON.stringify(inputs) !== JSON.stringify(question.inputs)) {
            updateInputsData();
        }
        console.log(inputs);
    }, [inputs]);

    useEffect(() => {
        searchTopic(topicSearchValue);
    }, [linkedTopics]);

    useEffect(() => {
        if (optionType !== question.optionType) {
            resetAnswers();
        }
    }, [optionType]);

    useEffect(() => {
        // Temporary solution to loop
        if (JSON.stringify(options) !== JSON.stringify(question.options)) {
            question.options && setOptions(question.options);
        }
        question.optionType &&
            optionType !== question.optionType &&
            setOptionType(question.optionType);
        if (JSON.stringify(inputs) !== JSON.stringify(question.inputs)) {
            question.inputs && setInputs(question.inputs);
        }
        loadTopics();
    }, [question]); //Possible loop

    useEffect(() => {
        setQuestions((prev: any) => {
            const questionIndex = prev.indexOf(question);
            // question.topics = [...linkedTopics.map((topic: any) => topic.id)];
            question.query = questionQuery.previous;
            prev[questionIndex] = question;
            return [...prev];
        });
    }, [linkedTopics, questionQuery.previous]);

    useEffect(() => {
        manager.event.listen("linkQuestionInput", (data: any) => {
            if (question.hash == data.questionHash) {
                setInputs((prev: InputInterface[]) => {
                    return [
                        ...prev.map((i: InputInterface) => {
                            return i.hash == data.hash
                                ? { ...i, linkState: InputLinkedStates.Linked }
                                : i;
                        }),
                    ];
                });
            }
        });
    }, [manager]);

    return (
        <div className="w-full h-full mb-12 relative flex flex-col">
            {activeOption && (
                <OptionSideModal
                    option={activeOption}
                    setOptions={setOptions}
                />
            )}
            {activeInput && (
                <InputSideModal input={activeInput} setInputs={setInputs} closeModal={() => setActiveInput(null)}/>
            )}
            <div className="relative h-[50px]">
                <button
                    className="absolute flex items-center ml-1 mt-auto h-[20px] top-[calc(50%_-_10px)]"
                    onClick={() => setActiveQuestion(null)}
                >
                    <FiArrowLeft className="text-[15px] text-[#87909E] mr-[1px]" />
                    <p className="text-[#87909E] text-[14px]">Back</p>
                </button>
                <h3 className="shadow-lg text-[15px] my-2 py-2 text-center text-[#87909E] font-medium">
                    {question.title}
                </h3>
            </div>
            <div className="grow overflow-y-scroll pb-4">
                <div className="px-2 mt-[15px]">
                    <p className="text-[14px]">Question Type</p>
                    <select className="w-full border-[2px] border-[#f2f2f2] rounded-[5px] py-1 px-1 text-[14px] mt-[5px] outline-none">
                        <option value="multichoice">Multichoice</option>
                    </select>
                </div>
                <div className="px-2 mt-[15px]">
                    <p className="text-[14px] font-bold mb-2">Manage options</p>
                    <p className="text-[14px]">Options Type</p>
                    <select
                        className="w-full border-[2px] border-[#f2f2f2] rounded-[5px] py-1 px-1 text-[14px] mt-[5px] outline-none"
                        onChange={(e) =>
                            setOptionType(e.target.value as OptionTypes)
                        }
                    >
                        <option value="single">Single selection</option>
                        <option value="multi">Multi selection</option>
                        <option value="button">Button</option>
                    </select>
                    <div>
                        <DataListManager
                            title="Options"
                            data={options}
                            setData={setOptions}
                            setActiveItem={(option: OptionInterface) =>
                                setActiveOption(
                                    option.hash == activeOption?.hash
                                        ? null
                                        : option
                                )
                            }
                            generateItem={generateOption}
                            bulletIcon={optionBulletIcon}
                            bulletAction={(item: OptionInterface) =>
                                setOptionAsAnswer(item)
                            }
                            richText={true}
                        />
                    </div>
                </div>
                <div className="px-2 mt-[15px]">
                    <p className="text-[14px] font-bold mb-2">Manage inputs</p>
                    <div>
                        <DataListManager
                            title="Inputs"
                            data={inputs}
                            setData={setInputs}
                            setActiveItem={(input: InputInterface) =>
                                setActiveInput(
                                    input.hash == activeInput?.hash
                                        ? null
                                        : input
                                )
                            }
                            generateItem={generateInput}
                            bulletIcon={
                                <FaStickyNote className="text-[15px] text-blue-400 mr-1" />
                            }
                            richText={true}
                        />
                    </div>
                </div>
                <div className="px-2 mt-[15px]">
                    <p className="text-[14px] font-bold">Query</p>
                    <p className="text-[12px] mb-1">
                        (Specify query for prompt)
                    </p>
                    <textarea
                        className="w-full h-[90px] text-[14px] border-[2px] border-[#f2f2f2] rounded-[5px] p-1"
                        onChange={(e) =>
                            setQuestionQuery((prev: any) => ({
                                ...prev,
                                current: e.target.value,
                            }))
                        }
                    ></textarea>
                    <button
                        className={
                            "w-full text-white text-[14px] px-3 py-1 rounded-[5px] " +
                            (!queryCanSave() ? "bg-[#d5d5d5]" : "bg-green-500")
                        }
                        disabled={!queryCanSave()}
                        onClick={() => saveQuestionQuery()}
                    >
                        {" "}
                        Save{" "}
                    </button>
                </div>
                <div className="px-2 mt-[15px]">
                    <p className="text-[14px] font-bold">Link Topics</p>
                    <div className="w-full">
                        {linkedTopics.map((topic: any) => {
                            return (
                                <p
                                    key={topic.name}
                                    className="px-[3px] py-[2px] rounded-[6px] border-[#e1deff] border-[2px] text-center text-[12px]"
                                >
                                    {topic.name}
                                </p>
                            );
                        })}
                    </div>
                    <input
                        className="w-full border-[2px] border-[#f2f2f2] rounded-[5px] py-1 px-1 text-[13px] mt-[5px] outline-none"
                        placeholder="Type to search topics"
                        onChange={(e) => searchTopic(e.target.value)}
                        value={topicSearchValue}
                    />
                    <div className="w-full border-x-[1px] border-[#f2f2f2] mt-[2px] max-h-[300px]">
                        {topicSearchResults.length
                            ? topicSearchResults.map((topic: any) => {
                                  return (
                                      <button
                                          key={topic.name}
                                          className="w-full py-[5px] text-[#303030] text-center text-[13px] border-[#f2f2f2] border-b-[1px] hover:bg-[#f5f5f5]"
                                          onClick={() => linkTopic(topic)}
                                      >
                                          {topic.name}
                                      </button>
                                  );
                              })
                            : topicSearchValue && (
                                  <p className="w-full py-[5px] text-[#a5a5a5] text-center text-[13px] border-[#f2f2f2] border-b-[1px]">
                                      No topics matching query
                                  </p>
                              )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActiveQuestion;
