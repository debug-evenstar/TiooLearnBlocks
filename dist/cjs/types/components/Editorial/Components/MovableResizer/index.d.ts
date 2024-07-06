import { FC, ReactElement } from "react";
import { ControlPosition } from "react-draggable";
interface MovableResizerProps {
    draggableAxis: "both" | "x" | "y" | "none";
    position: ControlPosition;
    onMove: Function;
    size: {
        width: number;
        height: number;
    };
    onResize: Function;
    style?: React.CSSProperties;
    children: ReactElement;
}
declare const MovableResizer: FC<MovableResizerProps>;
export default MovableResizer;
