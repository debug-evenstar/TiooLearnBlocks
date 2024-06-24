import { _getManager } from "components/Editorial/Base/Manager";
import { calculateMaxResizableArea } from "components/Editorial/ViewBox/handler";
import { FC, ReactNode, createRef, useEffect, useState } from "react";
import Draggable, { ControlPosition } from "react-draggable";
import { Resizable } from "react-resizable";

interface MovableResizerProps {
    draggableAxis : "both"|"x"|"y"|"none";
    position? : ControlPosition; 
    onMove : Function;
    canMove? : boolean;
    size : { width : number, height : number};
    onResize : Function;
    hasHandles : boolean;
    children : ReactNode;
}

const MovableResizer: FC<MovableResizerProps> = ({
    draggableAxis,
    position,
    onMove,
    canMove,
    size,
    onResize,
    hasHandles
}, children) => {
    const nodeRef: any = createRef();
    const [dimensions, setDimensions] = useState<{width : number, height : number}>(size);
    const [draggablePosition, setDraggablePosition] = useState<ControlPosition>(position ?? { x : 0, y : 0});
    
    const simulateOrigin = (offsetX : number, offsetY : number) => {
        const x = draggablePosition.x - offsetX;
        const y = draggablePosition.y - offsetY;
        if( x < 0 || y < 0) {
            return false
        }
        onMove({position : {x , y}});
        return true;
    }

    const handleResize = (previousSize : any, ref : React.RefObject<any>) => {
        return (event: any, { node, size, handle }: any) => {
            const canvas = document.getElementById("editorial-canvas");
            if (!canvas || !ref) return;
            const canvasSize = canvas.getBoundingClientRect();
            const elementPosition = ref.current.getBoundingClientRect();
            const maxArea = calculateMaxResizableArea(elementPosition, canvasSize);
            const width = Math.min(size.width, maxArea.maxWidth);
            const height = Math.min(size.height, maxArea.maxHeight);
            if (width !== previousSize.width || height !== previousSize.height) {
                if (handle == "w" || handle == "n") {
                    const canSimulate = simulateOrigin((width-previousSize.width), (height - previousSize.height))
                    if (!canSimulate) { return; }
                }
                setDimensions({ width, height});
                onResize({width, height});
            }
        }
    };

    const handleMove = (event: any, data: any) => {
        if(data.x !== 0 || data.y !== 0) {
            onMove({position : {x : data.x, y : data.y}});
            setDraggablePosition({x : data.x, y : data.y});
        }
    }

    useEffect(()=>{
        setDimensions(size);
        if(position) {
            setDraggablePosition(position)
        }
    },[size, position]);

    return (
            <Draggable
                axis={draggableAxis}
                nodeRef={nodeRef}
                onStop={handleMove}
                handle=".option"
                defaultClassName="w-fit"
                position={position} //Experimental
                bounds="parent"
                disabled={canMove}
            >
                <Resizable
                    width={dimensions.width}
                    height={dimensions.height}
                    minConstraints={[0,35]}
                    onResize={handleResize(dimensions, nodeRef)}
                    resizeHandles={ hasHandles ? ["s", "e", "n", "w"] : [] }
                >
                    {children}
                </Resizable>
            </Draggable>
    );
};

export default MovableResizer;
