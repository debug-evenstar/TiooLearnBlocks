import axios from "axios";
import { SlideData } from "components/SlideManager/handler";
import { baseApiHost } from "utilities/url";

const UPDATE_SLIDE_URL = (id : number) => `open/lesson/template/${id}`; // Can be moved later

export interface EditorialSlideManagerInterface { 
    slides : any[];
    activeSlide : number;
    saveSlide : Function;
    setActiveSlide : Function;
    handleSlidesUpdate : Function;
}


export class EditorialSlideManager implements EditorialSlideManagerInterface {
    
    slides: any[];
    activeSlide: number = 0;
    handleSlidesUpdate: Function = () => {};

    constructor(slides : any[]){
        this.slides = slides;
    }

    setActiveSlide(slide : number) {
        this.activeSlide = slide;
    }

    activeSlideData(){
        return this.slides[this.activeSlide];
    }

    saveSlide(slideId : number, payload : SlideData, callback : Function){
        const url : string = `${baseApiHost()}/${UPDATE_SLIDE_URL(slideId)}`;
        axios
          .put(url, {slide_data : payload})
          .then((res: any) => {
            if (!res.error) {
                console.log(res);
                callback();
            }
          });
    }
}
