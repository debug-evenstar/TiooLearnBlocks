export const formatIdentifiers = {
    bold : [ "<**" , "**>" ]
}

export const formatMappings : {[key : string] : Function} = {
    bold : (text : string) => (<strong>{text}</strong>)
}

export const format = (key : string, text : string) => {
    return formatMappings[key](text);
}

