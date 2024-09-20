import QuestionEditorialComponent from "../Components/Question";
import Image from "../Components/Image/Image";
import Text from "../Components/Text/Text";

const keyToComponentMapper: { [key: string]: any } = {
    Text : Text,
    Image : Image,
    Questions: QuestionEditorialComponent
};
  
export const loadEditorialComponent = (componentData: any) => {
    return keyToComponentMapper[componentData.component];
};
  