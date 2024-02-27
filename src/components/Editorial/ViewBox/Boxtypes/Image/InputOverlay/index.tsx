import React, {FC, Ref, useEffect, useState} from "react";
import Draggable from "react-draggable";
import {Resizable} from "react-resizable";
import {ComponentBaseDataInterface, ComponentLayoutInterface} from "../../../../../interface";

const OverlayInput :FC<{
    index : number,
    ref : React.RefObject<any>,
    data : any,
    parentLayout? : ComponentLayoutInterface,
    onResize : Function,
    onDrag : Function,
    onClick : Function
}> = ({index, ref, data, parentLayout, onResize,onDrag, onClick}) => {
    const [inputLayout, setInputLayout] = useState<any>(data.layout);

    const loadPosition = () => {
        if (data.layout && data.layout.position) {
            return {
                x: data.layout.position.xAxis.offset,
                y: data.layout.position.yAxis.offset,
            };
        }
        return { x: 0, y: 0 };
    };

    useEffect(() => {
        setInputLayout( {
            ...data.layout,
            size : {
                ...data.layout.size,
                width : parentLayout?.size?.width ?  (data.layout.size?.widthPercent)/100 * (parentLayout?.size?.width) : data.layout.size?.width,
                height : parentLayout?.size?.height ? (data.layout.size?.heightPercent)/100 * (parentLayout?.size?.height) : data.layout.size?.height
            }
        });
    }, [data.layout, parentLayout]);
    return (
        <Draggable
            key={index}
            axis="both"
            nodeRef={ref}
            handle=".inputHandle"
            onStop={(event, data) => onDrag(event, data, index)}
            defaultPosition={loadPosition()}
        >
            <Resizable
                width={inputLayout.size.width}
                height={inputLayout.size.height}
                minConstraints={[20, 5]}
                onResize={(event: any, { node, size, handle }: any) =>
                    onResize(event, { node, size, handle }, index)
                }
                resizeHandles={["s", "e", "se"]}
            >
                <div
                    onClick={() => onClick(data, index)}
                    ref={ref}
                    style={{
                        width: inputLayout.size.width + "px",
                        height: inputLayout.size.height + "px",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        zIndex: "200",
                        padding: "0.05rem",
                    }}
                >
                  <textarea
                      className="w-full h-full p-1.5 inputHandle"
                      placeholder={`Input ${index + 1}`}
                  />
                </div>
            </Resizable>
        </Draggable>
    );
}

export default OverlayInput;