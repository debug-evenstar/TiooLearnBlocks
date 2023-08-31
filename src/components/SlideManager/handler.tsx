import { elementIndexInParent } from "utilities/element";
import ButtonGroupComponent from "../ButtonGroup";
import FlashCardsComponent from "../FlashCards";
import ImageComponent from "../Image";
import OptionsComponent from "../Options";
import SliderComponent from "../Slider";
import TextComponent from "../Text"
import VideoComponent from "../Video";
import WordMatchComponent from "../WordMatch";
import { TextFieldsInterface } from "../extensions/TextFields";

export interface LessonSlideInterface {
    options? : any[];
    answers? : string[];
    feedbacks? : any[];
    status? : boolean;
    complete? : boolean;
    textFields? : TextFieldsInterface[];
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
    progress : number;
    video : any;
    setVideo : Function;
    resetData : Function;
    checkSlideCanProceed : Function;
}

class LessonSlide implements LessonSlideInterface{

    options? : any[];
    answers? : string[];
    feedbacks? : any[];
    status? : boolean;
    complete? : boolean;
    textFields? : TextFieldsInterface[];
    functions? : {[key : string] : Function};
    progress : number = 0;
    video : any = null;
    SUCCESS_FEEDBACK : string = "success";
    FAILURE_FEEDBACK : string = "failure";

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

    addFields( textFieldInstance : TextFieldsInterface ) {
        if( this.textFields ) {
            this.textFields.push(textFieldInstance);
        }else{
            this.textFields = [ textFieldInstance ]
        }
    }

    selectAnswer( index : number, value : string, callback : Function) {
        if( this.options && this.options.length ) {
            this.selectOptionAnswer(index, value, callback);
            return;
        }
        if ( this.answers ) {
            if( /*index > this.progress  ||*/ this.answers[index] !== value ) {
                this.triggerFeedback(this.FAILURE_FEEDBACK, index);
            } else {
                this.functions?.selectAnswer( this.progress, value );
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
        if( this.answers ) {
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
            }
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
        return !this.options || this.options.length == 0 
            ? list[index]
            : type === this.SUCCESS_FEEDBACK 
                ? list[0] : list[1];
    }

    triggerFeedback(feedbackType : string, index: number = -1) {
        if(index === -1){
            index = this.progress;
        }
        if(this.feedbacks && this.feedbacks.length > 0) {
            const feedbackMessage = this.feedbacks.length > 2
                ? this.feedbackMessage(feedbackType, this.feedbacks[index])
                : this.feedbackMessage(feedbackType, this.feedbacks[0], index);

            this.functions?.triggerFeedback(feedbackMessage , feedbackType);
        }

    }

    checkSlideCanProceed (slide : any, strict : boolean = false) {
        let activate = true;
        const blockProceed = ["ButtonGroup", "FlashCards","WordMatch","Slider","Video","Options"];
        for (let i = 0; i < slide.length; i++) {
          const data = slide[i];
          if(data && blockProceed.includes(data.component)){     
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
        }
        return activate;
    }

    resetData() {
        this.options = []
        this.answers = [];
        this.feedbacks = [];
        this.complete = false
        this.progress = 0;
        this.video = null;
    }
    
    eventManager() {
        return {
            on: (eventName : string, callback : any) => {
                window.addEventListener(eventName, (data : any)=>{
                    callback(data.detail);
                });
            },
            action : (eventName : string, data : any) => {
                const event = new CustomEvent(eventName, { detail : data});
                window.dispatchEvent(event);
            }
        }
    }

}

export const youtubeInit = () => {

    const pageContainsYoutubeScript = () =>{
        const script = document.getElementById('youtube-iframe');
        return script ? true : false;
    }
    
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


export const handleSlideTransition = (callback : Function) => {
    const currentSlide = document.getElementsByClassName("slide-current")[0];
    currentSlide.classList.remove("slide-current");
    const nextSlide  = document.getElementsByClassName("slide-next")[0];
    nextSlide.classList.remove("slide-next");
    const previousSlide  = document.getElementsByClassName("slide-previous")[0];
    previousSlide.classList.remove("slide-previous");

    // Add new slide classes
    nextSlide.classList.add("slide-current");
    previousSlide.classList.add("slide-next");
    currentSlide.classList.add("slide-previous");


    const list = {
        current : elementIndexInParent(nextSlide),
        next : elementIndexInParent(previousSlide),
        previous : elementIndexInParent(currentSlide)
    }

    setTimeout(()=>{
        callback(list);
    },600);
}


const keyToComponentMapper : {[key : string] : any} = {
    "Text" : TextComponent,
    "ButtonGroup" : ButtonGroupComponent,
    "Image" : ImageComponent,
    "Slider" : SliderComponent,
    "FlashCards" : FlashCardsComponent,
    "Video" : VideoComponent,
    "WordMatch" : WordMatchComponent,
    "Options" : OptionsComponent
}

export const loadComponent = ( componentData : any ) => {
    return keyToComponentMapper[componentData.component];
}

export const LessonSlideScope = () => ( new LessonSlide() );





