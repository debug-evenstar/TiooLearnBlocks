import { ComponentBaseDataInterface} from "components/Editorial/Base/EditorialManager";

interface TextComponentDataInterface extends ComponentBaseDataInterface{
    content : string;
}

export const setTextComponentData = (
    content : string = "", 
) => {
    const data : TextComponentDataInterface = {
        component :  "Text",
        content,
        theme : "white",
    }
    return data;
}

