import { EditorialManagerInterface } from "components/Editorial/Base/EditorialManager";
import { toggleWrapperStyle } from "./stylesHandler";
import {
  addTooltip,
  replaceContent,
  toggleList,
  toggleWrapper,
  unLink,
} from "./wrapperHandler";
import {
  addObjandSubComponentData,
  setObjandSubComponentData,
} from "components/Editorial/ViewBox/ObjAndSubInputs/handler";
import { checkAndReturnOptions } from "./generalHandler";

export const registerFunctions = (
  manager: EditorialManagerInterface,
  getRange: () => Range | undefined,
  viewBoxRef: React.MutableRefObject<any>,
  setIdentifier: (id: string) => void,
  componentId: string
) => {
  manager.canvasManager.activeComponent.functions["toggleWrapper"] = (
    elementType: string,
    style: string = "",
    styleType: string = "",
    link: string = ""
  ) => {
    const range = getRange();
    if (range && range.toString()) {
      toggleWrapper(range, elementType, style, styleType, link);
    }
    const element: HTMLDivElement = document.getElementById(
      manager.canvasManager.activeComponent.data.id
    ) as HTMLDivElement;
    if (styleType !== "position") return;
    if (!element) return;
    toggleWrapperStyle(element, style, styleType);
  };

  manager.canvasManager.activeComponent.functions["toggleWrapperStyle"] = (
    style: string = "",
    styleType: string
  ) => {
    const element: HTMLDivElement = document.getElementById(
      manager.canvasManager.activeComponent.data.id
    ) as HTMLDivElement;
    if (!element) return;
    toggleWrapperStyle(element, style, styleType);
  };

  manager.canvasManager.activeComponent.functions["toggleTextStyle"] = (
    style: string = "",
    styleType: string
  ) => {
    const range = getRange();

    if (range && range.toString() && range.startOffset !== range.endOffset) {
      toggleWrapper(range, "span", style, styleType, "");
      return;
    }

    const element = viewBoxRef.current;
    if (!element) return;
    toggleWrapperStyle(element, style, styleType);
  };

  manager.canvasManager.activeComponent.functions["replaceContent"] = (
    questions: any,
    type: "OBJECTIVE" | "SUBJECTIVE",
    component: string
  ) => {
    const range = getRange();
    if (range && range.toString() && component === "Text") {
      console.log(questions.length, "data core");
      const id = componentId + "-" + range?.toString() + "-" + Date.now();
      setIdentifier(id);
      if (questions.length > 0) {
        console.log("called add");
        manager.canvasManager.canvas.functions.updateActiveComponentObjective(
          addObjandSubComponentData(
            type,
            id,
            [
              {
                answer: false,
                content: "",
                feedback: {
                  type: "",
                  content: "",
                },
              },
              {
                answer: false,
                content: "",
                feedback: {
                  type: "",
                  content: "",
                },
              },
            ],
            [""]
          )
        );
      } else {
        console.log("called set");
        manager.canvasManager.canvas.functions.updateActiveComponentData(
          setObjandSubComponentData(type, id, checkAndReturnOptions(type), [""])
        );
      }
      replaceContent(range, id);
    } else if (component === "FlashCards") {
      const id = componentId;
      setIdentifier(id);
      if (questions.length > 0) {
        console.log("called add");
        manager.canvasManager.canvas.functions.updateActiveComponentObjective(
          addObjandSubComponentData(
            type,
            id,
            [
              {
                answer: false,
                content: "",
                feedback: {
                  type: "",
                  content: "",
                },
              },
              {
                answer: false,
                content: "",
                feedback: {
                  type: "",
                  content: "",
                },
              },
            ],
            [""]
          )
        );
      } else {
        console.log("called set");
        manager.canvasManager.canvas.functions.updateActiveComponentData(
          setObjandSubComponentData(
            type,
            id,
            [
              {
                answer: false,
                content: "",
                feedback: {
                  type: "",
                  content: "",
                },
              },
              {
                answer: false,
                content: "",
                feedback: {
                  type: "",
                  content: "",
                },
              },
            ],
            [""]
          )
        );
      }
    }
  };

  manager.canvasManager.activeComponent.functions["addTooltip"] = (
    tip: string
  ) => {
    const range = getRange();
    range && range.toString() && addTooltip(range, tip);
  };

  manager.canvasManager.activeComponent.functions["toggleList"] = (
    elementType: string
  ) => {
    const range = getRange();
    range && range.toString() && toggleList(range, elementType);
  };
  manager.canvasManager.activeComponent.functions["unLink"] = () => {
    const range = getRange();
    range && range.toString() && unLink(range);
  };
};
