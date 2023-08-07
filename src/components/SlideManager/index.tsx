import React, { FC, useEffect } from "react";
import { LessonSlideScope, loadComponent } from "./handler";
import { TextData } from "../Text/handler";
import ButtonGroupComponent from "../ButtonGroup";
import { ButtonGroupData } from "../ButtonGroup/handler";

interface SlideManagerProps {
    slideData : (
        TextData | ButtonGroupData
    )[];
}

const SlideManager: FC<SlideManagerProps> = ({slideData}) => {

  const SlideScope = LessonSlideScope();

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
  </>;
};

export default SlideManager;
