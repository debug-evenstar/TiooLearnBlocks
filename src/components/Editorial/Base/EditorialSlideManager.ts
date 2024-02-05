import { SlideData } from "components/SlideManager/handler";
import { baseApiHost } from "utilities/url";
import { EditorialManagerInterface } from "./EditorialManager";
import { deepClone } from "utilities/array";

const UPDATE_SLIDE_URL = (id: number) => `open/lesson/template/${id}`; // Can be moved later

export interface EditorialSlideManagerInterface {
  manager: EditorialManagerInterface;
  slides: any[];
  activeSlide: number;
  saveSlide: Function;
  setActiveSlide: Function;
  saveComponentData: Function;
  handleSlidesUpdate: Function;
}

export class EditorialSlideManager implements EditorialSlideManagerInterface {
  manager: EditorialManagerInterface;
  slides: any[];
  activeSlide: number = 0;
  handleSlidesUpdate: Function = () => {};

  constructor(manager: EditorialManagerInterface, slides: any[]) {
    this.manager = manager;
    this.slides = slides;
  }

  setActiveSlide(slide: number) {
    this.activeSlide = slide;
  }

  activeSlideData() {
    return this.slides[this.activeSlide];
  }

  saveComponentData(index: number, data: any, initialization: boolean = false) {
    if (!initialization) {
      const currentSlides = deepClone(this.slides);
      this.manager.canvasManager.canvas.history.push(currentSlides);
    }
    const currentComponentData = this.slides[this.activeSlide][index];
    this.slides[this.activeSlide][index] = {
      ...currentComponentData,
      ...data,
    };
    this.handleSlidesUpdate(this.slides);
  }

  saveSlide(slideId: number, payload: SlideData, callback: Function) {
    const url: string = `${baseApiHost()}/${UPDATE_SLIDE_URL(slideId)}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ slide_data: payload }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {})
      .catch((error) => {
        console.error("Update failed:", error);
      });
  }
}
