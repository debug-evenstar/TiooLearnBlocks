import { randomString } from "../../../utilities/string";
import TextFieldComponent from "./render";

export interface TextFieldsInterface {
    data : (string | React.ReactElement)[];
    fieldIds : string[]; 
    fieldData : {[key: string]: string};
    fieldReplacementFill : Function;
}

class TextFieldsHandler implements TextFieldsInterface{

    data : (string | React.ReactElement)[];
    fieldIds : string[]; 
    fieldData : {[key: string]: any};

    constructor(data : any){
        this.data = data;
        this.fieldIds = [];
        this.fieldData = {}
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
    }

    fieldReplacementFill(index : number, value : string, data : any[]){
        const fieldIndex = Object.values(this.fieldData)[index].index;
        data[fieldIndex] = (<span className="text-green-500 font-semibold text-[17px]">{value}</span>);
        return [...data];
    }

    formatTextField(){
        const id = randomString(15);
        return {
            id : id,
            element : (
                <TextFieldComponent 
                    id={id}
                    manager={this}
                />
            )
        }
    }

    processTextFields(){
        const identifier = this.getIdentifier();
        const textContent = this.data;
        textContent.forEach((item : any, index : number)=>{
            if(typeof item == "string"){
                if( item === identifier ){
                    const field = this.formatTextField();
                    this.fieldIds.push(field.id);
                    textContent[index] = field.element;
                    this.fieldData[field.id] = {
                        index : index
                    }
                }
            }
        })
        this.data = textContent;
        return textContent;
    }
}

export const TextFields = (
    data : any,
) => ( new TextFieldsHandler(data) );
