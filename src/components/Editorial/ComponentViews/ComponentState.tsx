import React, { FC, useEffect, useRef, useState } from "react";
import { ComponentStateManagerProps } from "./interfaces";
import ViewBox from "../ViewBox";
import { BoxConfiguration } from "../interfaces";
import EditBox from "../EditBox";

const ComponentStateManager: FC<ComponentStateManagerProps> = ({ id, children }) => {
    // 0 -- View State, 1 -- Edit State
    const [currentState, setCurrentState] = useState(0);
    const [boxConfiguration, setBoxConfiguration] = useState({
        width: 0,
        height: 0,
        xOffset: 0,
        yOffset: 0,
    });
    const boxRef = React.createRef<HTMLDivElement>();

    const updateBoxConfig = (configUpdate: BoxConfiguration) => {
        setBoxConfiguration(() => configUpdate);
    };

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (boxRef.current && !boxRef.current.contains(event.target)) {
                setCurrentState(0);
            }
        };
        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    }, []);

    return (
        <div ref={boxRef} onDoubleClick={() => setCurrentState(1)}>
            {!!currentState ? (
                <EditBox
                    id={id}
                    boxConfiguration={boxConfiguration}
                >
                    {children}
                </EditBox>
            ) : (
                <ViewBox
                    id={id}
                    boxConfiguration={boxConfiguration}
                    updateBoxConfiguration={updateBoxConfig}
                >
                    {children}
                </ViewBox>
            )}
        </div>
    );
};

export default ComponentStateManager;
