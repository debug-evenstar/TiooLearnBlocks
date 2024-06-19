import QuestionEditorialComponent from "../Components/Question";

const keyToComponentMapper: { [key: string]: any } = {
    Questions: QuestionEditorialComponent
};
  
export const loadEditorialComponent = (componentData: any) => {
    return keyToComponentMapper[componentData.component];
};
  