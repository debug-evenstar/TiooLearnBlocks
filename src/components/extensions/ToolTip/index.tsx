import { randomString } from "../../../utilities/string";
import ToolTipComponent from "./render";

export class ToolTipTypes{
    static TEXT = "Text"
}

class ToolTipsHandler{

    type : string;
    data : (string | React.ReactElement)[]; //For now only support for text component
    tips : string[];
    ids : string[];

    constructor( type : string, data : any, tips : string[] ){
        this.type = type;
        this.tips = tips;
        this.data = data;
        this.ids = [];
        this.processDataTips();
    }

    getIdentifiers(){
        return ["<~","~>"];
    }
    
    generateToolTip(content : string){
        // Some Jsx returned
    }


    formatToolTip(text : string, tipContent : string){
        const id = randomString(15);
        return {
            id : id,
            element : (
                <ToolTipComponent
                    label={text}
                    content={tipContent}
                />
            )
        }
    }

    processDataTips(){
        const identifiers = this.getIdentifiers();
        const start = identifiers[0], end = identifiers[1];
        const textContent = [ ...this.data ];
        let tipIndex = 0;
        let withinTip = false
        let currentTipIndex = -1;
        let activeTipable : string[] = [];
        textContent.forEach((item : any, index : number)=>{
            if(typeof item == "string"){
                if( item.includes(start) || withinTip || item.includes(end)){
                    if( item.includes(start) ) {
                        withinTip = true;
                        currentTipIndex = index;
                    }
                    if( withinTip ){
                        const extracted = item.replace(start,"").replace(end,"");
                        activeTipable.push(extracted);
                        if(currentTipIndex !== index){
                            this.data.splice(index, 1);
                        }
                    }
                    if( item.includes(end) ){
                        const extracted = activeTipable.join(" ");
                        const formattedTip = this.formatToolTip(extracted, this.tips[tipIndex]);
                        this.data[currentTipIndex] = formattedTip.element;
                        currentTipIndex = -1;
                        withinTip = false;
                        tipIndex++;
                    }
                }
            }
        })
        return this.data;
    }
}

export const ToolTips = (
    type : string,
    data : any,
    tips : string[]
) => ( new ToolTipsHandler(type, data, tips) );
