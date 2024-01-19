/* -------------------------------------------------------------------------- */
/*                          COMPONENT DATA INTERFACES                         */
/* -------------------------------------------------------------------------- */

import {
  ComponentBaseDataInterface,
  ComponentLayoutInterface,
  QuestionInterface,
} from "components/interface";
import {
  EditorialSlideManager,
  EditorialSlideManagerInterface,
} from "./EditorialSlideManager";
import { CanvasManager, CanvasManagerInterface } from "./EditorialCanvasManager";

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


export interface EditorialManagerInterface {
  sidebarManager: DataGroupInterface;
  canvasManager: CanvasManagerInterface;
  slideManager: EditorialSlideManagerInterface;
}

class EditorialManager implements EditorialManagerInterface {
  sidebarManager: DataGroupInterface = DataGroup;
  canvasManager: CanvasManagerInterface;
  slideManager: EditorialSlideManagerInterface;

  constructor(slides: any[]) {
    this.slideManager = new EditorialSlideManager(this, slides);
    this.canvasManager = new CanvasManager(this);
    this.initCanvasManager();
  }

  initCanvasManager() {
    const componentData = this.canvasManager.activeComponent.data ?? {
      styleData: {}, // Store component styles
      layoutData: {}, // Store layout configuration for the active component
      coreData: {}, // Core data of the active component
    };
    this.canvasManager.activeComponent.data = componentData;
    this.canvasManager.canvas.functions["updateActiveComponentObjective"] = (
      data: any
    ) => this.updateActiveComponentObjective(data);
    this.canvasManager.canvas.functions["updateObjectiveData"] = (
      data: any,
      index: number
    ) => this.updateObjectiveData(data, index);
    this.canvasManager.canvas.functions["updateObjectiveOptions"] = (
      data: any,
      index: number
    ) => this.updateObjectiveOptions(data, index);
    this.canvasManager.canvas.functions["deleteObjectiveOptions"] = (
      data: any,
      index: number
    ) => this.deleteObjectiveOptions(data, index);
    this.canvasManager.canvas.functions["updateObjectiveOption"] = (
      data: any,
      index: number,
      optionIndex: number
    ) => this.updateObjectiveOption(data, index, optionIndex);
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
      optionIndex: number
    ) => this.updateFeedbackType(type, index, optionIndex);
    this.canvasManager.canvas.functions["updateFeedbackContent"] = (
      content: string,
      index: number,
      optionIndex: number
    ) => this.updateFeedbackContent(content, index, optionIndex);
    this.canvasManager.canvas.functions["updateFeedbackAnswer"] = (
      answer: boolean,
      index: number,
      optionIndex: number
    ) => this.updateFeedbackAnswer(answer, index, optionIndex);
    this.canvasManager.canvas.functions["updateFlashcardQuestion"] = (
      data: QuestionInterface,
      index: number
    ) => this.updateFlashcardQuestion(data, index);
    setInterval(() => {
      //console.log(this.canvasManager.activeComponent.data.coreData);
    }, 5000);
  }

  updateActiveComponentObjective(data: any) {
    console.log(data);
    if (this.canvasManager.activeComponent.data.coreData) {
      this.canvasManager.activeComponent.data.coreData.questions = [
        ...this.canvasManager.activeComponent.data.coreData.questions,
        data,
      ];
    }
    this.canvasManager.canvas.saveActiveComponentData();
  }

  updateObjectiveData(data: any, index: number) {
    if (this.canvasManager.activeComponent.data.coreData) {
      this.canvasManager.activeComponent.data.coreData.questions[index] = {
        ...this.canvasManager.activeComponent.data.coreData.questions[index],
        ...data,
      };
    }
    this.canvasManager.canvas.saveActiveComponentData();
  }

  updateObjectiveOptions(data: any, index: number) {
    if (this.canvasManager.activeComponent.data.coreData) {
      this.canvasManager.activeComponent.data.coreData.questions[
        index
      ].options = [
        ...this.canvasManager.activeComponent.data.coreData.questions[index]
          .options,
        data,
      ];
    }
    this.canvasManager.canvas.saveActiveComponentData();
  }

  deleteObjectiveOptions(data: any, index: number) {
    if (this.canvasManager.activeComponent.data.coreData) {
      this.canvasManager.activeComponent.data.coreData.questions[
        index
      ].options = data;
    }
    this.canvasManager.canvas.saveActiveComponentData();
  }

  updateObjectiveOption(data: any, index: number, optionIndex: number) {
    if (this.canvasManager.activeComponent.data.coreData.questions[index]) {
      this.canvasManager.activeComponent.data.coreData.questions[index].options[
        optionIndex
      ].content = data;
    }
    this.canvasManager.canvas.saveActiveComponentData();
  }

  updateFeedbackType(type: any, index: number, optionIndex: number) {
    if (this.canvasManager.activeComponent.data.coreData) {
      this.canvasManager.activeComponent.data.coreData.questions[index].options[
        optionIndex
      ].feedback = {
        ...this.canvasManager.activeComponent.data.coreData.questions[index]
          .options[optionIndex].feedback,
        type,
      };
    }
    this.canvasManager.canvas.saveActiveComponentData();
  }

  updateFeedbackContent(content: any, index: number, optionIndex: number) {
    if (this.canvasManager.activeComponent.data.coreData) {
      this.canvasManager.activeComponent.data.coreData.questions[index].options[
        optionIndex
      ].feedback = {
        ...this.canvasManager.activeComponent.data.coreData.questions[index]
          .options[optionIndex].feedback,
        content,
      };
    }
    this.canvasManager.canvas.saveActiveComponentData();
  }

  updateFeedbackAnswer(answer: boolean, index: number, optionIndex: number) {
    if (this.canvasManager.activeComponent.data.coreData) {
      this.canvasManager.activeComponent.data.coreData.questions[index].options[
        optionIndex
      ] = {
        ...this.canvasManager.activeComponent.data.coreData.questions[index]
          .options[optionIndex],
        answer,
      };
    }
    this.canvasManager.canvas.saveActiveComponentData();
  }

  updateWrongOptions(data: any, index: number) {
    if (this.canvasManager.activeComponent.data.coreData) {
      this.canvasManager.activeComponent.data.coreData.questions[
        index
      ].options = [
        ...this.canvasManager.activeComponent.data.coreData.questions[index]
          .options,
        ...data,
      ];
    }
    this.canvasManager.canvas.saveActiveComponentData();
  }

  updateImageQuestions(data: QuestionInterface, index: number) {
    if (this.canvasManager.activeComponent.data.coreData?.extensions) {
      this.canvasManager.activeComponent.data.coreData.extensions[
        index
      ].question = [
        ...this.canvasManager.activeComponent.data.coreData.extensions[index]
          .question,
        data,
      ];
    }
    this.canvasManager.canvas.saveActiveComponentData();
  }

  updateImageObjectiveOption(data: any, index: number, optionIndex: number) {
    if (this.canvasManager.activeComponent.data.coreData?.extensions) {
      this.canvasManager.activeComponent.data.coreData.extensions[
        index
      ].question.options[optionIndex] = data;
    }
    this.canvasManager.canvas.saveActiveComponentData();
  }

  updateFlashcardQuestion(data: QuestionInterface, index: number) {
    console.log(this.canvasManager.activeComponent.data, "IN EM");
    if (this.canvasManager.activeComponent.data.coreData) {
      this.canvasManager.activeComponent.data.coreData.cards[index].question = [
        ...this.canvasManager.activeComponent.data.coreData.question,
        data,
      ];
    }
    this.canvasManager.canvas.saveActiveComponentData();
  }

}

export const CreateEditorialManager = (slides: any[]) =>
  new EditorialManager(slides);
