import { _getManager } from "apps/Editorial/Base/Manager";
import { calculateMaxResizableArea } from "apps/Editorial/ViewBox/handler";
import { FC, ReactElement, ReactNode, createRef, useEffect, useState } from "react";
import Draggable, { ControlPosition } from "react-draggable";
import { Resizable } from "react-resizable";

interface MovableResizerProps {
    draggableAxis : "both"|"x"|"y"|"none";
    position : ControlPosition; 
    onMove : Function;
    size : { width : number, height : number};
    onResize : Function;
    style? : React.CSSProperties;
    children : ReactElement;
}

const MovableResizer: FC<MovableResizerProps> = ({
    draggableAxis,
    position,
    onMove,
    size,
    onResize,
    style,
    children
}) => {
    const nodeRef: any = createRef();
    const [dimensions, setDimensions] = useState<{width : number, height : number}>(size);
    const [draggablePosition, setDraggablePosition] = useState<ControlPosition>({x: position?.x ?? 0, y : position?.y ?? 0});
    const [hasHandles, setHasHandles] = useState<boolean>(false);
    
    const simulateOrigin = (offsetX : number, offsetY : number) => {
        const x = draggablePosition.x - offsetX;
        const y = draggablePosition.y - offsetY;
        if( x < 0 ) {
            return false;
        }
        return {x, y};
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
                let offsetDrag;
                if (handle == "w" || handle == "n") {
                    offsetDrag = simulateOrigin((width-previousSize.width), (height - previousSize.height))
                    if (!offsetDrag) { return; }
                }
                setDimensions({ width, height});
                onResize({width, height, position : offsetDrag});
            }
        }
    };

    const handleMove = (event: any, data: any) => {
        if(data.x !== 0 || data.y !== 0) {
            const moveData : any = {x : data.x, y : data.y};
            setDraggablePosition(moveData);
            onMove({position : moveData});
        }
    }

    useEffect(()=>{
        setDimensions(size);
    },[size.width, size.height]);

    useEffect(()=>{
        if(position) {
            setDraggablePosition(position)
        }
    },[position]);

    return (
            <Draggable
                axis={draggableAxis}
                nodeRef={nodeRef}
                onStop={handleMove}
                handle=".draggable"
                defaultClassName="w-fit"
                position={draggablePosition} //Experimental
                bounds="parent"
                disabled={hasHandles}
            >
                <Resizable
                    width={dimensions.width}
                    height={dimensions.height}
                    minConstraints={[0,30]}
                    onResize={handleResize(dimensions, nodeRef)}
                    resizeHandles={ hasHandles ? ["s", "e", "n", "w"] : [] }
                >
                    <div
                        style={{ 
                            width: dimensions.width + "px", 
                            height: dimensions.height + "px",
                            position : "absolute",
                            ...(style ?? {})
                        }}
                        className={"attach-child absolute draggable" + ( !hasHandles ? ' hover:cursor-move' : '')}
                        ref={nodeRef}
                        onDoubleClick={() => setHasHandles(!hasHandles)}
                    >
                        {children}
                    </div>
                </Resizable>
            </Draggable>
    );
};

export default MovableResizer;
