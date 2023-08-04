
/* -------------------------- COMPONENT INTERFACES -------------------------- */

import { ReactElement } from "react";
import { format, formatIdentifiers } from "./helpers";

export interface TextStyles {
    color?: string;
}

export interface TextData {
    content : string;
    tips? :  string[];
}

export interface TextComponentProps {
    styles? : TextStyles;
    data : TextData
}


/* ----------------------- COMPONENT HANDLER FUNCTIONS ---------------------- */


const stringContainsAny = (list : string[], text : string,) => {
    return (list.filter((item : string) => text.includes(item)).length > 0);
}

const formatText = (text : any) => {
    const identifiers = Object.values(formatIdentifiers);
    identifiers.forEach(( pair, index ) => {
        const key = Object.keys(formatIdentifiers)[index];
        const start = pair[0], end = pair[1];
        if( text.includes(start) ) {
            text = text.replace(start,"").replace(end,"");
            text = format(key, text);
        }
    });
    return text;
}

const handleFormatting = (content : string) => {
    const identifiers = Object.values(formatIdentifiers);
    const spacingSplit = content.split(" ");
    const formatted : any[] = [];
    const listFormatIndentifiers = identifiers.map( pair => {
        return pair[0];
    })
    spacingSplit.forEach( (text) => {
        if( stringContainsAny( listFormatIndentifiers, text ) ) {
            formatted.push( formatText(text) );
        }else{
            formatted.push( text );
        }
    });
    return formatted;
}


export const processTextStyles = () =>{
    // Some Data Here
}

export const processTextContent = (content : string) => {
    return handleFormatting(content);
}