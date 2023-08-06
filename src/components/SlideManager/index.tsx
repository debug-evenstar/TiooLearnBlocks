import React, { FC } from "react";
import { loadComponent } from "./handler";
import { TextData } from "../Text/handler";
import TextFieldComponent from "../extensions/TextFields/render";

interface SlideManagerProps {
    slideData : (
        TextData
    )[];
}

const SlideManager: FC<SlideManagerProps> = ({slideData}) => {
  return <>
    {
        slideData.map((component ) => {
            const Component = loadComponent(component);
            return ( <Component 
                data={component}
            />);
        })
    }
    <TextFieldComponent/>
  </>;
};

export default SlideManager;
