import { LessonSlideInterface } from "components/SlideManager/handler";
import { randomString } from "../../../utilities/string";
import TextFieldComponent from "./render";
import { SlideEvents } from "components/SlideManager/events";

export interface TextFieldsInterface {
    data : (string | React.ReactElement)[];
    fieldIds : string[]; 
    fieldData : {[key: string]: string};
    fieldReplacementFill : Function;
    slide : LessonSlideInterface;
    setFieldValue : Function;
    answers : any[];
    simulateAnswerWidth : Function;
    inputAnswerMatch : Function;
    slideScopeIndex : Function;
}

class TextFieldsHandler implements TextFieldsInterface{

    data : (string | React.ReactElement)[];
    fieldIds : string[]; 
    fieldData : {[key: string]: any};
    slide : LessonSlideInterface;
    answers : any[];

    constructor(data : any, slide : LessonSlideInterface, answers : any[] = []){
        this.data = data;
        this.fieldIds = [];
        this.fieldData = {}
        this.slide = slide;
        this.answers = answers;
        this.processTextFields();
    }

    getIdentifier(){
        return "<?>";
    }
    
    generateToolTip(content : string){
        // Some Jsx returned
    }

    setFieldValue(id : string , value : string) {
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
            this.slide.verifySubjectiveAnswer(fieldIndex, value, answer);
        }
    }

    fieldReplacementFill(index : number, value : string, data : any[]){
        const fieldIndex = Object.values(this.fieldData)[index].index;
        data[fieldIndex] = (<span className="text-green-500 font-semibold text-[17px] text-font">{value}</span>);
        return [...data];
    }


    formatTextField(answerIndex = -1){
        const id = randomString(15);
        let answer : (number|null) = answerIndex !== -1
            ? this.answers[answerIndex]
            : null;

        return {
            id : id,
            index : answerIndex,
            element : (
                <TextFieldComponent 
                    id={id}
                    manager={this}
                    allowInput={!!answer}
                    answer={answer}
                />
            )
        }
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
                    this.fieldIds.push(field.id);
                    this.slide.addFields(field);
                    textContent[index] = field.element;
                    this.fieldData[field.id] = {
                        index : index
                    }
                    answerIndex++;
                }
            }
        })
        this.data = textContent;
        return textContent;
    }

    simulateAnswerWidth(answer : string|string[]){
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
    slideScopeIndex( answer : string|string[] ){
        const slideAnswers = this.slide.answers;
        const index = slideAnswers?.indexOf(answer);
        return index;
    }
}

export const TextFields = (
    data : any,
    slide : LessonSlideInterface,
    answers : any[]
) => ( new TextFieldsHandler(data, slide, answers) );
