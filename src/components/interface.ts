import { LessonSlideInterface } from "./SlideManager/handler";

export interface PositionProperties {
  offset: number;
  offsetPercent?: number;
}


export interface ComponentPositionInterface {
  xAxis: PositionProperties;
  yAxis: PositionProperties;
}


export interface ComponentSizeInterface {
  width: number;
  widthPercent?: number;
  height: number;
  heightPercent?: number;
}

export interface ComponentLayoutInterface {
  position?: ComponentPositionInterface;
  size?: ComponentSizeInterface;
}

// Experimental styles interface
interface ComponentStylesInterface {
  backgroundColor?: string;
  borderProperties?: {
    radius: string;
    stroke: number;
  };
}

export interface FeedbackInterface {
  type: string;
  content: string;
}

export interface OptionInterface {
  answer: boolean;
  content: string;
  feedback: FeedbackInterface;
}

export type ObjectiveQuestionType = "OBJECTIVE";
export type SubjectiveQuestionType = "SUBJECTIVE";

export interface QuestionInterface {
  type: ObjectiveQuestionType | SubjectiveQuestionType;
  identifier: string;
  options?: OptionInterface[][] | OptionInterface[];
  answers?: string[][] | string[];
}



export interface ComponentBaseDataInterface {
  id?: string; // For managing canvas id
  component: string; // Component Name
  theme: string | any; // Allow theme configuration basic implementation for now
  extensions?: any[]; // Allow multiple extension types ... To be defined clearly later
  layout?: ComponentLayoutInterface; // Manage viewbox layout
  styles?: ComponentStylesInterface; // Manage optional styles for component view box or global per-component styles
  canvas?: boolean;
  questions?: QuestionInterface[]; // Handle question types on different components
}


export interface ComponentBasePropsInterface {
  slide : LessonSlideInterface;
  viewArea? : any // Refactor point
}