import { ComponentBaseDataInterface } from "components/interface";
interface NewComponentDataInterface extends ComponentBaseDataInterface {
    url?: string;
    slides?: any[];
    cards?: any[];
    start?: string;
    end?: string;
    steps?: number;
    size?: string;
    answers?: [string];
    feedbacks?: any[];
}
export declare const newImageComponentData: () => NewComponentDataInterface;
export declare const videoComponentData: () => NewComponentDataInterface;
export declare const flashcardComponentData: () => NewComponentDataInterface;
export declare const sliderComponentData: () => NewComponentDataInterface;
export declare const gridComponentData: () => NewComponentDataInterface;
export {};
