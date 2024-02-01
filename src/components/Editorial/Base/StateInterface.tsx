export interface FeedbackState {
  optionIndex: number;
  status: boolean;
  type: "OBJECTIVE" | "SUBJECTIVE";
}

export interface OptionsDataState {
  identifier: string;
  correctOption: string;
  wrongOption: string;
  objectiveIndex: number;
}

export interface SliderState {
  activeCompName: string;
  activeCompIndex: number;
}

export interface GridState {
  gridIsEditable: boolean;
}

export type ActiveViewBoxState = string;
export type OverlayActiveState = boolean;
export type ShowOptionsBoxState = boolean;
export type TriggerState = boolean;
export type RightSidebarState = boolean;
