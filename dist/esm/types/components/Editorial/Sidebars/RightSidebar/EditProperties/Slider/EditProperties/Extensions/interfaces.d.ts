import { EditorialManagerInterface } from "components/Editorial/Base/EditorialManager";
export type OptionType = {
    name: string;
};
export type ObjectiveItemType = {
    id: number;
    name: string;
    options: [OptionType];
};
export interface ObjectiveItemProp {
    objective: any;
    data: any;
    index: number;
    handleDelete: (id: string, optionIndex: number, index: number) => void;
    manager: EditorialManagerInterface;
}
