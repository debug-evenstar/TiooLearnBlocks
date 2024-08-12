import { ComponentBaseDataInterface } from "components/interface";
interface TextComponentDataInterface extends ComponentBaseDataInterface {
    content: string;
    tips?: string[];
}
export declare const textComponentData: (content?: string, tips?: string[]) => TextComponentDataInterface;
export {};
