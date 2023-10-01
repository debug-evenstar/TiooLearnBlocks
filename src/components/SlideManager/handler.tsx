import GridSteps from "components/GridSteps";
import ButtonGroupComponent from "../ButtonGroup";
import FlashCardsComponent from "../FlashCards";
import ImageComponent from "../Image";
import OptionsComponent from "../Options";
import SliderComponent from "../Slider";
import TextComponent from "../Text"
import VideoComponent from "../Video";
import WordMatchComponent from "../WordMatch";
import { GlobalEventStorage, SlideEvents } from "./events";
import { simulateWidth } from "components/extensions/TextFields";

declare global {
    interface Window {
      SlideEventListener: any;
    }
}

export interface LessonSlideInterface {
    options? : any[];
    answers? : any[];
    feedbacks? : any[];
    status? : boolean;
    complete? : boolean;
    parent : any;
    textFields? : any[];
    setAnswers : Function;
    setOptions : Function;
    setFeedbacks : Function;
    setStatus: Function;
    addFields : Function;
    selectAnswer : Function;
    setFunction : Function;
    triggerFeedback : Function;
    updateProgress : Function;
    functions? : {[key : string] : Function};
    attributes : {[key : string] : any};
    progress : number;
    video : any;
    setVideo : Function;
    resetData : Function;
    on : Function;
    dispatch : Function;
    fillWithHint : Function;
    verifySubjectiveAnswer : Function;
    registerSlideData : Function;
    checkSlideCanProceed : Function;
}

class LessonSlide implements LessonSlideInterface{

    options? : any[];
    answers? : string[];
    feedbacks? : any[];
    status? : boolean;
    complete? : boolean;
    textFields? : any[];
    functions? : {[key : string] : Function};
    attributes: { [key: string]: any; } = {};
    progress : number = 0;
    video : any = null;
    answered : any[] = [];
    SUCCESS_FEEDBACK : string = "success";
    FAILURE_FEEDBACK : string = "failure";
    eventsStorage : any = GlobalEventStorage
    parent: any;

    constructor(parent : any = null){
        this.parent = parent;
    }

    setOptions(options : string[]) {
        this.options =  options;
    }

    setAnswers(answers : string[]) {
        this.answers = answers;
    }

    setFeedbacks(feedbacks : any[]) {
        this.feedbacks = feedbacks;
    }

    setStatus( status : boolean) {
        this.status = status;
    }

    setVideo( video : any) {
        this.video = video;
    }

    addFields( textFieldInstance : any ) {
        if( this.textFields ) {
            this.textFields.push(textFieldInstance);
        }else{
            this.textFields = [ textFieldInstance ]
        }
    }

    fillWithHint() {
        if( this.answers && this.textFields && this.progress < this.answers.length){
            let answer : any = this.answers[this.progress];
            // Check if text exists in field
            const field = this.textFields[this.progress];
            const fieldElement = document.getElementById(field.id) as HTMLInputElement;
            const fieldValue = fieldElement.value;
            const matchingAnswer = () => answer.filter((a : any) => a.includes(fieldValue));
            answer = typeof answer !== "string" 
                ? fieldValue === "" || !matchingAnswer().length ? answer[0] : matchingAnswer()[0]
                : answer;
            if( answer.substr(0,fieldValue.length) === fieldValue) {
                const hint = answer.substr(fieldValue.length, 1);
                fieldElement.value += hint;
            }else{
                const hint = answer.substr(0, 1);
                fieldElement.value = hint;
            }
            // Added to expand input width on add text
            const width = simulateWidth(answer);
            const setWidth = (fieldElement.value.length/answer.length * width) + 30;
            fieldElement.style.width = `${setWidth}px`;

            formatTextColor(fieldElement, true);
            if( fieldElement.value === answer) {
                this.verifySubjectiveAnswer( field.index , fieldElement.value, answer);
            }
        }
    }

    verifySubjectiveAnswer( index : number, input: string , answer : string|string[]){
        if( typeof answer == "string" && input.toLowerCase() === answer.toLowerCase()){
            this.functions?.selectAnswer(index, answer);
            this.updateProgress();
            //Focus on next TextField
            this.activateNextField();
            this.callComponentFunctions(answer);
        }else if( typeof answer == "object"){
            answer.forEach(ans => {
                if (ans.toLowerCase() === input.toLowerCase()){
                    this.functions?.selectAnswer(index, ans);
                    this.updateProgress();
                    //Focus on next TextField
                    this.activateNextField();
                    this.callComponentFunctions(ans);
                }
            });
        }
    }

    activateNextField(){
        if( this.textFields && this.progress < this.textFields.length ){
            const nextField = this.textFields[this.progress];
            const element = document.getElementById(nextField.id);
            setTimeout(()=>{
                element?.focus();
            },200);
        }
    }

    selectAnswer( index : number, value : string, callback : Function) {
        if( this.options && this.options.length ) {
            this.selectOptionAnswer(index, value, callback);
            return;
        }
        if ( this.answers && !this.answered.includes(value)) {
            if( /*index > this.progress  ||*/ this.answers[index] !== value ) {
                this.triggerFeedback(this.FAILURE_FEEDBACK, index);
            } else {
                this.functions?.selectAnswer( this.progress, value );
                this.answered.push(value);
                this.triggerFeedback(this.SUCCESS_FEEDBACK, index);
                this.progress++;
                if(this.progress === this.answers.length) {
                    this.complete = true;
                    this.functions?.allowProceed();
                    //Move slider component (if present)
                    if(this.functions?.moveSlide){
                        this.functions?.moveSlide(1);
                    }
                }
            }

        }
    }

    selectOptionAnswer( index : number, value : string, callback : Function ) {
        if( this.answers && this.progress < this.answers.length ) {
            const answer = this.answers[this.progress];
            if( answer === value ) {
                this.triggerFeedback(this.SUCCESS_FEEDBACK);
                this.progress++;
                if(this.progress === this.answers.length) {
                    this.complete = true;
                    this.functions?.allowProceed();
                }
                // Select text field answer (if present)
                if( this.functions?.selectAnswer ) {
                    this.functions?.selectAnswer( 0, value );
                }
                callback(true);
                setTimeout(()=>{
                    this.callComponentFunctions(value);
                },600);
            }else{
                this.triggerFeedback(this.FAILURE_FEEDBACK);
                callback(false);
            }
        }
    }

    updateProgress(){
        if(this.answers) {
            this.progress++;
            if(this.progress === this.answers.length) {
                this.complete = true;
                this.functions?.allowProceed();
                this.functions?.setHint(false)
            }
            this.dispatch(SlideEvents.PROGRESS_UPDATE);
        }
    }

    callComponentFunctions( value : string) {
        //Move slider component (if present)
        if(this.functions?.moveSlide){
            this.functions?.moveSlide(1);
        }
        //Move flash card (if present)
        if(this.functions?.removeCard){
            this.functions?.removeCard();
        }
    }

    setFunction(functionName : string , handler : Function) {
        if ( this.functions) {
            this.functions[functionName] = handler;
        }else {
            this.functions = {};
            this.functions[functionName] = handler;
        }
    }

    feedbackMessage(type : string, list : any[], index : number = this.progress){
        return (!this.options || this.options.length === 0) && (this.answers && this.answers.length > 1)
            ? list[index]
            : type === this.SUCCESS_FEEDBACK 
                ? list[0] : list[1];
    }

    triggerFeedback(feedbackType : string, index: number = -1) {
        if(index === -1){
            index = this.progress;
        }
        if(this.feedbacks && this.feedbacks.length > 0) {
            const feedbackMessage = this.feedbacks.length > 1 // Not sure of this change yet - Revert if issues arise
                ? this.feedbackMessage(feedbackType, this.feedbacks[index])
                : this.feedbackMessage(feedbackType, this.feedbacks[0], index);
            this.functions?.triggerFeedback(feedbackMessage , feedbackType);
        }
    }

    registerSlideData(slide : any) {
        this.resetData();
        
        slide.forEach((component : any)=>{
            this.answers = [ 
                ...( this.answers ?? [] ), 
                ...(component.answers ?? []), 
            ];
            this.options = [ 
                ...(this.options ?? []), 
                ...(component.options ?? []),
            ];
            this.feedbacks = [ 
                ...(this.feedbacks ?? []), 
                ...(component.feedbacks ?? []),
            ];
        });
        if (this.parent) {
            // Can be improved later
        }
    }

    resetData() {
        this.options = []
        this.answers = [];
        this.feedbacks = [];
        this.complete = false
        this.progress = 0;
        this.video = null;
        this.textFields = [];
        this.functions = {};
    }
    
    eventManager() {
        return {
            on: (eventName : string, callback : any) => {
                if( !window.SlideEventListener || !window.SlideEventListener[eventName]) {
                    window.SlideEventListener = window.SlideEventListener ?? {};
                    window.SlideEventListener[eventName] = true;
                    window.addEventListener(eventName, (data : any)=>{
                        this.eventsStorage.callEventFunctions(eventName, data);
                    });
                }
                this.eventsStorage.addFunctionToStore(eventName, callback);
            },
            trigger : (eventName : string, data : any) => {
                const event = new CustomEvent(eventName, { detail : data});
                window.dispatchEvent(event);
            }
        }
    }

    on(eventName : string, callback : any){ return this.eventManager().on(eventName, callback) }
    dispatch(eventName : string, data : any = {}){ this.eventManager().trigger(eventName, data) }

    checkSlideCanProceed = (slide : any, strict : boolean = false) => {
        let activate = true;
        const strictComponents = ["ButtonGroup", "FlashCards","Slider","WordMatch","Video","Options"];
        const mildComponents = ["GridSteps","Text"];
        for (let i = 0; i < slide.length; i++) {
          const data = slide[i];
          if(data && strictComponents.includes(data.component)){     
            activate = false;
            if( strict ){ 
              // Check for progress match answers
              if(this.answers && this.answers.length > 0) {
                activate = (this.progress === this.answers.length);
              }
              // Check for video ended
              if (this.video) {
                activate = this.video.ended;
              }
            }
          }
          if(data && mildComponents.includes(data.component)) {
            if(data.answers && this.answers && data.answers.length > 0){
              activate = (this.progress === this.answers.length);
            }
          }
    
        }
        return activate;
    }
}

export const setPageTheme = (theme? : string) => {
    const page = document.getElementById("LessonPage");
    if( page ){
        //Remove previous bg
        page.classList.forEach((className : any) => {
            if(className.includes("lesson-bg")){
                page.classList.remove(className);
            }
        });
        if( theme ) {
            page.classList.add(`lesson-bg-${theme}`);
        } else {
            page.classList.add(`lesson-bg-default`);
        }
    }

}

export const formatTextColor = (target : any, status : boolean) => {
    if(status){
      target.classList.remove("text-orange-500");
      target.classList.add("text-green-500");
    }else{
      target.classList.remove("text-green-500");
      target.classList.add("text-orange-500");
    }
}

export const pageContainsYoutubeScript = () =>{
    const script = document.getElementById('youtube-iframe');
    return script ? true : false;
}
export const youtubeInit = () => {
    
    const insertYoutubeApiScript = () => {
        var tag = document.createElement('script');
        tag.id = 'youtube-iframe';
        tag.src = 'https://www.youtube.com/iframe_api';
        var firstScriptTag : HTMLScriptElement = document.getElementsByTagName('script')[0];
        if( firstScriptTag ) {
            firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
        }else{
            document.body.appendChild(tag);
        }
    }

    if( !pageContainsYoutubeScript() ){
        insertYoutubeApiScript();
    }
}


export const LessonSlideScope = (parent : any = null) => ( new LessonSlide(parent) );


const keyToComponentMapper : {[key : string] : any} = {
    "Text" : TextComponent,
    "ButtonGroup" : ButtonGroupComponent,
    "Image" : ImageComponent,
    "Slider" : SliderComponent,
    "FlashCards" : FlashCardsComponent,
    "Video" : VideoComponent,
    "WordMatch" : WordMatchComponent,
    "Options" : OptionsComponent,
    "GridSteps" : GridSteps
}


export const loadComponent = ( componentData : any ) => {
    return keyToComponentMapper[componentData.component];
}
