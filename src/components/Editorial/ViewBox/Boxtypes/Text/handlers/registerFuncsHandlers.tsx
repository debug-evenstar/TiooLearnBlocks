import { ManagerInterface } from "components/Editorial/Base/Manager";
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
import { setTextComponentData } from "./dataHandler";

export const registerFunctions = (
  manager: ManagerInterface,
  getRange: () => Range | undefined,
  editableRef: React.RefObject<HTMLDivElement>,
  viewBoxRef: React.MutableRefObject<any>,
  setIdentifier: (id: string) => void,
  componentId: string
) => {
  manager.canvasManager.canvas.functions["toggleWrapper"] = (
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

  manager.canvasManager.canvas.functions["toggleWrapperStyle"] = (
    style: string = "",
    styleType: string
  ) => {
    const element: HTMLDivElement = document.getElementById(
      manager.canvasManager.activeComponent.data.id
    ) as HTMLDivElement;
    if (!element) return;
    toggleWrapperStyle(element, style, styleType);
  };

  manager.canvasManager.canvas.functions["toggleTextStyle"] = (
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

  manager.canvasManager.canvas.functions["replaceContent"] = (
    questions: any,
    type: "OBJECTIVE" | "SUBJECTIVE",
    component: string,
    isSlider?: boolean,
    slideIndex?: number
  ) => {
    const range = getRange();
    if (range && range.toString() && component === "Text") {
      const id = componentId + "-" + range?.toString() + "-" + Date.now();
      setIdentifier(id);
      if (questions.length > 0) {
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
          ),
          isSlider ? "Slider" : null,
          isSlider ? slideIndex : null
        );
      } else {
        manager.canvasManager.canvas.functions.updateActiveComponentData(
          setObjandSubComponentData(type, id, checkAndReturnOptions(type), [
            "",
          ]),
          isSlider ? "Slider" : null,
          isSlider ? slideIndex : null
        );
      }
      replaceContent(range, id);
    } else if (component === "FlashCards") {
      const id = componentId;
      setIdentifier(id);
      if (questions.length > 0) {
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

  manager.canvasManager.canvas.functions["addTooltip"] = (tip: string) => {
    const range = getRange();
    range && range.toString() && addTooltip(range, tip);
  };

  manager.canvasManager.canvas.functions["toggleList"] = (
    elementType: string
  ) => {
    const range = getRange();
    range && range.toString() && toggleList(range, elementType);
  };
  manager.canvasManager.canvas.functions["unLink"] = () => {
    const range = getRange();
    range && range.toString() && unLink(range);
  };

  if (!editableRef.current) return;
  manager.canvasManager.canvas.functions.updateActiveComponentData(
    setTextComponentData(editableRef.current.innerHTML)
  );
};
