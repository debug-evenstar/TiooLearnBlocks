import { _getManager } from "apps/Editorial/Base/Manager";
import React, { ReactNode, useEffect, useRef } from "react";

interface ComponentStateProps {
    componentData: any;
    children: ReactNode[];
}

const ComponentState: React.FC<ComponentStateProps> = ({
    componentData,
    children,
}) => {
    const stateContainerRef = useRef<any>();
    const manager = _getManager();
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const container = stateContainerRef.current;
            if (
                container &&
                !container.contains(event.target as Node) &&
                componentData.id ==
                    manager.canvasManager.activeComponent.data.id
            ) {
                // manager.canvasManager.setActiveComponent(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    return (
        <>
            <div ref={stateContainerRef} className="w-full h-full">
                {children}
            </div>
        </>
    );
};

export default ComponentState;
