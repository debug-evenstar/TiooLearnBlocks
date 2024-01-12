import { ComponentLayoutInterface } from "components/interface";
import { ReactNode } from "react";

export interface LayoutComponentProps {
    layout : ComponentLayoutInterface;
    children : ReactNode;
}