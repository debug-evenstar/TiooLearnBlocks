import React, { ReactNode, useRef } from "react";

interface ComponentStateProps {
    componentData: any;
    children: ReactNode[];
}

const ComponentState: React.FC<ComponentStateProps> = ({
    componentData,
    children,
}) => {
    const stateContainerRef = useRef<any>();
    return (
        <>
            <div ref={stateContainerRef} className="w-full h-full">
                {children}
            </div>
        </>
    );
};

export default ComponentState;
