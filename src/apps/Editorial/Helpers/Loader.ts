import QuestionEditorialComponent from "../Components/Question";
import Image from "../ViewBox/Boxtypes/Image/Image";
import Text from "../ViewBox/Boxtypes/Text/Text";

const keyToComponentMapper: { [key: string]: any } = {
    Text : Text,
    Image : Image,
    Questions: QuestionEditorialComponent
};
  
export const loadEditorialComponent = (componentData: any) => {
    return keyToComponentMapper[componentData.component];
};
  