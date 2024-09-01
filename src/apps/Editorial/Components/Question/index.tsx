import { height } from "@mui/system";
import { _getManager, setComponentLayout } from "apps/Editorial/Base/Manager";
import { QuestionInterface } from "apps/Editorial/Sidebars/RightSidebar/InactiveSidebar";
import {
    InputInterface,
    InputLinkedStates,
    OptionInterface,
} from "apps/Editorial/Sidebars/RightSidebar/Questions/ActiveQuestion";
import { calculateMaxResizableArea } from "apps/Editorial/ViewBox/handler";
import { FC, createRef, useEffect, useState } from "react";
import Draggable from "react-draggable";
import { Resizable } from "react-resizable";
import { updateQuestionInSlide, updateQuestionData } from "./handler";
import MovableResizer from "../MovableResizer";
import zIndex from "@mui/material/styles/zIndex";

interface QuestionComponentProps {
    data: any;
}

interface Config {
    questionHash: string;
    sourceIndex: number;
    width: number;
    height: number;
    position: any;
}

const QuestionEditorialComponent: FC<QuestionComponentProps> = ({ data }) => {
    const [questions, setQuestions] = useState<any>(data?.data ?? []);
    const [allOptions, setAllOptions] = useState<OptionInterface[]>([]);
    const [allInputs, setAllInputs] = useState<InputInterface[]>([]);
    const [optionsConfigurations, setOptionsConfigurations] = useState<{
        [key: string]: Config;
    }>({});
    const [inputConfigurations, setInputConfigurations] = useState<{
        [key: string]: Config;
    }>({});

    const [questionToggleState, setQuestionToggleState] = useState<{
        [key: string]: boolean;
    }>(
        (data?.data ?? []).reduce(
            (a: any, v: QuestionInterface) => ({ ...a, [v.hash]: true }),
            {}
        )
    );

    const manager = _getManager();

    const optionConfig = (hash: string): Config => {
        const defaultConfig = {
            width: 100,
            height: 50,
            position: { x: 0, y: 0 },
        };
        return {
            ...defaultConfig, // Use default before overwrite
            ...(optionsConfigurations[hash] ?? {}),
        };
    };

    const inputConfig = (hash: string): Config => {
        const defaultConfig = {
            width: 80,
            height: 40,
            position: { x: 0, y: 0 },
        };
        return {
            ...defaultConfig, // Use default before overwrite
            ...(inputConfigurations[hash] ?? {}),
        };
    };

    const valueIsUrl = (value: string) => value.includes("https://");

    // const setOptionConfig = (hash : string , config : OptionConfig) => {
    //     setOptionsConfigurations((prev : any) => {
    //         const newConfig : any = {};
    //         newConfig[hash] = { ...(prev[hash] ?? {}), ...config};
    //         return {
    //             ...prev,
    //             ...newConfig
    //         };
    //       });
    // }

    const updateLayout = (data: any, hash: string, dataKey: string) => {
        const config =
            dataKey == "options" ? optionConfig(hash) : inputConfig(hash);
        const layout = setComponentLayout(
            manager.canvasManager.canvas.getCanvasSize(),
            {
                size: {
                    width: data.width ?? config.width,
                    height: data.height ?? config.height,
                },
                position: {
                    xAxis: {
                        offset: data.position?.x ?? config.position.x ?? 0,
                    },
                    yAxis: {
                        offset: data.position?.y ?? config.position.y ?? 0,
                    },
                },
            }
        );
        updateQuestionData(
            config.sourceIndex,
            config.questionHash,
            { layout },
            dataKey
        );
    };

    useEffect(() => {
        setQuestions([...(data?.data ?? [])]);
    }, [data, data.data]);

    useEffect(() => {
        let options: any[] = [];
        let inputs: any[] = [];
        let optionConfigs: any = optionsConfigurations;
        let inputConfigs: any = inputConfigurations;
        questions.forEach((question: any) => {
            const questionOptions = question.options ?? [];
            const questionInputs = question.inputs ?? [];
            options = [...options, ...questionOptions];
            inputs = [...inputs, ...questionInputs];
            [questionOptions, questionInputs].forEach(
                (list: any[], listIndex: number) => {
                    const dataConfigs =
                        listIndex == 0 ? optionConfigs : inputConfigs;
                    list.forEach(
                        (
                            data: OptionInterface | InputInterface,
                            index: number
                        ) => {
                            const itemData = {
                                questionHash: question.hash,
                                sourceIndex: index,
                                width: data.layout?.size?.width ?? 100,
                                height: data.layout?.size?.height ?? 50,
                                mode: dataConfigs[data.hash]?.mode ?? "move",
                                position: {
                                    x: data.layout?.position?.xAxis.offset ?? 0,
                                    y: data.layout?.position?.yAxis.offset ?? 0,
                                },
                            };
                            dataConfigs[data.hash] = itemData;
                        }
                    );
                }
            );
        });
        setAllOptions(() => options);
        setOptionsConfigurations(optionConfigs);
        setAllInputs(() => inputs);
        setInputConfigurations(inputConfigs);
    }, [questions]);

    useEffect(() => {
        // Handle Question Toggle
        const questionToggle: { [key: string]: boolean } =
            manager.states.canvasStates?.questionToggle;
        if (questionToggle) {
            const updated = Object.keys(questionToggleState).reduce(
                (a: any, v: any) => ({ ...a, [v]: questionToggle[v] ?? true }),
                {}
            );
            setQuestionToggleState({ ...updated });
        }
    }, [manager.states]);

    return (
        <>
            {allOptions.map((option: OptionInterface, index: number) => {
                const config = optionConfig(option.hash);
                return questionToggleState[config.questionHash] ? (
                    <MovableResizer
                        key={index + option.title}
                        draggableAxis="both"
                        onMove={(data: any) =>
                            updateLayout(data, option.hash, "options")
                        }
                        size={{
                            width: optionConfig(option.hash).width,
                            height: optionConfig(option.hash).height,
                        }}
                        onResize={(data: any) =>
                            updateLayout(data, option.hash, "options")
                        }
                        position={optionConfig(option.hash).position}
                    >
                        {valueIsUrl(option.title) ? (
                            <button className="relative text-[14px] border-[2px] border-[#E5E5E5] rounded-[16px] p-[5px] shadow-md shadow overflow-hidden flex justify-center align-center">
                                <img
                                    className="h-full"
                                    src={option.title}
                                    alt="Option"
                                    draggable={false}
                                />
                            </button>
                        ) : (
                            <button
                                className="relative text-[14px] border-[2px] border-[#E5E5E5] rounded-[16px] p-[5px] shadow-md shadow"
                                dangerouslySetInnerHTML={{
                                    __html: option.title,
                                }}
                            ></button>
                        )}
                    </MovableResizer>
                ) : (
                    <div key={index + option.title}></div>
                );
            })}
            {allInputs.map((input: InputInterface, index: number) => {
                const config = inputConfig(input.hash);
                return questionToggleState[config.questionHash] &&
                    !(input.linkState == InputLinkedStates.Linked) ? (
                    <MovableResizer
                        key={index + input.title}
                        draggableAxis="both"
                        onMove={(data: any) =>
                            updateLayout(data, input.hash, "inputs")
                        }
                        size={{
                            width: inputConfig(input.hash).width,
                            height: inputConfig(input.hash).height,
                        }}
                        onResize={(data: any) =>
                            updateLayout(data, input.hash, "inputs")
                        }
                        position={inputConfig(input.hash).position}
                        style={{ zIndex: 10 }}
                        identifier={`Questions.${config.questionHash}.input.${input.hash}`}
                        isDraggable={
                            input.linkState == InputLinkedStates.PendingLink
                        }
                        // data={`JSON.stringify(More structured data)`} // Switch to this format later
                    >
                        <input className="relative bg-white text-[14px] border-[2px] border-[#E5E5E5] rounded-[16px] p-[5px] shadow-md" />
                        {/* <button
                                className="relative text-[14px] border-[2px] border-[#E5E5E5] rounded-[16px] p-[5px] shadow-md shadow"
                            >
                                {option.title}
                            </button> */}
                    </MovableResizer>
                ) : (
                    <div key={index + input.title}></div>
                );
            })}
        </>
    );
};

export default QuestionEditorialComponent;
