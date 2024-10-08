import { ComponentLayoutInterface } from "components/interface";
import { FC, ReactElement } from "react";
import { ControlPosition } from "react-draggable";
interface MovableResizerProps {
    draggableAxis: "both" | "x" | "y" | "none";
    position?: ControlPosition;
    onMove?: Function;
    onDrag?: Function;
    onMouseDown?: Function;
    size?: {
        width: number;
        height: number;
    };
    onResize?: Function;
    resizable?: boolean;
    minimumSize?: {
        width: number;
        height: number;
    };
    layout?: ComponentLayoutInterface;
    updateLayout?: Function;
    style?: React.CSSProperties;
    dropData?: any;
    isDraggable?: boolean;
    children: ReactElement;
}
declare const MovableResizer: FC<MovableResizerProps>;
export default MovableResizer;
