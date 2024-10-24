import { FC, useEffect, useState } from "react";
import {
    LayoutComponentProps,
    responsiveLeftOffset,
    responsiveStyles,
    responsiveTopOffset,
} from "./handler";
import {
    ComponentPositionInterface,
    ComponentSizeInterface,
} from "components/interface";

const LayoutComponent: FC<LayoutComponentProps> = ({
    layout,
    children,
    responsiveOptions,
}) => {
    const [position, setPosition] = useState<ComponentPositionInterface>();
    const [size, setSize] = useState<ComponentSizeInterface>();
    const [positionStyles, setPositionStyles] = useState<{
        [key: string]: string;
    }>({});
    const [sizeStyles, setSizeStyles] = useState<{ [key: string]: string }>({});
    const { clientWidth, clientHeight } = document.documentElement;

    const className = () => {
        return clientWidth < 640
            ? "relative flex flex-col justify-center"
            : "absolute";
    };

    const layoutStyles = () => ({
        ...positionStyles,
        ...sizeStyles,
        ...responsiveStyles(responsiveOptions),
    });
    useEffect(() => {
        if (layout?.position) {
            setPosition(layout.position);
            setPositionStyles(() => ({
                top: `${responsiveTopOffset(
                    layout.position?.yAxis.offsetPercent
                )}%`,
                left: `${responsiveLeftOffset(
                    layout.position?.xAxis.offsetPercent
                )}%`,
            }));
        }

        if (layout?.size) {
            setSize(layout.size);
            setSizeStyles(() => ({
                width: `${layout.size?.widthPercent}%`,
                height: `${
                    clientWidth < 640 ? "auto" : layout.size?.heightPercent
                }%`,
            }));
        }
    }, [layout]);

    return (
        <div style={layoutStyles()} className={className()}>
            {children}
        </div>
    );
};

export default LayoutComponent;
