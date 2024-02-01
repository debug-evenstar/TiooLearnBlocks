import {
  ComponentBaseDataInterface,
  FeedbackInterface,
  OptionInterface,
  QuestionInterface,
} from "components/interface";

export const setObjandSubComponentData = (
  type: "OBJECTIVE" | "SUBJECTIVE",
  identifier: string = "",
  options: OptionInterface[] = [
    {
      answer: false,
      content: "",
      feedback: {
        type: "",
        content: "",
      },
    },
  ],
  answers: string[] = []
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
      },
    ],
  };
  return data;
};

export const addObjandSubComponentData = (
  type: "OBJECTIVE" | "SUBJECTIVE",
  identifier: string = "",
  options: OptionInterface[] = [
    {
      answer: false,
      content: "",
      feedback: {
        type: "",
        content: "",
      },
    },
  ],
  answers: string[] = []
) => {
  const data: QuestionInterface = {
    type,
    identifier,
    options,
    answers,
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
      associatedData.push(dataItem); // Push the entire data item
    } else {
      console.warn(
        `Input element with matching identifier ${targetIdentifier} not found.`
      );
    }
  }

  return associatedData.length > 0 ? associatedData : undefined;
}
