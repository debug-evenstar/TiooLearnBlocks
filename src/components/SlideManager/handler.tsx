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
    options? : string[];
    answers? : string[];
    status? : boolean;
    complete? : boolean;
    textFields? : TextFieldsInterface[];
    setAnswers : Function;
    setOptions : Function;
    setStatus: Function;
    addFields : Function;
    selectAnswer : Function;
    setFunction : Function;
    triggerFeedback : Function;
    functions? : {[key : string] : Function};
    progress : number
}

class LessonSlide implements LessonSlideInterface{

    options? : string[];
    answers? : string[];
    status? : boolean;
    complete? : boolean;
    textFields? : TextFieldsInterface[];
    functions? : {[key : string] : Function};
    progress : number = 0

    setOptions(options : string[]) {
        this.options =  options;
    }

    setAnswers(answers : string[]) {
        this.answers = answers;
    }

    setStatus( status : boolean) {
        this.status = status;
    }

    addFields( textFieldInstance : TextFieldsInterface ) {
        if( this.textFields ) {
            this.textFields.push(textFieldInstance);
        }else{
            this.textFields = [ textFieldInstance ]
        }
    }

    selectAnswer( index : number, value : string, callback : Function) {
        if( this.options ) {
            this.selectOptionAnswer(index, value, callback);
            return;
        }
        if ( this.answers ) {
            if( /*index > this.progress  ||*/ this.answers[index] !== value ) {
                alert("Wrong Answer");
                this.triggerFeedback()
            } else {
                this.functions?.selectAnswer( index, value );
                alert("Correct");
                this.triggerFeedback()
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
                this.progress++;
                alert("Correct");
                if(this.progress === this.answers.length) {
                    this.complete = true;
                    this.functions?.allowProceed();
                }
                setTimeout(()=>{
                    this.callComponentFunctions(value);
                    callback();
                },400)
                this.triggerFeedback();
            }else{
                alert("Wrong");
            }
        }
    }

    callComponentFunctions( value : string) {
        // Select text field answer (if present)
        if( this.functions?.selectAnswer ){
            this.functions?.selectAnswer( 0, value );
        }
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

    triggerFeedback() {

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

export const LessonSlideScope = () => ( new LessonSlide() );


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
