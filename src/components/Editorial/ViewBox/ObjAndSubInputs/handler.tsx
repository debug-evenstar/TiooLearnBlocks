import { ComponentBaseDataInterface } from "components/Editorial/Base/EditorialManager";

export const setObjandSubComponentData = (
  type: "OBJECTIVE" | "SUBJECTIVE",
  identifier: string = "",
  options: string[] = [],
  answers: string[] = [],
  feedbacks: string[] = []
) => {
  const data: ComponentBaseDataInterface = {
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

export function associateDataWithInputElement(
  data: DataItem[],
  htmlString: string
): void {
  const parser = new DOMParser();
  const parsedDocument = parser.parseFromString(htmlString, "text/html");

  const targetIdentifier = data[0].identifier; // Assuming you want to match the first data item's identifier
  const targetInput = parsedDocument.querySelector(
    `#${targetIdentifier}`
  ) as HTMLDivElement;

  if (targetInput) {
    // Associate data with the input element
    //targetInput.dataset.data = JSON.stringify(data[0]); // Store data as JSON in a data attribute
    console.log(targetInput, "found input");
  } else {
    console.error("Input element with matching identifier not found.");
  }
}
