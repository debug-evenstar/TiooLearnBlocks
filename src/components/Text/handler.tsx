
/* -------------------------- COMPONENT INTERFACES -------------------------- */

interface TextStyles {
    color?: string;
}

interface TextData {
    content : string;
    tips? :  string[];
}

export interface TextComponentProps {
    styles? : TextStyles;
    data : TextData
}


/* ------------------------ COMPONENT HANDLER HELPERS ----------------------- */

const formatIdentifiers : {[key : string] : any } = {
    bold : [ "<**" , "**>" ],
    italic : [ "<!!" , "!!>" ],
    testcolor : [ "<++", "++>" ],
}

const formatMappings : {[key : string] : Function} = {
    bold : (text : string | React.ReactElement) => (<strong>{text}</strong>),
    italic : (text : string | React.ReactElement) => (<i>{text}</i>),
    testcolor : (text : string | React.ReactElement) => (<span className="text-blue-800">{text}</span>)
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
    const result =  recursiveFormatter(identifiersPresent, text, 0);
    return result;
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