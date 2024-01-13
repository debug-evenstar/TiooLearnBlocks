import {
  ComponentBaseDataInterface,
  QuestionInterface,
} from "components/interface";

export interface Card {
  url: string;
  alternatives: any[];
}

interface FlashCardComponentDataInterface extends ComponentBaseDataInterface {
  cards: [Card];
  tips?: string[];
  question?: QuestionInterface;
}

export const setFlashCardComponentData = (cards: any) => {
  const data: FlashCardComponentDataInterface = {
    component: "FlashCards",
    cards,
    theme: "white",
  };
  return data;
};

export const setFlashCardQuestionData = (cards: any) => {
  const data: FlashCardComponentDataInterface = {
    component: "FlashCards",
    cards,
    theme: "white",
  };
  return data;
};
