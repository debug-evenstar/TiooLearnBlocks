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
        slideData.map((component, index) => {
            const Component = loadComponent(component);
            return ( <Component
                key={index}
                data={component}
                slide={SlideScope}
            />);
        })
    }
    <ButtonGroupComponent data={data}/>
  </>;
};

export default SlideManager;
