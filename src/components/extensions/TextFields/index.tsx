import { LessonSlideInterface } from "components/SlideManager/handler";
import { randomString } from "../../../utilities/string";
import TextFieldComponent from "./render";
import { SlideEvents } from "components/SlideManager/events";

export interface TextFieldsInterface {
    data : (string | React.ReactElement)[];
    fieldIds : string[]; 
    fieldData : {[key: string]: string};
    fieldReplacementFill : Function;
    triggerReplacement : Function;
    setFiller : Function;
    slide : LessonSlideInterface;
    setFieldValue : Function;
    answers : any[];
    options : any[];
    simulateAnswerWidth : Function;
    inputAnswerMatch : Function;
    slideScopeIndex : Function;
    registerField : Function;
}

class TextFieldsHandler implements TextFieldsInterface{

    data : (string | React.ReactElement)[];
    fieldIds : string[]; 
    fieldData : {[key: string]: any};
    slide : LessonSlideInterface;
    answers : any[];
    options: any[];

    constructor(data : any, slide : LessonSlideInterface, answers : any[] = [], options : any[] = []){
        this.data = data;
        this.fieldIds = [];
        this.fieldData = {}
        this.slide = slide;
        this.answers = answers;
        this.options = options;
        if (data.length){
            this.processTextFields();
        }
    }

    getIdentifier(){
        return "<?>";
    }
    
    generateToolTip(content : string){
        // Some Jsx returned
    }

    setFiller(id : any, callback : Function) {
        if(this.fieldData && id) {
            this.fieldData[id]["fill"] = callback;
            this.updateFieldInSlide(id);
        }
    }

    setFieldValue(id : string , value : string, callback? : Function) {
        const newValue : {[key: string]: any}  = {};
        newValue[id] = {
            ...(this.fieldData[id] ?? {}),
            value : value
        };
        this.fieldData = {
            ...this.fieldData,
            ...newValue
        }

        // Automatically fill field if subjective answer is inputted
        if ( this.answers && this.answers.length ){
            const fieldIndex = Object.keys(this.fieldData).indexOf(id);
            const answer : string|string[] = this.answers[fieldIndex]
            this.slide.verifySubjectiveAnswer(value, answer, (status : boolean)=>{
                status && callback && callback();
            });
        }
    }

    fieldReplacementFill(value : string){
        return (<span className="!text-green-500 font-semibold text-[17px] text-font">{value}</span>);
    }

    triggerReplacement(){

    }


    formatTextField(answerIndex = -1){
        const id = randomString(15);
        let answer : (number|null) = answerIndex !== -1
            ? this.answers[answerIndex]
            : null;
        let options = this.options && this.options.length ? true : false;

        const field : any = {
            id : id,
            index : answerIndex,
            manager : this,
            element : (
                <TextFieldComponent 
                    id={id}
                    manager={this}
                    allowInput={!!answer && !options}
                    answer={answer}
                />
            ),
            customElement : (props : any) => (
                <TextFieldComponent 
                    id={id}
                    manager={this}
                    allowInput={!!answer && !options}
                    answer={answer}
                    styles={props.styles ?? {}}
                />
            )
        }

        this.registerField(field);
        return field;
    }

    registerField(field : any){
        this.fieldIds.push(field.id);
        this.slide.addFields(field);
        this.fieldData[field.id] = {
            ...field
        };
    }

    updateFieldInSlide(id : string) {
        this.slide.textFields?.forEach((field : any, index : number) => {
            if (this.slide.textFields && field.id === id) 
                this.slide.textFields[index] = this.fieldData[id];
        });
    }

    processTextFields(){
        const identifier = this.getIdentifier();
        const textContent = this.data;
        let answerIndex : number = 0;
        textContent.forEach((item : any, index : number)=>{
            if(typeof item == "string"){
                if( item === identifier ){
                    const field = this.answers.length 
                        ? this.formatTextField(answerIndex)
                        : this.formatTextField();
                    textContent[index] = field.element;
                    answerIndex++;
                }
            }
        })
        this.data = textContent;
        return textContent;
    }

    simulateAnswerWidth(answer : string|string[]){
        return simulateWidth(answer);
    }

    inputAnswerMatch(input : string, answer : string|string[] ){
        if( typeof answer == "string" ){
            return answer.substring(0, input.length).toLowerCase() === input.toLowerCase();
        }else{
            let state = false;
            for (let i = 0; i < answer.length; i++) {
                const item = answer[i];
                if( item.substring(0, input.length).toLowerCase() === input.toLowerCase() ){
                    state = true;
                }
            }
            return state;
        }
    }

    // Use field answers to determine slide scope index
    slideScopeIndex( id : string, answer : string|string[] ){
        const slideFields = this.slide.textFields;
        let index = 0;
        if(slideFields){
            for (let i = 0; i < slideFields.length; i++) {
                const field = slideFields[i];
                if(field.id === id) {
                    return index;
                }else{
                    index++
                }
            }
        }
        return index;
    }
}

export const simulateWidth = (answer : string|string[]) => {
    let fieldAnswer : string = "";
    const textElement = document.createElement("p");
    textElement.className = "text-font";
    textElement.style.opacity = "0";
    if(typeof answer === "string"){
        fieldAnswer = answer;
    }else{
        answer.forEach(item => {
            fieldAnswer = item.length > fieldAnswer.length ? item : fieldAnswer;
        })
    }
    textElement.innerHTML = fieldAnswer;
    textElement.style.display = "inline-block";
    document.body.appendChild(textElement);
    const textWidth = textElement.offsetWidth + 30;
    document.body.removeChild(textElement);
    return textWidth;
}

export const TextFields = (
    data : any,
    slide : LessonSlideInterface,
    answers : any[],
    options : any[]
) => ( new TextFieldsHandler(data, slide, answers, options) );
