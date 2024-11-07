import { SlideData } from "components/SlideManager/handler";
import { baseApiHost } from "utilities/url";
import { ManagerInterface } from "./Manager";
import { deepClone } from "utilities/array";

const UPDATE_SLIDE_URL = (id: number) => `open/lesson/template/${id}`; // Can be moved later
const SAVE_SLIDE_URL = (id: number) => `open/lesson/${id}/slide`;
const REORDER_SLIDE_URL = (id: number) => `open/lesson/${id}/reorder`;

export interface SlideManagerInterface {
    manager: ManagerInterface;
    slides: any[];
    activeSlide: number;
    saveSlide: Function;
    createSlide: Function;
    setActiveSlide: Function;
    saveComponentData: Function;
    handleSlidesUpdate: Function;
    updateLessonSlides: Function;
    addNewSlide: Function;
    reorderSlide: Function;
}

export class SlideManager implements SlideManagerInterface {
    manager: ManagerInterface;
    slides: any[];
    activeSlide: number = 0;
    handleSlidesUpdate: Function = () => {};
    updateLessonSlides: Function = () => {};

    constructor(manager: ManagerInterface, slides: any[]) {
        this.manager = manager;
        this.slides = slides;
    }

    setActiveSlide(slide: number) {
        this.activeSlide = slide;
    }

    activeSlideData() {
        return this.slides[this.activeSlide];
    }

    addNewSlide() {
        const modifiedSlides = [...(this.slides ?? []), []];
        this.slides = modifiedSlides;
        this.handleSlidesUpdate(modifiedSlides);
    }

    saveComponentData(
        index: number,
        data: any,
        initialization: boolean = false
    ) {
        if (!initialization) {
            const currentSlides = deepClone(this.slides);
            this.manager.canvasManager.canvas.history.push(currentSlides);
        }

        const currentComponentData = this.slides[this.activeSlide][index];
        this.slides[this.activeSlide][index] = {
            ...(currentComponentData ?? {}),
            ...data,
        };
        this.handleSlidesUpdate(this.slides);
    }

    async saveSlide(slideId: number, payload: SlideData, callback: Function) {
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
                    callback();
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                callback && callback();
                return response.json();
            })
            .then((data) => {})
            .catch((error) => {
                console.error("Update failed:", error);
            });
    }

    createSlide(
        index: number,
        lessonId: number,
        payload: SlideData,
        callback: Function
    ) {
        const url: string = `${baseApiHost()}/${SAVE_SLIDE_URL(lessonId)}`;
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                slide_data: payload,
                slide_index: index,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                response.json().then((json) => {
                    this.updateLessonSlides((previousSlides: any[]) => {
                        const updated = previousSlides;
                        updated[index] = {
                            id: json.data.id,
                            slide_data: payload,
                            slide_index: index,
                        };
                        return updated;
                    });
                    callback && callback(json.data);
                });

                //Add a function to update the lessonSlides object with the created slide id
            })
            .then((data) => {})
            .catch((error) => {
                callback();
                console.error("Update failed:", error);
            });
    }

    async reorderSlide(
        slideIndex: number,
        direction: number,
        callback: Function
    ) {
        const initialSlides = this.manager?.lesson?.lesson_slides;
        let slideId;
        if (initialSlides && this.slides) {
            const slideExists = initialSlides.length > slideIndex;
            if (!slideExists) {
                slideId = await new Promise((resolve) => {
                    this.createSlide(
                        slideIndex,
                        this.manager.lesson.id,
                        this.slides[slideIndex],
                        (data: any) => {
                            resolve(data.id);
                        }
                    );
                });
            } else {
                slideId = initialSlides[slideIndex].id;
            }
        }
        // const url: string = `${baseApiHost()}/${REORDER_SLIDE_URL(slideId)}`;
        // return fetch(url, {
        //     method: "POST",
        // })
        //     .then(async (response) => {
        //         if (!response.ok) {
        //             callback();
        //             throw new Error(`HTTP error! status: ${response.status}`);
        //         }
        //         const lessonSlides = await response.json();
        //         callback && callback(lessonSlides.data);
        //         this.updateLessonSlides(() => lessonSlides.data);
        //         return lessonSlides;
        //     })
        //     .then((data) => {})
        //     .catch((error) => {
        //         console.error("Update failed:", error);
        //     });
    }
}
