import React from "react";
import ImageComponent from "../components/Image";
import { FormatText } from "../formatText/Text";
import {
  TextComponentProps,
  processTextContent,
} from "../components/Text/handler";
import TextComponent from "../components/Text/index";
import SlideManager from "../components/SlideManager";

const RenderComponent = () => {
  const slide = [
    {
      component: "Text",
      content: "Nouns are naming words. A noun is a word that names a person, animal, place, thing, event, feeling or idea. ",
    },
    {
      component: "Text",
      content: "There are two important types of nouns, namely ",
    },
    {
      component: "Text",
      content: "<?> noun and <?> noun",
    },
    {
      component : "ButtonGroup",
      answers : ["Concrete", "Abstract"]
    }
    
  ];
  const containerStyle = {
    background:
      "url('https://res.cloudinary.com/dic7regoe/image/upload/v1691354626/praxeum/Frame_1000004416_iflseu.png')",
    backgroundSize: "100% 100%",
    width: "800px",
    height: "400px",
    margin: "0 auto",
    padding: "10px 30px",
    color: "white",
    display: "grid",
    justifyContent: "center",
    alignItems: "center",
    overflow: "auto"
  };
  return (
    <>
      <div className="w-full h-screen text-center grid place-content-center">
        <div style={containerStyle}>
          <SlideManager slideData={slide} />
        </div>
      </div>
    </>
  );
};

export default RenderComponent;
