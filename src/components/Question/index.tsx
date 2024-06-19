import { height } from "@mui/system";
import { _getManager } from "components/Editorial/Base/Manager";
import { OptionInterface } from "components/Editorial/Sidebars/RightSidebar/Questions/ActiveQuestion";
import { calculateMaxResizableArea } from "components/Editorial/ViewBox/handler";
import { FC, createRef, useEffect, useState } from "react";
import Draggable from "react-draggable";
import { Resizable } from "react-resizable";

interface QuestionComponentProps {
   data : any;
}

interface OptionConfig {
    width : number;
    height : number;
    mode : string;
    position : any
}

const QuestionComponent: FC<QuestionComponentProps> = ({data}) => {
    const [questions, setQuestions] = useState<any>(data?.data ?? []);
    const [allOptions, setAllOptions] = useState<any>([]);
    const [optionsConfigurations, setOptionsConfigurations] = useState<any>({});

    const optionConfig = (i : number) => {
        const defaultConfig = { 
            width : 100, 
            height : 50, 
            mode : "move"
        };
        return {
            ...defaultConfig, // Use default before overwrite
            ...(optionsConfigurations[i.toString()] ?? {})
        };
    }

    const setOptionConfig = (index : number , config : OptionConfig) => {
        setOptionsConfigurations((prev : any) => {
            const newConfig : any = {};
            newConfig[index.toString()] = { ...(prev[index.toString()] ?? {}), ...config};
            return {
                ...prev,
                ...newConfig
            };
          });
    }


    const simulateOrigin = (offsetX : number, offsetY : number, index : number) => {
        const position = optionConfig(index).position;
        const x = ((position.x ?? 0) - offsetX);
        const y = ((position.y ?? 0) - offsetY);
        if( x < 0 || y < 0) {
            return false
        }
        setOptionConfig(index, { 
            position : { x, y }
        } as OptionConfig)
        return true;
    }

    const onResize = (index:number, previousSize : any, ref : React.RefObject<any>) => {
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
                    const canSimulate = simulateOrigin((newWidth-previousSize.width), (newHeight - previousSize.height), index)
                    if (!canSimulate) { return; }
                }
                setOptionConfig(index, { width : newWidth, height : newHeight} as OptionConfig)
                updateComponentLayout(newWidth, newHeight);
            }
        }
    };

    const onMove = (event: any, data: any, index : number) => {
        if(data.x !== 0 || data.y !== 0) {
            setOptionConfig(index, {position : {x : data.x, y : data.y}} as OptionConfig)
        }
    }
    const updateComponentLayout = (width: number, height: number) => {
        // const layout = setComponentLayout(
        //     manager.canvasManager.canvas.getCanvasSize(),
        //     {
        //     ...manager.canvasManager.getComponentData(id).layout,
        //     size: { width, height },
        //     }
        // );
        // manager.canvasManager.canvas.updateActiveComponentData({layout});
    };
    useEffect(()=>{
        setQuestions([...(data?.data ?? [])]);
    },[data, data.data])

    useEffect(()=>{
        setAllOptions(() => {
            let options : any[] = [];
            questions.forEach((question:any) => {
                options = [...options, ...(question.options ?? [])];
            });
            return options;
        });
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
                            onStop={(e,d)=>{onMove(e,d,index)}}
                            handle=".option"
                            defaultClassName="w-fit"
                            position={{x: optionConfig(index)?.position?.x ?? 0, y: optionConfig(index)?.position?.y ?? 0}} //Experimental
                            bounds="parent"
                            disabled={optionConfig(index).mode != "move"}
                        >
                            <Resizable
                                width={optionConfig(index).width}
                                height={optionConfig(index).height}
                                onResize={onResize(index, optionConfig(index), nodeRef)}
                                resizeHandles={
                                    optionConfig(index).mode == "resize"
                                        ? ["s", "e", "n", "w"]
                                        : []
                                }
                            >
                                <button 
                                    style={{
                                        width: optionConfig(index).width + "px",
                                        height: optionConfig(index).height + "px",
                                        transformOrigin : "center",
                                    }}
                                    className={
                                        "absolute text-[14px] border-[2px] border-[#E5E5E5] rounded-[15px] p-[10px] shadow-md shadow option" +
                                        (optionConfig(index).mode == "move" ? ' hover:cursor-move' : '')
                                    }
                                    ref={nodeRef}
                                    onDoubleClick={() => setOptionConfig(index, {
                                        mode : optionConfig(index).mode == "resize" ? "move" : "resize"
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

export default QuestionComponent;
