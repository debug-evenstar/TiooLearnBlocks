/* -------------------------------------------------------------------------- */
/*                          COMPONENT DATA INTERFACES                         */
/* -------------------------------------------------------------------------- */

import {
  ComponentLayoutInterface,
  QuestionInterface,
} from "components/interface";
import { SlideManager, SlideManagerInterface } from "./SlideManager";
import { CanvasManager, CanvasManagerInterface, CanvasStates } from "./CanvasManager";
import { SidebarManager, SidebarManagerInterface } from "./SidebarManager";
import {
  ActiveViewBoxState,
  CurrentStylesState,
  NoTextInTextBoxState,
  RightSidebarState,
  TriggerState,
} from "./StateInterface";
import { percentValue } from "utilities/maths";

export const setComponentLayout = (
  canvasProps: { width: number; height: number },
  layoutData?: ComponentLayoutInterface
) => {

  return {
    ...(layoutData?.position
      ? {
          position: {
            xAxis: {
              offset: layoutData?.position?.xAxis.offset ?? 0,
              offsetPercent: percentValue(
                layoutData?.position?.xAxis.offset ?? 0,
                canvasProps.width
              ),
            },
            yAxis: {
              offset: layoutData?.position?.yAxis.offset ?? 0,
              offsetPercent: percentValue(
                layoutData?.position?.yAxis.offset ?? 0,
                canvasProps.height
              ),
            },
          },
        }
      : {}),
    ...(layoutData?.size
      ? {
          size: {
            width: layoutData?.size?.width ?? 0,
            widthPercent: percentValue(
              layoutData?.size?.width ?? 0,
              canvasProps.width
            ),
            height: layoutData?.size?.height ?? 0,
            heightPercent: percentValue(
              layoutData?.size?.height ?? 0,
              canvasProps.height
            ),
          },
        }
      : {}),
  };
};

/* -------------------------------------------------------------------------- */
/*                    EDITORIAL & CANVAS MANAGER INTERFACES                   */
/* -------------------------------------------------------------------------- */

// Data Group is used when data and function types are not clearly defined
// It is to be replaced with the actual types and interfaces when clearly defined

export interface DataGroupInterface {
  data: { [key: string]: any };
  functions: { [key: string]: Function };
}

const DataGroup: DataGroupInterface = {
  data: {},
  functions: {},
};

interface States {
  slideComponents: any[];
  canvasStates? : CanvasStates;
  activeViewBox: ActiveViewBoxState;
  trigger: TriggerState;
  rightSidebarState: RightSidebarState;
  currentStyles: CurrentStylesState;
  noTextInViewbox: NoTextInTextBoxState;
}

export interface ManagerInterface {
  sidebarManager: SidebarManagerInterface;
  canvasManager: CanvasManagerInterface;
  slideManager: SlideManagerInterface;
  states: States;
  setState: Function;
  triggerRender: Function;
  lesson? : any;
}


declare global {
  interface Window { Manager: ManagerInterface; }
}

class Manager implements ManagerInterface {
  sidebarManager: SidebarManagerInterface;
  canvasManager: CanvasManagerInterface;
  slideManager: SlideManagerInterface;
  states: States;
  triggerRender: Function = () => {};
  lesson?: any;

  constructor(slides: any[]) {
    this.slideManager = new SlideManager(this, slides);
    this.canvasManager = new CanvasManager(this);
    this.sidebarManager = new SidebarManager(this);
    this.initCanvasManager();
    this.states = {
      slideComponents: [],
      activeViewBox: "",
      trigger: false,
      rightSidebarState: false,
      currentStyles: {
        textColor: "#000000",
        textSize: "16",
        textSpacing: `${16 * 1.2}`,
        font: "Arial",
      },
      noTextInViewbox: false,
    };
    this.states.canvasStates = {};
  }

  setState(key: string, setter: any | Function) {
    const newState: any = {};
    if (typeof setter == "function") {
      const state = this.states as { [stateKey: string]: any };
      newState[key] = setter(state[key]);
    } else {
      newState[key] = setter;
    }

    this.states = {
      ...this.states,
      ...newState,
    };
    this.triggerRender();
  }

  initCanvasManager() {
    const componentData = this.canvasManager.activeComponent.data ?? {};
    this.canvasManager.activeComponent.data = componentData;

    /* ------------------------------------------------------------------------------------------------------------------ */
    /*                                                    TO BE REMOVED                                                   */
    /* ------------------------------------------------------------------------------------------------------------------ */
    this.canvasManager.canvas.functions["addOrRemoveRowOrColumns"] = (
      parseDimensions: { rows: number; cols: number },
      type: string,
      direction: "rows" | "cols"
    ) => this.addOrRemoveRowOrColumns(parseDimensions, type, direction);

    /* ------------------------------------------------------------------------------------------------------------------ */
    /*                                                    TO BE REMOVED                                                   */
    /* ------------------------------------------------------------------------------------------------------------------ */
  }

  /* ------------------------------------------------------------------------------------------------------------------ */
  /*                                                    TO BE REMOVED                                                   */
  /* ------------------------------------------------------------------------------------------------------------------ */

  addOrRemoveRowOrColumns(
    parsedDimensions: {
      rows: number;
      cols: number;
    },
    type: string,
    direction: "rows" | "cols"
  ) {
    const gridData = this.canvasManager.activeComponent.data;
    const newDimension = parsedDimensions?.[direction];

    if (type === "add") {
      if (gridData) {
        const dimensions =
          direction === "rows"
            ? `${newDimension + 1}x${parsedDimensions.cols}`
            : `${parsedDimensions.rows}x${newDimension + 1}`;
        gridData.size = dimensions;
        //this.setState("trigger", (prev: TriggerState) => !prev);
      }
    } else {
      if (gridData) {
        const dimensions =
          direction === "rows"
            ? `${newDimension - 1}x${parsedDimensions.cols}`
            : `${parsedDimensions.rows}x${newDimension - 1}`;
        gridData.size = dimensions;
        //this.setState("trigger", (prev: TriggerState) => !prev);
      }
    }
    this.canvasManager.canvas.updateActiveComponentData(gridData);
  }

  /* ------------------------------------------------------------------------------------------------------------------ */
  /*                                                    TO BE REMOVED                                                   */
  /* ------------------------------------------------------------------------------------------------------------------ */
}


export const _getManager = () => window.Manager;

export const CreateManager = (slides: any[]) => {
  if (window.Manager) {
    return window.Manager;
  }
  window.Manager = new Manager(slides);
  return window.Manager;
}
