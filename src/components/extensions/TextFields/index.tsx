import { randomString } from "../../../utilities/string";
import TextFieldComponent from "./render";

class TextFieldsHandler{

    data : (string | React.ReactElement)[];
    fieldIds : string[]; 
    fieldData : {[key: string]: string};

    constructor(data : any){
        this.data = data;
        this.fieldIds = [];
        this.fieldData = {}
    }

    getIdentifier(){
        return "<?>";
    }
    
    generateToolTip(content : string){
        // Some Jsx returned
    }

    setFieldValue(id : string , value : string) {
        const newValue : {[key: string]: string}  = {};
        newValue[id] = value;
        this.fieldData = {
            ...this.fieldData,
            ...newValue
        }
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
                }
            }
        })
        return textContent;
    }
}

export const TextFields = (
    data : any,
) => ( new TextFieldsHandler(data) );
