import TextComponent from "../Text"

export interface LessonSlideInterface {
    options? : string[];
    answers? : string[];
    status? : boolean;
    complete? : boolean;
    setAnswers : Function;
    setOptions : Function;
    setStatus: Function;
}

class LessonSlide implements LessonSlideInterface{

    options? : string[];
    answers? : string[];
    status? : boolean;
    complete? : boolean;

    setOptions(options : string[]) {
        this.options =  options;
    }

    setAnswers(answers : string[]) {
        this.answers = answers;
    }

    setStatus( status : boolean) {
        this.status = status;
    }

}

export const LessonSlideScope = () => ( new LessonSlide() );


const keyToComponentMapper : {[key : string] : any} = {
    "Text" : TextComponent
}


export const loadComponent = ( componentData : any ) => {
    return keyToComponentMapper[componentData.component];
}