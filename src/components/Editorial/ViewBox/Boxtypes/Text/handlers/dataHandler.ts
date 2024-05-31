import { ComponentBaseDataInterface } from "components/interface";


interface TextComponentDataInterface extends ComponentBaseDataInterface {
  content: string;
  tips?: string[];
}

export const textComponentData = (
  content: string = "",
  tips: string[] = []
) => {
  content = wrapTextData(content);
  const data: TextComponentDataInterface = {
    component: "Text",
    content,
    tips,
    theme: "white",
    canvas : true
  };
  return data;
};


export const wrapTextData = (
  content : string
) => {
  if (content[0] != "<") {
    return `<span class='main outline-none'>${content}</span>`;
  }
  return content;
}