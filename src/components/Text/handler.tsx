
/* -------------------------- COMPONENT INTERFACES -------------------------- */

import { LessonSlideInterface } from "../SlideManager/handler";

interface TextStyles {
    color?: string;
}

export interface TextData {
    content : string;
    tips? :  string[];
    answers? : string[];
    options? : string[];
}

export interface TextComponentProps {
    styles? : TextStyles;
    data : TextData;
    slide : LessonSlideInterface;
}


/* ------------------------ COMPONENT HANDLER HELPERS ----------------------- */

const formatIdentifiers : {[key : string] : any } = {
    bold : [ "<**" , "**>" ],
    italic : [ "<!!" , "!!>" ],
    keyword : [ "<(" , ")>" ],
}

const formatMappings : {[key : string] : Function} = {
    bold : (text : string | React.ReactElement) => (<strong className="text-font">{` `}{text}{` `}</strong>),
    italic : (text : string | React.ReactElement) => (<i>{` `}{text}{` `}</i>),
    keyword : (text : string | React.ReactElement) => (<span className="text-green-500">{` `}{text}{` `}</span>)
}

const format = (key : string, text : string) => {
    return formatMappings[key](text);
}



/* ----------------------- COMPONENT HANDLER FUNCTIONS ---------------------- */


const stringContainsAny = (list : string[], text : string,) => {
    return (list.filter((item : string) => text.includes(item)).length > 0);
}

const recursiveFormatter = (identifiers : any, text : string, index : number) => {
    var key =  identifiers[index];
    const pair = formatIdentifiers[key];
    const start = pair[0], end = pair[1];
    var result : any = text.replace(start,"").replace(end,"");
    if( (index+1) < identifiers.length ){
        result = recursiveFormatter(identifiers, result, (index+1));
        return format(key , result);
    } else {
        return format(key, result);
    }
}

const formatText = (text : any) => {
    const identifiers = Object.keys(formatIdentifiers);
    const identifiersPresent = identifiers.filter((key : any) => {
        const item = formatIdentifiers[key];
        return text.includes(item[0]);
    });
    const result = recursiveFormatter(identifiersPresent, text, 0);
    return result;
}

const collectFormattingIndices  = (list : any[], index : number = 0) => {
    const identifiers = Object.values(formatIdentifiers);
    const keys = Object.keys(formatIdentifiers);
    const pair = identifiers[index];
    const indices : any = {};
    let track = false;
    for (let i = 0; i < list.length; i++) {
        const text = list[i];
        if( text.includes(pair[0]) ) {
            track = true;
            list[i] = list[i].replace(pair[0], "");
        }
        if (track) {
            const key = keys[index];
            if ( indices[key] ) {
                indices[key].push(i);
            } else {
                indices[key] = [i];
            }
        }
        if (text.includes(pair[1])) {
            track = false;
            list[i] = list[i].replace(pair[1], "");
        }
    }

    if( identifiers.length > (index + 1)){
        const next : any = collectFormattingIndices(list, index + 1);
        return {
            list : next.list,
            indices : {
                ...indices,
                ...next.indices
            }
        }
    }
    return {
        list : list,
        indices : indices
    };

}

const handleFormatting = (content : string) => {
    const list = content.split(" ");
    const collect = collectFormattingIndices(list);
    for(const key in collect.indices) {
        const indicesToFormat : any[] = collect.indices[key];
        indicesToFormat.forEach((index) => {
            collect.list[index] = format(key, collect.list[index]);
        });
    }
    return collect.list;
}


export const processTextStyles = () =>{
    // Some Data Here
}

export const processTextContent = (content : string) => {
    return handleFormatting(content);
}