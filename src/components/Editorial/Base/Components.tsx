import Image from "../ViewBox/Boxtypes/Image";
import Text from "../ViewBox/Boxtypes/Text";

const keyToComponentViewMapper : {[key : string] : any} = {
    "Text" : Text,
    "Image" : Image,
}

export const loadComponent = ( componentName : any ) => {
    return keyToComponentViewMapper[componentName];
}