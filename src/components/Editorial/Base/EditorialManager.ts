/* -------------------------------------------------------------------------- */
/*                          COMPONENT DATA INTERFACES                         */
/* -------------------------------------------------------------------------- */

import { ComponentBaseDataInterface, ComponentLayoutInterface } from "components/interface";
import { EditorialSlideManager, EditorialSlideManagerInterface } from "./EditorialSlideManager";

export const setComponentLayout = (
  canvasProps: { width: number; height: number },
  layoutData?: ComponentLayoutInterface
) => {
    const percentValue = (value: number, base : number) => value/base * 100;
    return {
        ...(layoutData?.position ? {
            position : {
                xAxis : { 
                    offset : layoutData?.position?.xAxis.offset ?? 0 ,
                    offsetPercent : percentValue(layoutData?.position?.xAxis.offset ?? 0 , canvasProps.width)
                },
                yAxis : { 
                    offset : layoutData?.position?.xAxis.offset ?? 0 ,
                    offsetPercent : percentValue(layoutData?.position?.yAxis.offset ?? 0 , canvasProps.height)
                } 
            }
        }: {}),
        ...(layoutData?.size ? {
            size : {
                width : layoutData?.size?.width ?? 0,
                widthPercent : percentValue(layoutData?.size?.width ?? 0 , canvasProps.width),
                height : layoutData?.size?.height ?? 0,
                heightPercent : percentValue(layoutData?.size?.height ?? 0 , canvasProps.height)
            }
        } : {})

    }
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

export interface CanvasManagerInterface {
    canvas : DataGroupInterface;
    activeComponent : DataGroupInterface;
    activeSlide? : ComponentBaseDataInterface[];
    setActiveComponent : Function;
    updateActiveSlide : Function;
    getComponentIndex : Function;
    getComponentData : Function;

}

// More improvements coming
class CanvasManager implements CanvasManagerInterface {
    canvas : DataGroupInterface = DataGroup;
    activeComponent : DataGroupInterface = DataGroup;
    activeSlide? : ComponentBaseDataInterface[];

    // constructor(){

    // }

    setActiveComponent(id : string){
        if(this.activeSlide) {
            // Set active component index whenever the component is selected or marked active
            const componentIndexInSlide : number = this.activeSlide.findIndex((data : any) => data.id === id);
            this.activeComponent.data.index = componentIndexInSlide;
          }
    }

    updateActiveSlide(slideData : ComponentBaseDataInterface[]) {
        this.activeSlide = slideData;
    }

    getComponentIndex(id : string){
        return this.activeSlide?.findIndex((data : any) => data.id === id);
    }

    getComponentData(id : string){
        const slideComponent = this.activeSlide?.filter((component : any) => component.id === id)
        return slideComponent && slideComponent.length ? slideComponent[0] : {};
    }
}


export interface EditorialManagerInterface {
    sidebarManager : DataGroupInterface;
    canvasManager : CanvasManagerInterface;
    slideManager : EditorialSlideManagerInterface
}

class EditorialManager implements EditorialManagerInterface {

    sidebarManager: DataGroupInterface = DataGroup;
    canvasManager: CanvasManagerInterface = new CanvasManager();
    slideManager: EditorialSlideManagerInterface;

    constructor(slides : any[]) {
        this.slideManager = new EditorialSlideManager(slides);
        this.initCanvasManager();
    }


  initCanvasManager() {
    const componentData = this.canvasManager.activeComponent.data ?? {
      styleData: {}, // Store component styles
      layoutData: {}, // Store layout configuration for the active component
      coreData: {}, // Core data of the active component
    };
    this.canvasManager.activeComponent.data = componentData;
    this.canvasManager.canvas.functions["getCanvasSize"] = () =>
      this.getCanvasSize();
    this.canvasManager.canvas.functions["saveActiveComponentData"] = () =>
      this.saveActiveComponentData();
    this.canvasManager.canvas.functions["parseSlideToCanvas"] = (
      slide: any[]
    ) => this.parseSlideToCanvas(slide);
    this.canvasManager.canvas.functions["getComponentData"] = (id: string) =>
      this.getComponentData(id);
    this.canvasManager.canvas.functions["updateActiveComponentData"] = (
      data: any
    ) => this.updateActiveComponentData(data);
    this.canvasManager.canvas.functions["updateActiveComponentObjective"] = (
      data: any
    ) => this.updateActiveComponentObjective(data);
    this.canvasManager.canvas.functions["updateObjectiveData"] = (
      data: any,
      index: number
    ) => this.updateObjectiveData(data, index);
    this.canvasManager.canvas.functions["updateObjectiveOption"] = (
      data: any,
      index: number,
      optionIndex: number
    ) => this.updateObjectiveOption(data, index, optionIndex);
    this.canvasManager.canvas.functions["updateWrongOptions"] = (
      data: any,
      index: number
    ) => this.updateWrongOptions(data, index);
    setInterval(() => {
      //console.log(this.canvasManager.activeComponent.data.coreData);
    }, 5000);
  }

    updateActiveComponentData(data : any){
        if(this.canvasManager.activeComponent.data) {
            this.canvasManager.activeComponent.data.coreData = {
                ...this.canvasManager.activeComponent.data.coreData,
                ...data
            }
        }
        this.saveActiveComponentData();
    }
  updateActiveComponentObjective(data: any) {
    console.log(data, "objective called in manager");

    if (this.canvasManager.activeComponent.data.coreData) {
      this.canvasManager.activeComponent.data.coreData.questions = [
        ...this.canvasManager.activeComponent.data.coreData.questions,
        data,
      ];
    }
    this.saveActiveComponentData();
  }

  updateObjectiveData(data: any, index: number) {
    if (this.canvasManager.activeComponent.data.coreData) {
      this.canvasManager.activeComponent.data.coreData.questions[index] = {
        ...this.canvasManager.activeComponent.data.coreData.questions[index],
        ...data,
      };
    }
    this.saveActiveComponentData();
  }

  updateObjectiveOptions(data: any, index: number) {
    if (this.canvasManager.activeComponent.data.coreData) {
      this.canvasManager.activeComponent.data.coreData.questions[
        index
      ].options = [
        ...this.canvasManager.activeComponent.data.coreData.questions[index]
          .options,
        ...data,
      ];
    }
    this.saveActiveComponentData();
  }

  updateObjectiveOption(data: any, index: number, optionIndex: number) {
    if (this.canvasManager.activeComponent.data.coreData) {
      this.canvasManager.activeComponent.data.coreData.questions[index].options[
        optionIndex
      ] = data;
    }
    this.saveActiveComponentData();
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
    this.saveActiveComponentData();
  }

  getCanvasSize() {
    const canvas = document.getElementById("editorial-canvas");
    return { width: canvas?.offsetWidth, height: canvas?.offsetHeight };
  }

  getComponentData(id: string) {
    const slideComponent = this.canvasManager.canvas.data.components.filter(
      (component: any) => component.id === id
    );
    return slideComponent.length ? slideComponent[0] : {};
  }
    // Remember to set canvas data compontents here
    saveActiveComponentData(){
        const slides : any[] = this.slideManager.slides;
        const activeSlide = slides[this.slideManager.activeSlide];
        const activeComponent = this.canvasManager.activeComponent;
        if(activeComponent) {
            activeSlide[activeComponent.data.index] = {
                ...activeComponent.data.coreData,
                ...{ layout : activeComponent.data.layoutData },
                ...{ styles :activeComponent.data.styleData }
            }
            slides[this.slideManager.activeSlide] = activeSlide;
            this.slideManager.slides = slides;
            this.slideManager.handleSlidesUpdate(slides);
        }
    }

    parseSlideToCanvas(slide : any[]){
        const parsed = slide.map((item, index) => {
            const itemId = item.component + "-clone-" + Date.now() + index;
            return {
                ...item,
                id : itemId,
            }
        });
        this.canvasManager.canvas.data.components = parsed;
        this.canvasManager.activeSlide = parsed;
        return parsed;
    }
}

export const CreateEditorialManager = (slides: any[]) =>
  new EditorialManager(slides);
