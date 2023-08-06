import React, { FC } from "react";
import { LessonSlideScope, loadComponent } from "./handler";
import { TextData } from "../Text/handler";
import ButtonGroupComponent from "../ButtonGroup";

interface SlideManagerProps {
    slideData : (
        TextData
    )[];
}

const SlideManager: FC<SlideManagerProps> = ({slideData}) => {

  const SlideScope = LessonSlideScope();
  const data = ["hello", "areyou", "there"]
  return <>
    {
        slideData.map((component ) => {
            const Component = loadComponent(component);
            return ( <Component 
                data={component}
            />);
        })
    }
    <ButtonGroupComponent data={data}/>
  </>;
};

export default SlideManager;
