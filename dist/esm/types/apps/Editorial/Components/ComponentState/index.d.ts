import React, { ReactNode } from "react";
interface ComponentStateProps {
    componentData: any;
    children: ReactNode[];
}
declare const ComponentState: React.FC<ComponentStateProps>;
export default ComponentState;
