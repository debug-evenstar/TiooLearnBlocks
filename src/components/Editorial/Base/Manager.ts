/* -------------------------------------------------------------------------- */
/*                          COMPONENT DATA INTERFACES                         */
/* -------------------------------------------------------------------------- */

import {
  ComponentLayoutInterface,
  QuestionInterface,
} from "components/interface";
import {
  SlideManager,
  SlideManagerInterface,
} from "./SlideManager";
import {
  CanvasManager,
  CanvasManagerInterface,
} from "./CanvasManager";
import {
  SidebarManager,
  SidebarManagerInterface,
} from "./SidebarManager";
import {
  ActiveViewBoxState,
  FeedbackState,
  GridState,
  OptionsDataState,
  OverlayActiveState,
  RightSidebarState,
  ShowOptionsBoxState,
  SliderState,
  TriggerState,
} from "./StateInterface";

export const setComponentLayout = (
  canvasProps: { width: number; height: number },
  layoutData?: ComponentLayoutInterface
) => {
  const percentValue = (value: number, base: number) => (value / base) * 100;
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
  activeViewBox: ActiveViewBoxState;
  feedback: FeedbackState;
  optionsData: OptionsDataState;
  overlayActive: OverlayActiveState;
  showOptionsBox: ShowOptionsBoxState;
  slider: SliderState;
  trigger: TriggerState;
  rightSidebarState: RightSidebarState;
  grid: GridState;
}

export interface ManagerInterface {
  sidebarManager: SidebarManagerInterface;
  canvasManager: CanvasManagerInterface;
  slideManager: SlideManagerInterface;
  states: States;
  setState: Function;
  triggerRender: Function;
}

class Manager implements ManagerInterface {
  sidebarManager: SidebarManagerInterface;
  canvasManager: CanvasManagerInterface;
  slideManager: SlideManagerInterface;
  states: States;
  triggerRender: Function = () => {};

  constructor(slides: any[]) {
    this.slideManager = new SlideManager(this, slides);
    this.canvasManager = new CanvasManager(this);
    this.sidebarManager = new SidebarManager(this);
    this.initCanvasManager();
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
      rightSidebarState: false,
      grid: {
        gridIsEditable: false,
      },
    };
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
    this.canvasManager.canvas.functions["updateActiveComponentObjective"] = (
      data: any,
      type?: string,
      index?: number
    ) => this.updateActiveComponentObjective(data, type, index);
    this.canvasManager.canvas.functions["updateObjectiveData"] = (
      data: any,
      index: number,
      type?: string,
      slideIndex?: number
    ) => this.updateObjectiveData(data, index, type, slideIndex);
    this.canvasManager.canvas.functions["updateObjectiveOptions"] = (
      data: any,
      index: number,
      type?: string,
      slideIndex?: number
    ) => this.updateObjectiveOptions(data, index, type, slideIndex);
    this.canvasManager.canvas.functions["deleteObjectiveOptions"] = (
      data: any,
      index: number,
      type?: string,
      slideIndex?: number
    ) => this.deleteObjectiveOptions(data, index, type, slideIndex);
    this.canvasManager.canvas.functions["updateObjectiveOption"] = (
      data: any,
      index: number,
      optionIndex: number,
      type?: string,
      slideIndex?: number
    ) => this.updateObjectiveOption(data, index, optionIndex, type, slideIndex);
    this.canvasManager.canvas.functions["updateWrongOptions"] = (
      data: any,
      index: number
    ) => this.updateWrongOptions(data, index);
    this.canvasManager.canvas.functions["updateImageQuestions"] = (
      data: QuestionInterface,
      index: number
    ) => this.updateImageQuestions(data, index);
    this.canvasManager.canvas.functions["updateImageObjectiveOption"] = (
      data: QuestionInterface,
      index: number,
      optionIndex: number
    ) => this.updateImageObjectiveOption(data, index, optionIndex);
    this.canvasManager.canvas.functions["updateFeedbackType"] = (
      type: string,
      index: number,
      optionIndex: number,
      componentType?: string,
      slideIndex?: number
    ) =>
      this.updateFeedbackType(
        type,
        index,
        optionIndex,
        componentType,
        slideIndex
      );
    this.canvasManager.canvas.functions["updateFeedbackContent"] = (
      content: string,
      index: number,
      optionIndex: number,
      componentType?: string,
      slideIndex?: number
    ) =>
      this.updateFeedbackContent(
        content,
        index,
        optionIndex,
        componentType,
        slideIndex
      );
    this.canvasManager.canvas.functions["updateFeedbackAnswer"] = (
      answer: boolean,
      index: number,
      optionIndex: number,
      componentType?: string,
      slideIndex?: number
    ) =>
      this.updateFeedbackAnswer(
        answer,
        index,
        optionIndex,
        componentType,
        slideIndex
      );
    this.canvasManager.canvas.functions["updateFlashcardQuestion"] = (
      data: QuestionInterface,
      index: number
    ) => this.updateFlashcardQuestion(data, index);
    this.canvasManager.canvas.functions["updateImageQuestion"] = (
      data: QuestionInterface,
      type?: string,
      slideIndex?: string
    ) => this.updateImageQuestion(data, type, slideIndex);
    this.canvasManager.canvas.functions["updateSliderImageURL"] = (
      content: string,
      index: number
    ) => this.updateSliderTextContent(content, index);
    this.canvasManager.canvas.functions["updateSliderImageURL"] = (
      url: string,
      index: number
    ) => this.updateSliderImageURL(url, index);
    this.canvasManager.canvas.functions["addComponentToSlider"] = (data: any) =>
      this.addComponentToSlider(data);
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

  updateActiveComponentData(data: any, type?: string, index?: number) {
    const sliderIndex = this.canvasManager.activeComponent.data.index;

    if (type && type === "Slider") {
      if (index === null || index === undefined) return;

      if (
        this.canvasManager.activeComponent.data.components[sliderIndex].slides[
          index
        ]
      ) {
        this.canvasManager.activeComponent.data.components[sliderIndex].slides[
          index
        ][0] = {
          ...this.canvasManager.activeComponent.data.components[sliderIndex]
            .slides[index][0],
          ...data,
        };
      }
      this.canvasManager.canvas.saveActiveComponentData();
      return;
    }

    if (this.canvasManager.activeComponent.data) {
      this.canvasManager.activeComponent.data = {
        ...this.canvasManager.activeComponent.data,
        ...data,
      };
    }
    this.canvasManager.canvas.saveActiveComponentData();
  }

  updateSliderTextContent(content: string, index: number) {
    const sliderIndex = this.canvasManager.activeComponent.data.index;

    if (
      this.canvasManager.activeComponent.data.components[sliderIndex].slides[
        index
      ]
    ) {
      this.canvasManager.activeComponent.data.components[sliderIndex].slides[
        index
      ][0].content = content;
    }
    this.canvasManager.canvas.saveActiveComponentData();
  }

  updateSliderImageURL(url: string, index: number) {
    const sliderIndex = this.canvasManager.activeComponent.data.index;

    if (
      this.canvasManager.activeComponent.data.components[sliderIndex].slides[
        index
      ]
    ) {
      this.canvasManager.activeComponent.data.components[sliderIndex].slides[
        index
      ][0].url = url;
    }
    this.canvasManager.canvas.saveActiveComponentData();
  }

  updateActiveComponentObjective(data: any, type?: string, index?: number) {
    const cardsIndex = this.canvasManager.activeComponent.data.index;
    const sliderIndex = this.canvasManager.activeComponent.data.index;

    if (type && type === "Slider") {
      if (index === undefined || index === null) return;

      if (
        this.canvasManager.activeComponent.data.components[sliderIndex].slides[
          index
        ]
      ) {
        this.canvasManager.activeComponent.data.components[sliderIndex].slides[
          index
        ][0].questions = [
          ...this.canvasManager.activeComponent.data.components[sliderIndex]
            .slides[index][0].questions,
          data,
        ];
      }
      this.canvasManager.canvas.saveActiveComponentData();
      return;
    }

    if (type && type === "Flashcard" && index) {
      if (index === undefined || index === null) return;

      if (
        this.canvasManager.activeComponent.data.components[cardsIndex].cards
      ) {
        this.canvasManager.activeComponent.data.components[cardsIndex].cards[
          index
        ].question = {};
      }
      this.canvasManager.canvas.saveActiveComponentData();
      return;
    }

    if (type === "Overlay") {
      if (this.canvasManager.activeComponent.data) {
        this.canvasManager.activeComponent.data.extensions[0].question = [];
      }
      this.canvasManager.canvas.saveActiveComponentData();
      return;
    }

    if (this.canvasManager.activeComponent.data) {
      this.canvasManager.activeComponent.data.questions = data;
    }
    this.canvasManager.canvas.saveActiveComponentData();
  }

  updateObjectiveData(
    data: any,
    index: number,
    type?: string,
    slideIndex?: number
  ) {
    const cardsIndex = this.canvasManager.activeComponent.data.index;
    const sliderIndex = this.canvasManager.activeComponent.data.index;

    if (type && type === "Slider" && slideIndex) {
      if (
        this.canvasManager.activeComponent.data.components[sliderIndex].slides[
          slideIndex
        ]
      ) {
        this.canvasManager.activeComponent.data.components[sliderIndex].slides[
          slideIndex
        ][0].questions[index] = {
          ...this.canvasManager.activeComponent.data.components[sliderIndex]
            .slides[slideIndex][0].questions[index],
          ...data,
        };
      }
      this.canvasManager.canvas.saveActiveComponentData();
      return;
    }

    if (type && type === "Flashcard") {
      if (
        this.canvasManager.activeComponent.data.components[cardsIndex].cards
      ) {
        this.canvasManager.activeComponent.data.components[cardsIndex].cards[
          index
        ].question = {
          ...this.canvasManager.activeComponent.data.components[cardsIndex]
            .cards[index].question,
          ...data,
        };
      }
      this.canvasManager.canvas.saveActiveComponentData();
      return;
    }

    if (type && type === "Overlay") {
      if (this.canvasManager.activeComponent.data) {
        this.canvasManager.activeComponent.data.extensions[index].question[0] =
          {
            ...this.canvasManager.activeComponent.data.extensions[index]
              .question[0],
            ...data,
          };
      }
      this.canvasManager.canvas.saveActiveComponentData();
      return;
    }

    if (this.canvasManager.activeComponent.data) {
      this.canvasManager.activeComponent.data.questions[index] = {
        ...this.canvasManager.activeComponent.data.questions[index],
        ...data,
      };
    }
    this.canvasManager.canvas.saveActiveComponentData();
  }

  updateImageQuestion(data: any, type?: string, slideIndex?: string) {
    const sliderIndex = this.canvasManager.activeComponent.data.index;

    if (type && type === "Slider" && slideIndex) {
      if (
        this.canvasManager.activeComponent.data.components[sliderIndex].slides[
          slideIndex
        ]
      ) {
        this.canvasManager.activeComponent.data.components[sliderIndex].slides[
          slideIndex
        ][0].question = data;
      }
      this.canvasManager.canvas.saveActiveComponentData();
      return;
    }

    if (this.canvasManager.activeComponent.data) {
      this.canvasManager.activeComponent.data.question = data;
    }
  }

  updateObjectiveOptions(
    data: any,
    index: number,
    type?: string,
    slideIndex?: number
  ) {
    const cardsIndex = this.canvasManager.activeComponent.data.index;
    const sliderIndex = this.canvasManager.activeComponent.data.index;

    if (type && type === "Slider") {
      if (slideIndex === null || slideIndex === undefined) return;
      if (
        this.canvasManager.activeComponent.data.components[sliderIndex].slides[
          slideIndex
        ]
      ) {
        this.canvasManager.activeComponent.data.components[sliderIndex].slides[
          slideIndex
        ][0].questions[index].options = [
          ...this.canvasManager.activeComponent.data.components[sliderIndex]
            .slides[slideIndex][0].questions[index].options,
          data,
        ];
      }
      this.canvasManager.canvas.saveActiveComponentData();
      return;
    }

    if (type && type === "Flashcard") {
      if (
        this.canvasManager.activeComponent.data.components[cardsIndex].cards
      ) {
        this.canvasManager.activeComponent.data.components[cardsIndex].cards[
          index
        ].question.options = [
          ...this.canvasManager.activeComponent.data.components[cardsIndex]
            .cards[index].question.options,
          data,
        ];
      }
      this.canvasManager.canvas.saveActiveComponentData();
      return;
    }

    if (type && type === "Overlay") {
      if (this.canvasManager.activeComponent.data?.extensions) {
        this.canvasManager.activeComponent.data.extensions[
          index
        ].question[0].options = [
          ...this.canvasManager.activeComponent.data.extensions[index]
            .question[0].options,
          data,
        ];
      }
      this.canvasManager.canvas.saveActiveComponentData();
      return;
    }

    if (this.canvasManager.activeComponent.data) {
      this.canvasManager.activeComponent.data.questions[index].options = [
        ...this.canvasManager.activeComponent.data.questions[index].options,
        data,
      ];
    }
    this.canvasManager.canvas.saveActiveComponentData();
  }

  deleteObjectiveOptions(
    data: any,
    index: number,
    type?: string,
    slideIndex?: number
  ) {
    const cardsIndex = this.canvasManager.activeComponent.data.index;
    const sliderIndex = this.canvasManager.activeComponent.data.index;

    if (this.canvasManager.activeComponent.data) {
      this.canvasManager.activeComponent.data.questions[index].options = data;
    }

    if (type && type === "Slider") {
      if (slideIndex === null || slideIndex === undefined) return;
      if (
        this.canvasManager.activeComponent.data.components[sliderIndex].slides[
          slideIndex
        ]
      ) {
        this.canvasManager.activeComponent.data.components[sliderIndex].slides[
          slideIndex
        ][0].questions[index].options = data;
      }
      this.canvasManager.canvas.saveActiveComponentData();
      return;
    }

    if (type && type === "Flashcard") {
      if (
        this.canvasManager.activeComponent.data.components[cardsIndex].cards
      ) {
        this.canvasManager.activeComponent.data.components[cardsIndex].cards[
          index
        ].question.options = data;
      }
      this.canvasManager.canvas.saveActiveComponentData();
      return;
    }

    if (type && type === "Overlay") {
      if (this.canvasManager.activeComponent.data?.extensions) {
        this.canvasManager.activeComponent.data.extensions[
          index
        ].question[0].options = data;
      }
      this.canvasManager.canvas.saveActiveComponentData();
      return;
    }

    if (this.canvasManager.activeComponent.data) {
      this.canvasManager.activeComponent.data.questions[index].options = data;
    }
    this.canvasManager.canvas.saveActiveComponentData();
  }

  updateObjectiveOption(
    data: any,
    index: number,
    optionIndex: number,
    type?: string,
    slideIndex?: number
  ) {
    const cardsIndex = this.canvasManager.activeComponent.data.index;
    const sliderIndex = this.canvasManager.activeComponent.data.index;

    if (type && type === "Slider") {
      if (slideIndex === null || slideIndex === undefined) return;
      if (
        this.canvasManager.activeComponent.data.components[sliderIndex].slides[
          slideIndex
        ]
      ) {
        this.canvasManager.activeComponent.data.components[sliderIndex].slides[
          slideIndex
        ][0].questions[index].options[optionIndex].content = data;
      }
      this.canvasManager.canvas.saveActiveComponentData();
      return;
    }

    if (type && type === "Flashcard") {
      if (
        this.canvasManager.activeComponent.data.components[cardsIndex].cards
      ) {
        this.canvasManager.activeComponent.data.components[cardsIndex].cards[
          index
        ].question.options[optionIndex].content = data;
      }
      this.canvasManager.canvas.saveActiveComponentData();
      return;
    }

    if (type && type === "Overlay") {
      if (this.canvasManager.activeComponent.data?.extensions) {
        this.canvasManager.activeComponent.data.extensions[
          index
        ].question[0].options[optionIndex].content = data;
      }
      this.canvasManager.canvas.saveActiveComponentData();
      return;
    }
    if (this.canvasManager.activeComponent.data.questions[index]) {
      this.canvasManager.activeComponent.data.questions[index].options[
        optionIndex
      ].content = data;
    }
    this.canvasManager.canvas.saveActiveComponentData();
  }

  updateFeedbackType(
    type: any,
    index: number,
    optionIndex: number,
    componentType?: string,
    slideIndex?: number
  ) {
    const cardsIndex = this.canvasManager.activeComponent.data.index;
    const sliderIndex = this.canvasManager.activeComponent.data.index;

    if (type && type === "Slider") {
      if (slideIndex === null || slideIndex === undefined) return;
      if (
        this.canvasManager.activeComponent.data.components[sliderIndex].slides[
          slideIndex
        ]
      ) {
        this.canvasManager.activeComponent.data.components[sliderIndex].slides[
          slideIndex
        ][0].questions[index].options[optionIndex].feedback = {
          ...this.canvasManager.activeComponent.data.components[sliderIndex]
            .slides[slideIndex][0].questions[index].options[optionIndex]
            .feedback,
          type,
        };
      }
      this.canvasManager.canvas.saveActiveComponentData();
      return;
    }

    if (componentType && componentType === "Flashcard") {
      if (
        this.canvasManager.activeComponent.data.components[cardsIndex].cards
      ) {
        this.canvasManager.activeComponent.data.components[cardsIndex].cards[
          index
        ].question.options[optionIndex].feedback = {
          ...this.canvasManager.activeComponent.data.components[cardsIndex]
            .cards[index].question.options[optionIndex].feedback,
          type,
        };
      }
      this.canvasManager.canvas.saveActiveComponentData();
      return;
    }

    if (componentType === "Overlay") {
      if (this.canvasManager.activeComponent.data) {
        this.canvasManager.activeComponent.data.extensions[
          index
        ].question[0].options[optionIndex].feedback = {
          ...this.canvasManager.activeComponent.data.extensions[index]
            .question[0].options[optionIndex].feedback,
          type,
        };
      }
      this.canvasManager.canvas.saveActiveComponentData();
      return;
    }

    if (this.canvasManager.activeComponent.data) {
      this.canvasManager.activeComponent.data.questions[index].options[
        optionIndex
      ].feedback = {
        ...this.canvasManager.activeComponent.data.questions[index].options[
          optionIndex
        ].feedback,
        type,
      };
    }
    this.canvasManager.canvas.saveActiveComponentData();
  }

  updateFeedbackContent(
    content: any,
    index: number,
    optionIndex: number,
    componentType?: string,
    slideIndex?: number
  ) {
    const cardsIndex = this.canvasManager.activeComponent.data.index;
    const sliderIndex = this.canvasManager.activeComponent.data.index;

    if (componentType && componentType === "Slider") {
      if (slideIndex === null || slideIndex === undefined) return;

      if (
        this.canvasManager.activeComponent.data.components[sliderIndex].slides[
          slideIndex
        ]
      ) {
        this.canvasManager.activeComponent.data.components[sliderIndex].slides[
          slideIndex
        ][0].questions[index].options[optionIndex].feedback = {
          ...this.canvasManager.activeComponent.data.components[sliderIndex]
            .slides[slideIndex][0].questions[index].options[optionIndex]
            .feedback,
          content,
        };
      }
      this.canvasManager.canvas.saveActiveComponentData();
      return;
    }

    if (componentType && componentType === "Flashcard") {
      if (
        this.canvasManager.activeComponent.data.components[cardsIndex].cards
      ) {
        this.canvasManager.activeComponent.data.components[cardsIndex].cards[
          index
        ].question.options[optionIndex].feedback = {
          ...this.canvasManager.activeComponent.data.components[cardsIndex]
            .cards[index].question.options[optionIndex].feedback,
          content,
        };
      }
      this.canvasManager.canvas.saveActiveComponentData();
      return;
    }

    if (componentType === "Overlay") {
      if (this.canvasManager.activeComponent.data) {
        this.canvasManager.activeComponent.data.extensions[
          index
        ].question[0].options[optionIndex].feedback = {
          ...this.canvasManager.activeComponent.data.extensions[index]
            .question[0].options[optionIndex].feedback,
          content,
        };
      }
      this.canvasManager.canvas.saveActiveComponentData();
      return;
    }

    if (this.canvasManager.activeComponent.data) {
      this.canvasManager.activeComponent.data.questions[index].options[
        optionIndex
      ].feedback = {
        ...this.canvasManager.activeComponent.data.questions[index].options[
          optionIndex
        ].feedback,
        content,
      };
    }
    this.canvasManager.canvas.saveActiveComponentData();
  }

  updateFeedbackAnswer(
    answer: boolean,
    index: number,
    optionIndex: number,
    componentType?: string,
    slideIndex?: number
  ) {
    const cardsIndex = this.canvasManager.activeComponent.data.index;
    const sliderIndex = this.canvasManager.activeComponent.data.index;

    if (componentType && componentType === "Slider") {
      if (slideIndex === null || slideIndex === undefined) return;
      if (
        this.canvasManager.activeComponent.data.components[sliderIndex].slides[
          slideIndex
        ]
      ) {
        this.canvasManager.activeComponent.data.components[sliderIndex].slides[
          slideIndex
        ][0].questions[index].options[optionIndex] = {
          ...this.canvasManager.activeComponent.data.components[sliderIndex]
            .slides[slideIndex][0].questions[index].options[optionIndex],
          answer,
        };
      }
      this.canvasManager.canvas.saveActiveComponentData();
      return;
    }

    if (componentType && componentType === "Flashcard") {
      if (
        this.canvasManager.activeComponent.data.components[cardsIndex].cards
      ) {
        this.canvasManager.activeComponent.data.components[cardsIndex].cards[
          index
        ].question.options[optionIndex] = {
          ...this.canvasManager.activeComponent.data.components[cardsIndex]
            .cards[index].question.options[optionIndex],
          answer,
        };
      }
      this.canvasManager.canvas.saveActiveComponentData();
      return;
    }

    if (componentType === "Overlay") {
      if (this.canvasManager.activeComponent.data) {
        this.canvasManager.activeComponent.data.extensions[
          index
        ].question[0].options[optionIndex] = {
          ...this.canvasManager.activeComponent.data.extensions[index]
            .question[0].options[optionIndex],
          answer,
        };
      }
      this.canvasManager.canvas.saveActiveComponentData();
      return;
    }

    if (this.canvasManager.activeComponent.data) {
      this.canvasManager.activeComponent.data.questions[index].options[
        optionIndex
      ] = {
        ...this.canvasManager.activeComponent.data.questions[index].options[
          optionIndex
        ],
        answer,
      };
    }
    this.canvasManager.canvas.saveActiveComponentData();
  }

  updateWrongOptions(data: any, index: number) {
    if (this.canvasManager.activeComponent.data) {
      this.canvasManager.activeComponent.data.questions[index].options = [
        ...this.canvasManager.activeComponent.data.questions[index].options,
        ...data,
      ];
    }
    this.canvasManager.canvas.saveActiveComponentData();
  }

  updateImageQuestions(data: QuestionInterface, index: number) {
    if (this.canvasManager.activeComponent.data?.extensions) {
      this.canvasManager.activeComponent.data.extensions[index].question = [
        ...this.canvasManager.activeComponent.data.extensions[index].question,
        data,
      ];
    }
    this.canvasManager.canvas.saveActiveComponentData();
  }

  updateImageObjectiveOption(data: any, index: number, optionIndex: number) {
    if (this.canvasManager.activeComponent.data?.extensions) {
      this.canvasManager.activeComponent.data.extensions[
        index
      ].question.options[optionIndex] = data;
    }
    this.canvasManager.canvas.saveActiveComponentData();
  }

  updateFlashcardQuestions(data: QuestionInterface, index: number) {
    if (this.canvasManager.activeComponent.data?.extensions) {
      this.canvasManager.activeComponent.data.extensions[index].question = [
        ...this.canvasManager.activeComponent.data.extensions[index].question,
        data,
      ];
    }
    this.canvasManager.canvas.saveActiveComponentData();
  }

  updateFlashcardQuestion(data: QuestionInterface, index: number) {
    const cardsIndex = this.canvasManager.activeComponent.data.index;

    if (this.canvasManager.activeComponent.data?.components[cardsIndex]) {
      this.canvasManager.activeComponent.data.components[cardsIndex].cards[
        index
      ].question = data;
    }
    this.canvasManager.canvas.saveActiveComponentData();
  }

  addComponentToSlider(data: any) {
    const sliderIndex = this.canvasManager.activeComponent.data.index;
    const index: number =
      this.canvasManager.activeComponent.data.components[sliderIndex].slides
        .length;

    if (
      this.canvasManager.activeComponent.data.components[sliderIndex].slides
    ) {
      this.canvasManager.activeComponent.data.components[sliderIndex].slides[
        index
      ] = data;
    }
    this.canvasManager.canvas.saveActiveComponentData();
  }

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
        this.setState("trigger", (prev: TriggerState) => !prev);
      }
    } else {
      if (gridData) {
        const dimensions =
          direction === "rows"
            ? `${newDimension - 1}x${parsedDimensions.cols}`
            : `${parsedDimensions.rows}x${newDimension - 1}`;
        gridData.size = dimensions;
        this.setState("trigger", (prev: TriggerState) => !prev);
      }
    }
  }


  /* ------------------------------------------------------------------------------------------------------------------ */
  /*                                                    TO BE REMOVED                                                   */
  /* ------------------------------------------------------------------------------------------------------------------ */

}

export const CreateManager = (slides: any[]) =>
  new Manager(slides);
