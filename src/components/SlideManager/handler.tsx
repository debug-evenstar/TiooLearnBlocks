import TextComponent from "../Text"

const keyToComponentMapper : {[key : string] : any} = {
    "Text" : TextComponent
}


export const loadComponent = ( componentData : any ) => {
    return keyToComponentMapper[componentData.component];
}