import { height } from "@mui/system";
import { _getManager, setComponentLayout } from "components/Editorial/Base/Manager";
import { QuestionInterface } from "components/Editorial/Sidebars/RightSidebar/InactiveSidebar";
import { OptionInterface } from "components/Editorial/Sidebars/RightSidebar/Questions/ActiveQuestion";
import { calculateMaxResizableArea } from "components/Editorial/ViewBox/handler";
import { FC, createRef, useEffect, useState } from "react";
import Draggable from "react-draggable";
import { Resizable } from "react-resizable";
import { updateQuestionInSlide, updateQuestionOption } from "./handler";

interface QuestionComponentProps {
   data : any;
}

interface OptionConfig {
    questionHash : string;
    sourceIndex : number;
    width : number;
    height : number;
    mode : string;
    position : any
}

const QuestionEditorialComponent: FC<QuestionComponentProps> = ({data}) => {
    const [questions, setQuestions] = useState<any>(data?.data ?? []);
    const [allOptions, setAllOptions] = useState<OptionInterface[]>([]);
    const [optionsConfigurations, setOptionsConfigurations] = useState<{[key : string] : OptionConfig}>({});
    const manager = _getManager();

    const optionConfig  = (hash : string) : OptionConfig => {
        const defaultConfig = { 
            width : 100, 
            height : 50, 
            mode : "move",
            position : { x : 0, y : 0}
        };
        return {
            ...defaultConfig, // Use default before overwrite
            ...(optionsConfigurations[hash] ?? {})
        };
    }

    const setOptionConfig = (hash : string , config : OptionConfig) => {
        setOptionsConfigurations((prev : any) => {
            const newConfig : any = {};
            newConfig[hash] = { ...(prev[hash] ?? {}), ...config};
            return {
                ...prev,
                ...newConfig
            };
          });
    }


    const simulateOrigin = (offsetX : number, offsetY : number, hash : string) => {
        const position = optionConfig(hash).position;
        const x = ((position.x ?? 0) - offsetX);
        const y = ((position.y ?? 0) - offsetY);
        if( x < 0 || y < 0) {
            return false
        }
        setOptionConfig(hash, { 
            position : { x, y }
        } as OptionConfig)
        return true;
    }

    const onResize = (hash:string, previousSize : any, ref : React.RefObject<any>) => {
        return (event: any, { node, size, handle }: any) => {
            const canvas = document.getElementById("editorial-canvas");
            if (!canvas || !ref) return;
            const canvasSize = canvas.getBoundingClientRect();
            const elementPosition = ref.current.getBoundingClientRect();
            const maxArea = calculateMaxResizableArea(elementPosition, canvasSize);
            const newWidth = Math.min(size.width, maxArea.maxWidth);
            const newHeight = Math.min(size.height, maxArea.maxHeight);
            if (newWidth !== previousSize.width || newHeight !== previousSize.height) {
                if (handle == "w" || handle == "n") {
                    const canSimulate = simulateOrigin((newWidth-previousSize.width), (newHeight - previousSize.height), hash)
                    if (!canSimulate) { return; }
                }
                setOptionConfig(hash, { width : newWidth, height : newHeight} as OptionConfig)
                updateOptionSize(newWidth, newHeight, hash);
            }
        }
    };

    const onMove = (event: any, data: any, hash : string) => {
        if(data.x !== 0 || data.y !== 0) {
            setOptionConfig(hash, {position : {x : data.x, y : data.y}} as OptionConfig)
            updateOptionPosition(data, hash);
        }
    }
    const updateOptionLayout = (data : any, hash : string) => {
        const config = optionConfig(hash);
        const layout = setComponentLayout(
            manager.canvasManager.canvas.getCanvasSize(),
            {
            ...{ 
                size : { width : config.width, height : config.height },
                position : { xAxis : { offset : config.position.x ?? 0} , yAxis : { offset : config.position.y ?? 0 }}
            },
            ...data,
            }
        );
        updateQuestionOption( config.sourceIndex, config.questionHash, {layout})
    };
    const updateOptionSize = (width: number, height: number, hash : string) => updateOptionLayout({ size : { width , height}}, hash);
    const updateOptionPosition = (data : {x : number, y : number}, hash : string) => updateOptionLayout({ 
        position: {
            xAxis: { offset: data.x },
            yAxis: { offset: data.y },
        }
    }, hash);

    useEffect(()=>{
        setQuestions([...(data?.data ?? [])]);
    },[data, data.data])

    useEffect(()=>{
        let options : any[] = [];
        let configs : any = optionsConfigurations;
        questions.forEach((question:any) => {
            const questionOptions = question.options ?? [];
            options = [...(questionOptions)];
            questionOptions.forEach((option : OptionInterface, index : number) => {
                configs[option.hash] = {
                    questionHash : question.hash,
                    sourceIndex : index,
                    width : 100, 
                    height : 50, 
                    mode : "move",
                    position : { x : 0, y : 0 },
                    ...(configs[option.hash] ?? {})
                }
            });
        });
        setAllOptions(() => options);
        setOptionsConfigurations(configs);
    },[questions]);

    return (
        <>
            {
                allOptions.map((option : OptionInterface, index : number) => {
                    const nodeRef: any = createRef();
                    return(
                        <Draggable
                            key={option.hash}
                            axis={"both"}
                            nodeRef={nodeRef}
                            onStop={(e,d)=>{onMove(e,d,option.hash)}}
                            handle=".option"
                            defaultClassName="w-fit"
                            position={{x: optionConfig(option.hash)?.position?.x ?? 0, y: optionConfig(option.hash)?.position?.y ?? 0}} //Experimental
                            bounds="parent"
                            disabled={optionConfig(option.hash).mode != "move"}
                        >
                            <Resizable
                                width={optionConfig(option.hash).width}
                                height={optionConfig(option.hash).height}
                                onResize={onResize(option.hash, optionConfig(option.hash), nodeRef)}
                                resizeHandles={
                                    optionConfig(option.hash).mode == "resize"
                                        ? ["s", "e", "n", "w"]
                                        : []
                                }
                            >
                                <button 
                                    style={{
                                        width: optionConfig(option.hash).width + "px",
                                        height: optionConfig(option.hash).height + "px",
                                    }}
                                    className={
                                        "absolute text-[14px] border-[2px] border-[#E5E5E5] rounded-[16px] p-[10px] shadow-md shadow option" +
                                        (optionConfig(option.hash).mode == "move" ? ' hover:cursor-move' : '')
                                    }
                                    ref={nodeRef}
                                    onDoubleClick={() => setOptionConfig(option.hash, {
                                        mode : optionConfig(option.hash).mode == "resize" ? "move" : "resize"
                                    } as OptionConfig)}
                                >
                                    {option.title}
                                </button>
                            </Resizable>

                        </Draggable>
                )})
            }
        </>
    );
};

export default QuestionEditorialComponent;
