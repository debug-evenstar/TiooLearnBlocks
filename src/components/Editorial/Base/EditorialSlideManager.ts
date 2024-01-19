import axios from "axios";
import { SlideData } from "components/SlideManager/handler";
import { baseApiHost } from "utilities/url";
import { EditorialManagerInterface } from "./EditorialManager";

const UPDATE_SLIDE_URL = (id: number) => `open/lesson/template/${id}`; // Can be moved later

export interface EditorialSlideManagerInterface {
  manager : EditorialManagerInterface;
  slides: any[];
  activeSlide: number;
  saveSlide: Function;
  setActiveSlide: Function;
  saveComponentData: Function;
  handleSlidesUpdate: Function;
}

export class EditorialSlideManager implements EditorialSlideManagerInterface {
  manager : EditorialManagerInterface;
  slides: any[];
  activeSlide: number = 0;
  handleSlidesUpdate: Function = () => {};

  constructor(manager : EditorialManagerInterface, slides: any[]) {
    this.manager = manager;
    this.slides = slides;
  }

  setActiveSlide(slide: number) {
    this.activeSlide = slide;
  }

  activeSlideData() {
    return this.slides[this.activeSlide];
  }

  saveComponentData(index: number, data: any) {
    const currentComponentData = this.slides[this.activeSlide][index];
    this.manager.canvasManager.canvas.history.push(this.slides);
    this.slides[this.activeSlide][index] = {
      ...currentComponentData,
      ...data,
    };
    this.handleSlidesUpdate(this.slides);
  }

  saveSlide(slideId: number, payload: SlideData, callback: Function) {
    const url: string = `${baseApiHost()}/${UPDATE_SLIDE_URL(slideId)}`;
    axios.put(url, { slide_data: payload }).then((res: any) => {
      if (!res.error) {
        console.log(res);
        callback();
      }
    });
  }
}
