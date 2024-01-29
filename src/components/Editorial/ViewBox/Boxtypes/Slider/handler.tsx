import { EditorialManagerInterface } from "components/Editorial/Base/EditorialManager";
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
        <TextProperties manager={manager} />
        <Background manager={manager} />
        <Extensions manager={manager} />
      </>
    ),
    Image: (
      <>
        <ImageProperties manager={manager} />
      </>
    ),
    Video: (
      <>
        <VideoProperties manager={manager} />
      </>
    ),
    FlashCards: (
      <>
        <ImageProperties manager={manager} />
      </>
    ),
  };

  return viewboxTypes[sliderCompName];
};
