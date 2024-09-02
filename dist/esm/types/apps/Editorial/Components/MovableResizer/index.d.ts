import { ComponentLayoutInterface } from "components/interface";
import { FC, ReactElement } from "react";
import { ControlPosition } from "react-draggable";
interface MovableResizerProps {
    draggableAxis: "both" | "x" | "y" | "none";
    position?: ControlPosition;
    onMove?: Function;
    size?: {
        width: number;
        height: number;
    };
    onResize?: Function;
    layout?: ComponentLayoutInterface;
    updateLayout?: Function;
    style?: React.CSSProperties;
    identifier?: string;
    isDraggable?: boolean;
    children: ReactElement;
}
declare const MovableResizer: FC<MovableResizerProps>;
export default MovableResizer;
