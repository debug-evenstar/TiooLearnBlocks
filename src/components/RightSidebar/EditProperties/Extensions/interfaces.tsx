export type OptionType = {
  name: string;
};

export type ObjectiveItemType = {
  id: number;
  name: string;
  options: [OptionType];
};

export interface ObjectiveItemProp {
  objective: ObjectiveItemType;
}
