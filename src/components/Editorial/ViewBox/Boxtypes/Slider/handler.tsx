import { EditorialManagerInterface } from "components/Editorial/Base/EditorialManager";
import AddSlide from "components/Editorial/Sidebars/RightSidebar/EditProperties/Slider/EditProperties/AddSlide";
import Background from "components/Editorial/Sidebars/RightSidebar/EditProperties/Slider/EditProperties/Background";
import Extensions from "components/Editorial/Sidebars/RightSidebar/EditProperties/Slider/EditProperties/Extensions";
import ImageProperties from "components/Editorial/Sidebars/RightSidebar/EditProperties/Slider/EditProperties/Image/ImageProperties";
import TextProperties from "components/Editorial/Sidebars/RightSidebar/EditProperties/Slider/EditProperties/TextProperties";
import VideoProperties from "components/Editorial/Sidebars/RightSidebar/EditProperties/Slider/EditProperties/VideoProperties";

// for the slider edit properties
export const SliderProperties = (
  manager: EditorialManagerInterface,
  sliderCompName: string = "Text"
) => {
  const viewboxTypes: {
    [key: string]: JSX.Element;
  } = {
    Text: (
      <>
        <AddSlide manager={manager} type="Text" />
        <TextProperties manager={manager} />
        <Background manager={manager} />
        <Extensions manager={manager} />
      </>
    ),
    Image: (
      <>
        <AddSlide manager={manager} type="Image" />
        <ImageProperties manager={manager} />
      </>
    ),
    Video: (
      <>
        <AddSlide manager={manager} type="Video" />
        <VideoProperties manager={manager} />
      </>
    ),
    FlashCards: (
      <>
        <AddSlide manager={manager} type="Flash Card" />
        <ImageProperties manager={manager} />
      </>
    ),
  };

  return viewboxTypes[sliderCompName];
};
