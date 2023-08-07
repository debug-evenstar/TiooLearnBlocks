import ButtonGroupComponent from "../ButtonGroup";
import TextComponent from "../Text"
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

    selectAnswer( index : number, value : string) {
        if ( this.answers ) {
            
            if( /*index > this.progress  ||*/ this.answers[index] !== value ) {
                alert("Wrong Answer");
            } else {
                this.functions?.selectAnswer( index, value );
                this.progress++;
                if(this.progress === this.answers.length) {
                    this.complete = true;
                }
            }

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
    "ButtonGroup" : ButtonGroupComponent
}


export const loadComponent = ( componentData : any ) => {
    return keyToComponentMapper[componentData.component];
}
