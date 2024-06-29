import { ComponentBaseDataInterface } from "components/interface";
interface TextComponentDataInterface extends ComponentBaseDataInterface {
    content: string;
    tips?: string[];
}
export declare const setTextComponentData: (content?: string, tips?: string[]) => TextComponentDataInterface;
export {};
