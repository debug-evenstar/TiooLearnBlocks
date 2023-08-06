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
      content:
        "The very tall and bright white <~man~> immediately started his <~journey~> <?> without <**troubles**> or any hesitations",
      tips: [
        "Just a man in a sentence driving",
        "Just a man in a sentence driving, Just a man in a sentence driving",
      ],
      answers: ["early"],
    },
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
