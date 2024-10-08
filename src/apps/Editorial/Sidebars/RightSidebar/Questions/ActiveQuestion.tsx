import React, { createRef, FC, useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import DataListManager from "./DataListManager";
import { randomString } from "utilities/string";
import {
    FaAnchor,
    FaArrowsAltH,
    FaArrowsAltV,
    FaBriefcase,
    FaCheckCircle,
    FaEdit,
    FaFill,
    FaStar,
    FaStickyNote,
} from "react-icons/fa";
import { ComponentLayoutInterface } from "components/interface";
import OptionSideModal from "./OptionSideModal";
import { _getManager, setComponentLayout } from "apps/Editorial/Base/Manager";
import { QuestionInterface, QuestionTypes } from "../InactiveSidebar";
import { Feedback } from "apps/Editorial/interfaces";
import QuestionsResource from "services/api/resources/QuestionsResource";
import InputSideModal from "./InputSideModal";
import ContentInput from "components/ContentInput";

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

interface OptionLayoutInterface {
    width: number;
    height: number;
    spacing: { x: number; y: number };
    direction?: string;
    alignment: "left" | "center";
}

const ActiveQuestion: FC<Props> = ({
    question,
    setActiveQuestion,
    setQuestions,
}) => {
    const [options, setOptions] = useState<any>(question.options ?? []);
    const [activeOption, setActiveOption] = useState<any>(null);
    const [activeInput, setActiveInput] = useState<any>(null);
    const [questionType, setQuestionType] = useState<QuestionTypes>(
        question.type ?? QuestionTypes.Multichoice
    );
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
    const [isUsingLayout, setIsUsingLayout] = useState<boolean>(false);
    const [isEditingAnswer, setIsEditingAnswer] = useState<boolean>(false);
    const [answer, setAnswer] = useState<string>("");
    const answerInputRef: React.RefObject<any> = createRef();
    const [optionLayoutSettings, setOptionLayoutSettings] =
        useState<OptionLayoutInterface>({
            width: 120,
            height: 50,
            spacing: { x: 20, y: 10 },
            direction: "horizontal",
            alignment: "left",
        });
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
                {
                    size: { width: 120, height: 50 },
                }
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
    const saveAnswer = () => {
        updateQuestion(question, { answer: answerInputRef.current?.value });
    };

    const setOptionAsAnswer = (item: OptionInterface) => {
        const updated = options.map((option: OptionInterface) => {
            return option.hash === item.hash
                ? {
                      ...option,
                      isAnswer:
                          question.optionType === OptionTypes.Single
                              ? true
                              : !option.isAnswer,
                  }
                : {
                      ...option,
                      isAnswer:
                          question.optionType === OptionTypes.Single
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

    const updateQuestion = (question: QuestionInterface, data: any) => {
        setQuestions((prev: any) => {
            const questionIndex = prev.findIndex(
                (q: QuestionInterface) => question.hash === q.hash
            );
            question = {
                ...question,
                ...data,
            };
            prev[questionIndex] = question;
            return [...prev];
        });
    };
    const updateOptionsData = (options: OptionInterface[]) => {
        updateQuestion(question, { options });
    };

    const updateOptionType = (optionType: OptionTypes) => {
        updateQuestion(question, { optionType });
    };

    const updateInputsData = (inputs: InputInterface[]) => {
        updateQuestion(question, { inputs });
    };

    const updateOptionLayoutSetting = (data: any) => {
        manager.event.emit(`layout.${question.hash}`, { ...data });
        setOptionLayoutSettings({ ...optionLayoutSettings, ...data });
    };

    useEffect(() => {
        searchTopic(topicSearchValue);
    }, [linkedTopics]);

    useEffect(() => {
        if (optionType !== question.optionType) {
            resetAnswers();
        }
    }, [optionType]);

    useEffect(() => {
        question.options && setOptions(question.options);
        question.optionType && setOptionType(question.optionType);
        question.inputs && setInputs(question.inputs);
        question.type && setQuestionType(question.type);
        question.answer && setAnswer(question.answer);
        if (activeOption) {
            setActiveOption(
                question.options?.filter(
                    (option: OptionInterface) =>
                        option.hash === activeOption.hash
                )[0]
            );
        }
        if (activeInput) {
            setActiveInput(
                question.inputs?.filter(
                    (input: InputInterface) => input.hash === activeInput.hash
                )[0]
            );
        }
        question.useOptionLayout && setIsUsingLayout(true);
        loadTopics();
    }, [question]); //Possible loop

    useEffect(() => {
        let optionSizes = {};
        if (question?.options?.length) {
            optionSizes = {
                width: question.options[0].layout?.size?.width ?? 120,
                height: question.options[0].layout?.size?.height ?? 50,
            };
        }
        let spacing =
            question?.layoutBoxConfig?.spacing ?? optionLayoutSettings.spacing;
        let alignment =
            question?.layoutBoxConfig?.alignment ??
            optionLayoutSettings.alignment;
        setOptionLayoutSettings({
            ...optionLayoutSettings,
            ...optionSizes,
            ...{ spacing, alignment },
        });
    }, [question.options]);

    useEffect(() => {
        setQuestions((prev: any) => {
            const questionIndex = prev.findIndex(
                (q: QuestionInterface) => q.hash === question.hash
            );
            // question.topics = [...linkedTopics.map((topic: any) => topic.id)];
            question.query = questionQuery.previous;
            question.useOptionLayout = isUsingLayout;
            prev[questionIndex] = question;
            return [...prev];
        });
    }, [linkedTopics, questionQuery.previous, isUsingLayout]);

    useEffect(() => {
        manager.event.listen("linkQuestionInput", (data: any) => {
            if (question.hash === data.questionHash) {
                updateInputsData([
                    ...inputs.map((i: InputInterface) => {
                        return i.hash === data.hash
                            ? { ...i, linkState: InputLinkedStates.Linked }
                            : i;
                    }),
                ])
            }
        });
    }, [manager]);

    return (
        <div className="w-full h-full mb-12 relative flex flex-col">
            {activeOption && (
                <OptionSideModal
                    option={activeOption}
                    setOptions={(clbk: any) => {
                        updateOptionsData(
                            typeof clbk === "function"
                                ? clbk(question.options)
                                : clbk
                        );
                    }}
                />
            )}
            {activeInput && (
                <InputSideModal
                    input={activeInput}
                    setInputs={(clbk: any) => {
                        updateInputsData(
                            typeof clbk === "function"
                                ? clbk(question.inputs)
                                : clbk
                        );
                    }}
                    closeModal={() => setActiveInput(null)}
                />
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
                    <select
                        className="w-full border-[2px] border-[#f2f2f2] rounded-[5px] py-1 px-1 text-[14px] mt-[5px] outline-none"
                        onChange={(e) =>
                            updateQuestion(question, { type: e.target.value })
                        }
                        value={questionType}
                    >
                        <option value={QuestionTypes.Multichoice}>
                            Multichoice
                        </option>
                        <option value={QuestionTypes.Subjective}>
                            Subjective
                        </option>
                    </select>
                </div>
                {question.type === QuestionTypes.Multichoice && (
                    <div className="px-2 mt-[15px]">
                        <p className="text-[14px] font-bold mb-2">
                            Manage options
                        </p>
                        <p className="text-[14px]">Options Type</p>
                        <select
                            className="w-full border-[2px] border-[#f2f2f2] rounded-[5px] py-1 px-1 text-[14px] mt-[5px] outline-none"
                            onChange={(e) =>
                                updateOptionType(e.target.value as OptionTypes)
                            }
                        >
                            <option value="single">Single selection</option>
                            <option value="multi">Multi selection</option>
                            <option value="button">Button</option>
                        </select>

                        <div className="my-2 border-[#f2f2f2] border-[1px] py-[3px]">
                            <div className="ml-1">
                                <input
                                    className="relative top-[1px] mr-[4px]"
                                    type="checkbox"
                                    name="use-layout"
                                    checked={isUsingLayout}
                                    onChange={() =>
                                        setIsUsingLayout(!isUsingLayout)
                                    }
                                />
                                <label
                                    className="text-[14px] cursor-pointer font-semibold"
                                    onClick={() =>
                                        setIsUsingLayout(!isUsingLayout)
                                    }
                                >
                                    Use option layout
                                </label>
                            </div>
                            {isUsingLayout && (
                                <>
                                    <div className="hidden ml-1 mt-1 flex border-t-[1px] py-2">
                                        <label className="text-[13px] font-semibold">
                                            Layout direction
                                        </label>
                                        <div className="ml-4 flex">
                                            <button
                                                className={`text-[13px] px-3 border-[1px] rounded-[5px] mx-1  
                                            ${
                                                optionLayoutSettings.direction ==
                                                "horizontal"
                                                    ? "bg-blue-500"
                                                    : "bg-white hover:bg-gray-100"
                                            }`}
                                                onClick={() =>
                                                    setOptionLayoutSettings({
                                                        ...optionLayoutSettings,
                                                        direction: "horizontal",
                                                    })
                                                }
                                            >
                                                <FaArrowsAltH
                                                    color={
                                                        optionLayoutSettings.direction ==
                                                        "horizontal"
                                                            ? "white"
                                                            : "blue"
                                                    }
                                                />
                                            </button>
                                            <button
                                                className={`text-[13px] px-3 border-[1px] rounded-[5px] mx-1 
                                            ${
                                                optionLayoutSettings.direction ==
                                                "vertical"
                                                    ? "bg-blue-500"
                                                    : "bg-white hover:bg-gray-100"
                                            }`}
                                                onClick={() =>
                                                    setOptionLayoutSettings({
                                                        ...optionLayoutSettings,
                                                        direction: "vertical",
                                                    })
                                                }
                                            >
                                                <FaArrowsAltV
                                                    color={
                                                        optionLayoutSettings.direction ==
                                                        "vertical"
                                                            ? "white"
                                                            : "blue"
                                                    }
                                                />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="ml-1 mt-1 flex justify-between">
                                        <div className="flex flex-col w-[45%]">
                                            <label className="text-[13px] font-semibold">
                                                Option width
                                            </label>
                                            <input
                                                className="w-full text-center text-[14px] border-[1px] rounded-[5px]"
                                                type="number"
                                                inputMode="numeric"
                                                pattern="[0-9\s]{13,19}"
                                                value={
                                                    optionLayoutSettings.width
                                                }
                                                max={400}
                                                onChange={({ target }) =>
                                                    updateOptionLayoutSetting({
                                                        width: Math.min(
                                                            parseInt(
                                                                target.value
                                                            ),
                                                            400
                                                        ),
                                                    })
                                                }
                                            />
                                        </div>
                                        <div className="flex flex-col w-[45%]">
                                            <label className="text-[13px] font-semibold">
                                                Option height
                                            </label>
                                            <input
                                                className="w-full text-center text-[14px] border-[1px] rounded-[5px]"
                                                type="number"
                                                inputMode="numeric"
                                                pattern="[0-9\s]{13,19}"
                                                value={
                                                    optionLayoutSettings.height
                                                }
                                                max={150}
                                                onChange={({ target }) =>
                                                    updateOptionLayoutSetting({
                                                        height: Math.min(
                                                            parseInt(
                                                                target.value
                                                            ),
                                                            150
                                                        ),
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="ml-1 mt-2 flex justify-between">
                                        <div className="flex flex-col w-[45%]">
                                            <label className="text-[13px] font-semibold">
                                                Horizontal gap
                                            </label>
                                            <input
                                                className="w-full text-center text-[14px] border-[1px] rounded-[5px]"
                                                type="number"
                                                inputMode="numeric"
                                                pattern="[0-9\s]{13,19}"
                                                value={
                                                    optionLayoutSettings.spacing
                                                        .x
                                                }
                                                onChange={({ target }) =>
                                                    updateOptionLayoutSetting({
                                                        spacing: {
                                                            ...optionLayoutSettings.spacing,
                                                            x: target.value,
                                                        },
                                                    })
                                                }
                                            />
                                        </div>
                                        <div className="flex flex-col w-[45%]">
                                            <label className="text-[13px] font-semibold">
                                                Vertical gap
                                            </label>
                                            <input
                                                className="w-full text-center text-[14px] border-[1px] rounded-[5px]"
                                                type="text"
                                                inputMode="numeric"
                                                pattern="[0-9\s]{13,19}"
                                                value={
                                                    optionLayoutSettings.spacing
                                                        .y
                                                }
                                                onChange={({ target }) =>
                                                    updateOptionLayoutSetting({
                                                        spacing: {
                                                            ...optionLayoutSettings.spacing,
                                                            y: target.value,
                                                        },
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="ml-1">
                                        <input
                                            className="relative top-[1px] mr-[4px]"
                                            type="checkbox"
                                            name="use-layout"
                                            checked={
                                                optionLayoutSettings.alignment ==
                                                "center"
                                            }
                                            onChange={() =>
                                                updateOptionLayoutSetting({
                                                    alignment:
                                                        optionLayoutSettings.alignment ==
                                                        "left"
                                                            ? "center"
                                                            : "left",
                                                })
                                            }
                                        />
                                        <label
                                            className="text-[14px] cursor-pointer font-semibold"
                                            onClick={() =>
                                                setOptionLayoutSettings({
                                                    ...optionLayoutSettings,
                                                    alignment:
                                                        optionLayoutSettings.alignment ==
                                                        "left"
                                                            ? "center"
                                                            : "left",
                                                })
                                            }
                                        >
                                            Center Align
                                        </label>
                                    </div>
                                </>
                            )}
                        </div>
                        <div>
                            <DataListManager
                                title="Options"
                                data={options}
                                setData={updateOptionsData}
                                setActiveItem={(option: OptionInterface) =>
                                    setActiveOption(
                                        option.hash === activeOption?.hash
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
                )}
                <div className="px-2 mt-[15px]">
                    <p className="text-[14px] font-bold mb-2">Set Answer</p>
                    <div className="flex border-[#e5e5e5] border-[2px] rounded-[5px]">
                        <ContentInput
                            className="w-full h-[32px] outline-none text-[14px] px-[5px] py-[2px]"
                            placeholder="Question Answer"
                            disabled={!isEditingAnswer}
                            content={answer}
                            ref={answerInputRef}
                        />
                        <button
                            className="w-[25%] cursor-pointer flex justify-center items-center border-[#e5e5e5] border-l-[2px]"
                            onClick={() => {
                                isEditingAnswer && saveAnswer();
                                setIsEditingAnswer(!isEditingAnswer);
                            }}
                        >
                            {!isEditingAnswer && (
                                <FaEdit className="text-blue-500 text-[16px]" />
                            )}
                            {isEditingAnswer && (
                                <FaCheckCircle className="text-green-500 text-[16px]" />
                            )}
                        </button>
                    </div>
                </div>
                <div className="px-2 mt-[15px]">
                    <p className="text-[14px] font-bold mb-2">Manage inputs</p>
                    <div>
                        <DataListManager
                            title="Inputs"
                            data={inputs}
                            setData={updateInputsData}
                            setActiveItem={(input: InputInterface) =>
                                setActiveInput(
                                    input.hash === activeInput?.hash
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
