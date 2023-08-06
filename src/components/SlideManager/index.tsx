import React, { FC } from "react";
import { LessonSlideScope, loadComponent } from "./handler";
import { TextData } from "../Text/handler";

interface SlideManagerProps {
    slideData : (
        TextData
    )[];
}

const SlideManager: FC<SlideManagerProps> = ({slideData}) => {

  const SlideScope = LessonSlideScope();
  
  return <>
    {
        slideData.map((component ) => {
            const Component = loadComponent(component);
            return ( <Component 
                data={component}
            />);
        })
    }
  </>;
};

export default SlideManager;
