import React, { FC } from "react";
import { LessonSlideScope, loadComponent } from "./handler";
import { TextData } from "../Text/handler";
import ButtonGroupComponent from "../ButtonGroup";
import ImageComponent from "../Image/index";
import SliderComponent from "../Slider";

interface SlideManagerProps {
    slideData : (
        TextData
    )[];
}

const SlideManager: FC<SlideManagerProps> = ({slideData}) => {

  const SlideScope = LessonSlideScope();

  const data = ["hello", "areyou", "there"]
  const url = 'https://res.cloudinary.com/dic7regoe/image/upload/v1691358759/praxeum/image_25_xshh7o.png'
  return <div className="grid gap-y-5 my-5">
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
    {/* <SliderComponent/> */}
    <ImageComponent url={url}/>
    <ButtonGroupComponent data={data} slide={SlideScope}/>
  </div>;
};

export default SlideManager;
