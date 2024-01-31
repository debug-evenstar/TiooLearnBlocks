import { ComponentBaseDataInterface } from "components/interface";
import {
  DataGroupInterface,
  EditorialManagerInterface,
} from "./EditorialManager";

const DataGroup: DataGroupInterface = {
  data: {},
  functions: {},
};

/* -------------------------------------------------------------------------- */
/*                            MAIN CANVAS INTERFACE                           */
/* -------------------------------------------------------------------------- */

interface States {
  activeViewBox: string;
  feedback: {
    optionIndex: number;
    status: boolean;
    type: "OBJECTIVE" | "SUBJECTIVE";
  };
  optionsData: {
    identifier: string;
    correctOption: string;
    wrongOption: string;
    objectiveIndex: number;
  };
  overlayActive: boolean;
  showOptionsBox: boolean;
  slider: {
    activeCompName: string;
    activeCompIndex: number;
  };
  trigger: boolean;
}

interface CanvasInterface {
  manager: CanvasManagerInterface;
  setActiveViewboxState: Function;
  toggleOverlayActiveState: Function;
  toggleShowOptionsBoxState: Function;
  toggleTriggerState: Function;
  refreshFeedbackState: Function;
  refreshOptionsDataState: Function;
  setIdentifierState: Function;
  refreshSliderState: Function;
  setFeedbackIndexState: Function;
  setFeedbackStatusState: Function;
  setFeedbackTypeState: Function;
  setCorrectOptionState: Function;
  setWrongOptionState: Function;
  setObjectiveIndexState: Function;
  setActiveCompNameState: Function;
  setActiveCompIndexState: Function;
  components: ComponentBaseDataInterface[];
  getCanvasSize: Function;
  getComponentData: Function;
  parseSlideToCanvas: Function;
  updateActiveComponentData: Function;
  saveActiveComponentData: Function;
  history: ComponentBaseDataInterface[][];
  data: { [key: string]: any }; // For backward compatibility
  functions: { [key: string]: Function }; // For backward compatibility
}

class Canvas implements CanvasInterface {
  manager: CanvasManagerInterface;
  states: States;
  components: ComponentBaseDataInterface[] = [];
  history: ComponentBaseDataInterface[][] = [];
  data: { [key: string]: any } = {};
  functions: { [key: string]: Function } = {};

  constructor(manager: CanvasManagerInterface) {
    this.manager = manager;
    this.states = {
      activeViewBox: "",
      feedback: {
        optionIndex: 0,
        status: false,
        type: "OBJECTIVE",
      },
      optionsData: {
        identifier: "",
        correctOption: "",
        wrongOption: "",
        objectiveIndex: 0,
      },
      overlayActive: false,
      showOptionsBox: false,
      slider: {
        activeCompName: "",
        activeCompIndex: 0,
      },
      trigger: false,
    };
    // Set functions
    this.setFunctions();
    this.setData();
  }


  setActiveViewboxState(id: string) {
    this.states.activeViewBox = id;
  }

  toggleOverlayActiveState() {
    this.states.overlayActive = !this.states.overlayActive;
  }

  toggleShowOptionsBoxState() {
    this.states.showOptionsBox = !this.states.showOptionsBox;
  }

  toggleTriggerState() {
    this.states.trigger = !this.states.trigger;
  }

  refreshFeedbackState() {
    this.states.feedback = {
      optionIndex: 0,
      status: false,
      type: "OBJECTIVE",
    };
  }

  setFeedbackIndexState(index: number) {
    this.states.feedback.optionIndex = index;
  }

  setFeedbackStatusState(status: boolean) {
    this.states.feedback.status = status;
  }

  setFeedbackTypeState(type: "OBJECTIVE" | "SUBJECTIVE") {
    this.states.feedback.type = type;
  }

  refreshOptionsDataState() {
    this.states.optionsData = {
      identifier: "",
      correctOption: "",
      wrongOption: "",
      objectiveIndex: 0,
    };
  }
  setIdentifierState(identifier: string) {
    this.states.optionsData.identifier = identifier;
  }
  setCorrectOptionState(option: string) {
    this.states.optionsData.correctOption = option;
  }
  setWrongOptionState(option: string) {
    this.states.optionsData.wrongOption = option;
  }
  setObjectiveIndexState(index: number) {
    this.states.optionsData.objectiveIndex = index;
  }

  refreshSliderState() {
    this.states.slider = {
      activeCompName: "",
      activeCompIndex: 0,
    };
  }
  setActiveCompNameState(name: string) {
    this.states.slider.activeCompName = name;
  }
  setActiveCompIndexState(index: number) {
    this.states.slider.activeCompIndex = index;
  }

  setData() {
    this.data.components = this.components;
  }

  setFunctions() {
    const object: any = this;
    const functions = [
      ...Object.getOwnPropertyNames(Object.getPrototypeOf(object)),
    ];
    const methods = functions.sort().filter((e, i, arr) => {
      if (e !== arr[i + 1] && typeof object[e] == "function") return true;
    });
    methods.forEach((methodName: string, index: number) => {
      if (methodName !== "constructor") {
        object.functions[methodName] = (...args: any) => {
          return object[methodName](...args);
        };
      }
    });
  }

  getCanvasSize() {
    const canvas = document.getElementById("editorial-canvas");
    return { width: canvas?.offsetWidth, height: canvas?.offsetHeight };
  }

  getComponentData(id: string) {
    const slideComponent = this.components?.filter(
      (component: any) => component.id === id
    );
    return slideComponent.length ? slideComponent[0] : {};
  }

  parseSlideToCanvas(slide: any[]) {
    const parsed = slide.map((item, index) => {
      const itemId = item.component + "-clone-" + Date.now() + index;
      return {
        ...item,
        id: itemId,
      };
    });
    this.components = parsed;
    this.manager.activeSlide = parsed;
    return parsed;
  }

  updateActiveComponentData(data: any) {
    console.log(data, "in canvas manager");
    if (this.manager.activeComponent.data) {
      this.manager.activeComponent.data = {
        ...this.manager.activeComponent.data,
        ...data,
      };
    }
    // Set history
    // this.history.push(this.manager.manager.slideManager.slides);
    this.saveActiveComponentData();
  }

  // Remember to set canvas data compontents here
  saveActiveComponentData() {
    const slides: any[] = this.manager.manager.slideManager.slides;
    const activeSlide = slides[this.manager.manager.slideManager.activeSlide];
    const activeComponent = this.manager.activeComponent;
    if (activeComponent) {
      activeSlide[activeComponent.data.index] = {
        ...activeSlide[activeComponent.data.index],
        ...activeComponent.data,
        ...{ layout: activeComponent.data.layoutData },
        ...{ styles: activeComponent.data.styleData },
      };
      slides[this.manager.manager.slideManager.activeSlide] = activeSlide;
      this.manager.manager.slideManager.slides = slides;
      this.manager.manager.slideManager.handleSlidesUpdate(slides);
    }
  }
}

/* -------------------------------------------------------------------------- */
/*                          CANVAS MANAGER INTERFACE                          */
/* -------------------------------------------------------------------------- */

export interface CanvasManagerInterface {
  manager: EditorialManagerInterface;
  canvas: CanvasInterface;
  activeComponent: DataGroupInterface;
  activeSlide?: ComponentBaseDataInterface[];
  setActiveComponent: Function;
  updateActiveSlide: Function;
  getComponentIndex: Function;
  getComponentData: Function;
  activeComponentElement: Function;
}

// More improvements coming
export class CanvasManager implements CanvasManagerInterface {
  manager: EditorialManagerInterface;
  canvas: CanvasInterface;
  activeComponent: DataGroupInterface = DataGroup;
  activeSlide?: ComponentBaseDataInterface[];

  constructor(manager: EditorialManagerInterface) {
    this.manager = manager;
    this.canvas = new Canvas(this);
  }

  setActiveComponent(id: string) {
    if (this.activeSlide) {
      // Set active component index whenever the component is selected or marked active
      const componentIndexInSlide: number = this.activeSlide.findIndex(
        (data: any) => data.id === id
      );
      this.activeComponent.data.index = componentIndexInSlide;
    }
  }

  updateActiveSlide(slideData: ComponentBaseDataInterface[]) {
    this.activeSlide = slideData;
  }

  getComponentIndex(id: string) {
    return this.activeSlide?.findIndex((data: any) => data.id === id);
  }

  getComponentData(id: string) {
    const slideComponent = this.activeSlide?.filter(
      (component: any) => component.id === id
    );
    return slideComponent && slideComponent.length ? slideComponent[0] : {};
  }

  activeComponentElement() {
    if (this.activeSlide) {
      const activeComponent = this.activeSlide[this.activeComponent.data.index];
      if (activeComponent.id) {
        return document.getElementById(activeComponent.id) as HTMLDivElement;
      }
    }
  }
}
