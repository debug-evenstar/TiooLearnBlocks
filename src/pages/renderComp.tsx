import React from "react";
import TextComponent from "../components/Text";
import ImageComponent from "../components/Image";
import { FormatText } from "../formatText/Text";

const RenderComponent = () => {
  const data = "the white <**man**> started his journey early without <**troubles**>"
  return (
    <>
      {FormatText(data)}
      {/* <div className="grid gap-5 w-[600px] h-[300px] overflow-y-auto mx-auto border-2 mt-24 p-6">
        <TextComponent
          children={<>I am a boy from a very low income state</>}
        />
        <ImageComponent
          src="https://res.cloudinary.com/dic7regoe/image/upload/v1689279991/praxeum/image_14_jeqsjo.png"
          alt="comp"
          width="w-full"
          height="h-[200px]"
        />
        <TextComponent
          children={<>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem illo excepturi sed sequi expedita porro enim, vero maxime perspiciatis amet nam ea assumenda, libero commodi, consectetur quaerat deleniti error aspernatur?</>}
        />
      </div> */}
    </>
  );
};

export default RenderComponent;
