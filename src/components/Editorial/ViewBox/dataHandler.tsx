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

export const newImageComponentData = () => {
  const data: NewComponentDataInterface = {
    component: "Image",
    url: "",
    theme: "white",
    canvas: true,
  };
  return data;
};

export const videoComponentData = () => {
  const data: NewComponentDataInterface = {
    component: "Video",
    url: "",
    theme: "white",
    canvas: true,
  };
  return data;
};

export const flashcardComponentData = () => {
  const data: NewComponentDataInterface = {
    component: "Flashcard",
    cards: [],
    theme: "white",
    canvas: true,
  };
  return data;
};

export const sliderComponentData = () => {
  const data: NewComponentDataInterface = {
    component: "Slider",
    slides: [],
    theme: "white",
    canvas: true,
  };
  return data;
};

export const gridComponentData = () => {
  const data: NewComponentDataInterface = {
    component: "GridSteps",
    start: "3x4",
    end: "1x2",
    steps: 4,
    size: "4x4",
    answers: ["1x2"],
    theme: "white",
    feedbacks: [],
  };
  return data;
};
