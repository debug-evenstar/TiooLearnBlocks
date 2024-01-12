import { ComponentBaseDataInterface } from "components/interface";


export const setObjandSubComponentData = (
  type: "OBJECTIVE" | "SUBJECTIVE",
  identifier: string = "",
  options: string[] = [],
  answers: string[] = [],
  feedbacks: string[] = []
) => {
  const data: ComponentBaseDataInterface= {
    component: "Text",
    theme: "white",
    questions: [
      {
        type,
        identifier,
        options,
        answers,
        feedbacks,
      },
    ],
  };
  return data;
};

interface DataItem {
  type: string;
  identifier: string;
  options: string[];
  answers: string[];
  feedbacks: string[];
}

export function associatedData(
  data: DataItem[],
  htmlString: string
): DataItem[] | undefined {
  const parser = new DOMParser();
  const parsedDocument = parser.parseFromString(htmlString, "text/html");

  const associatedData: DataItem[] = [];

  for (const dataItem of data) {
    const targetIdentifier = dataItem.identifier;
    const targetInput = parsedDocument.getElementById(
      targetIdentifier
    ) as HTMLDivElement;

    if (targetInput) {
      console.log(targetInput, "found input");
      associatedData.push(dataItem); // Push the entire data item
    } else {
      console.warn(
        `Input element with matching identifier ${targetIdentifier} not found.`
      );
    }
  }

  return associatedData.length > 0 ? associatedData : undefined;
}
