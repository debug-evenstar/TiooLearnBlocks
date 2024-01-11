import { ComponentBaseDataInterface } from "components/Editorial/Base/EditorialManager";

interface Card {
  url: string;
  alternatives: any[];
}

interface FlashCardComponentDataInterface extends ComponentBaseDataInterface {
  cards: [Card];
  tips?: string[];
}

export const setFlashCardComponentData = (cards: [Card]) => {
  const data: FlashCardComponentDataInterface = {
    component: "FlashCards",
    cards,
    theme: "white",
  };
  return data;
};
