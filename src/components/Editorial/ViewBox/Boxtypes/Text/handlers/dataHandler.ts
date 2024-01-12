import { ComponentBaseDataInterface } from "components/interface";


interface TextComponentDataInterface extends ComponentBaseDataInterface {
  content: string;
  tips?: string[];
}

export const setTextComponentData = (
  content: string = "",
  tips: string[] = []
) => {
  const data: TextComponentDataInterface = {
    component: "Text",
    content,
    tips,
    theme: "white",
    canvas : true
  };
  return data;
};
