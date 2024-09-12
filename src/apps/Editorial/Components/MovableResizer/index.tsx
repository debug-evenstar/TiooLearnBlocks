import zIndex from "@mui/material/styles/zIndex";
import { _getManager } from "apps/Editorial/Base/Manager";
import { calculateMaxResizableArea } from "apps/Editorial/ViewBox/handler";
import { ComponentLayoutInterface } from "components/interface";
import {
    FC,
    ReactElement,
    ReactNode,
    createRef,
    useEffect,
    useState,
} from "react";
import Draggable, { ControlPosition } from "react-draggable";
import { Resizable } from "react-resizable";
import { transform } from "typescript";

interface MovableResizerProps {
    draggableAxis: "both" | "x" | "y" | "none";
    position?: ControlPosition;
    onMove?: Function;
    onDrag?: Function;
    size?: { width: number; height: number };
    onResize?: Function;
    resizable? : boolean;
    minimumSize? : {width : number, height : number}
    layout?: ComponentLayoutInterface;
    updateLayout?: Function;
    style?: React.CSSProperties;
    identifier?: string;
    isDraggable?: boolean;
    children: ReactElement;
}

const MovableResizer: FC<MovableResizerProps> = ({
    draggableAxis,
    position,
    onMove,
    onDrag,
    size,
    onResize,
    resizable=true,
    minimumSize,
    layout,
    updateLayout,
    style,
    children,
    identifier,
    isDraggable,
}) => {
    const nodeRef: any = createRef();
    const shadowRef: any = createRef();
    const [dimensions, setDimensions] = useState<{
        width: number;
        height: number;
    }>(size ?? layout?.size ?? ({} as any));
    const [draggablePosition, setDraggablePosition] = useState<ControlPosition>(
        {
            x: position?.x ?? layout?.position?.xAxis.offset ?? 0,
            y: position?.y ?? layout?.position?.yAxis.offset ?? 0,
        }
    );
    const [shadowPosition, setShadowPosition] = useState<ControlPosition>({
        x: position?.x ?? layout?.position?.xAxis.offset ?? 0,
        y: position?.y ?? layout?.position?.yAxis.offset ?? 0,
    });
    const [hasHandles, setHasHandles] = useState<boolean>(false);

    const simulateOrigin = (offsetX: number, offsetY: number) => {
        const x = draggablePosition.x - offsetX;
        const y = draggablePosition.y - offsetY;
        if (x < 0) {
            return false;
        }
        return { x, y };
    };

    const getResizeAxis = (handle : string) => (handle=="w"||handle=="e") ? "x" : "y";

    const handleResize = (previousSize: any, ref: React.RefObject<any>) => {
        if (!resizable) {
            return () => {};
        }
        return (event: any, { node, size, handle }: any) => {
            const canvas = document.getElementById("editorial-canvas");
            if (!canvas || !ref) return;
            const canvasSize = canvas.getBoundingClientRect();
            const elementPosition = ref.current.getBoundingClientRect();
            const maxArea = calculateMaxResizableArea(
                elementPosition,
                canvasSize
            );
            const width = Math.max( Math.min(size.width, maxArea.maxWidth), (minimumSize?.width ?? 0) );
            const height = Math.max(Math.min(size.height, maxArea.maxHeight), (minimumSize?.height ?? 0));
            if (
                width !== previousSize.width ||
                height !== previousSize.height
            ) {
                let offsetDrag;
                if (handle == "w" || handle == "n") {
                    offsetDrag = simulateOrigin(
                        width - previousSize.width,
                        height - previousSize.height
                    );
                    if (!offsetDrag) {
                        return;
                    }
                }
                setDimensions({ width, height });
                onResize && onResize({ width, height, position: offsetDrag, axis : getResizeAxis(handle)});
                updateLayout &&
                    updateLayout({ width, height, position: offsetDrag });
            }
        };
    };

    const handleMove = (event: any, data: any) => {
        if ((data.x !== 0 || data.y !== 0) && (draggableAxis !== "none")) {
            const moveData: any = { x: data.x, y: data.y };
            setDraggablePosition(moveData);
            onMove && onMove({ position: moveData });
            updateLayout && updateLayout({ position: moveData });
        }
    };

    const handleDrag = (event: any, { x, y }: any) => {
        setShadowPosition({ x, y });
        onDrag && onDrag({ position: { x, y } });
    };

    const handleDragStart = (e: any) => {
        e.dataTransfer.setData("text/plain", identifier);
    };

    const shadowStyle = () => {
        return {
            width: dimensions.width,
            height: dimensions.height,
            transform: `translate(${shadowPosition.x}px, ${shadowPosition.y}px)`,
            ...(isDraggable ? { zIndex: 99 } : {}),
        };
    };

    const toggleActiveClass = (event: any) => {
        shadowRef.current.classList.toggle("shadow-active");
    };

    useEffect(() => {
        size && setDimensions(size);
        layout &&
            layout.size &&
            setDimensions({
                width: layout.size.width,
                height: layout.size.height,
            });
    }, [size?.width, size?.height, layout?.size?.width, layout?.size?.height]);

    useEffect(() => {
        if (position) {
            setDraggablePosition(position);
            setShadowPosition(position);
        }
    }, [position]);

    return (
        <>
            <div
                ref={shadowRef}
                draggable={true}
                onDragStart={handleDragStart}
                style={shadowStyle()}
                className="absolute"
            ></div>
            <Draggable
                axis={draggableAxis}
                nodeRef={nodeRef}
                onDrag={handleDrag}
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
                    minConstraints={[0, 30]}
                    onResize={handleResize(dimensions, nodeRef)}
                    resizeHandles={hasHandles ? ["s", "e", "n", "w"] : []}
                >
                    <div
                        style={{
                            width: dimensions.width + "px",
                            height: dimensions.height + "px",
                            position: "absolute",
                            ...(style ?? {}),
                        }}
                        className={
                            "attach-child absolute draggable" +
                            (!hasHandles ? " hover:cursor-move" : "")
                        }
                        ref={nodeRef}
                        onDoubleClick={() => setHasHandles(!hasHandles)}
                        onMouseEnter={toggleActiveClass}
                        onMouseLeave={toggleActiveClass}
                    >
                        {children}
                    </div>
                </Resizable>
            </Draggable>
        </>
    );
};

export default MovableResizer;
