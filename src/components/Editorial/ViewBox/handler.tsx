import { EditorialManagerInterface } from "../Base/EditorialManager";
import Image from "./Boxtypes/Image/Image";
import Text from "./Boxtypes/Text/Text";
import Background from "../Sidebars/RightSidebar/EditProperties/Background";
import Delete from "../Sidebars/RightSidebar/EditProperties/Delete";
import Extensions from "../Sidebars/RightSidebar/EditProperties/Extensions";
import TextProperties from "../Sidebars/RightSidebar/EditProperties/TextProperties";
import Video from "./Boxtypes/Video/Video";
import VideoProperties from "components/Editorial/Sidebars/RightSidebar/EditProperties/VideoProperties";
import Flashcard from "./Boxtypes/Flashcard/Flashcard";
import AddImages from "../Sidebars/RightSidebar/EditProperties/FlashCard/AddImages";
import { toggleWrapperStyle } from "./Boxtypes/Text/handlers/stylesHandler";
import ImageProperties from "../Sidebars/RightSidebar/EditProperties/Image/ImageProperties";
import { useSelector } from "react-redux";
import { handleSetActiveCompName } from "provider/sliderSlice";
import { SliderProperties } from "./Boxtypes/Slider/handler";

// for extracting the name of the component
export function getOriginalName(str: string): string {
  const indexOfClone = str.indexOf("-clone-");

  if (indexOfClone !== -1) {
    if (str.substring(0, indexOfClone) === "Flash Card") {
      return "FlashCard";
    }
    return str.substring(0, indexOfClone);
  } else {
    return str;
  }
}

// for viewbox component
export const ViewBoxContent = (
  id: string,
  manager: EditorialManagerInterface,
  viewBoxRef: React.MutableRefObject<HTMLDivElement | null>,
  isEditable: boolean,
  setIsEditable: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const componentName = getOriginalName(id);
  console.log(id, componentName);

  const viewboxTypes: {
    [key: string]: JSX.Element;
  } = {
    Text: (
      <Text
        id={id}
        manager={manager}
        viewBoxRef={viewBoxRef}
        isEditable={isEditable}
        setIsEditable={setIsEditable}
      />
    ),
    Image: <Image id={id} manager={manager} viewBoxRef={viewBoxRef} />,
    FlashCard: <Flashcard id={id} manager={manager} viewBoxRef={viewBoxRef} />,
    Video: <Video id={id} manager={manager} viewBoxRef={viewBoxRef} />,
  };

  return viewboxTypes[componentName];
};

// for editing in rightsidebar
export const EditProperties = (
  id: string,
  manager: EditorialManagerInterface
) => {
  const componentName = getOriginalName(id);
  const selector: any = useSelector(handleSetActiveCompName);
  const activeCompName = selector.payload.slider.value.activeCompName;

  const viewboxTypes: {
    [key: string]: JSX.Element;
  } = {
    Text: (
      <>
        <TextProperties manager={manager} />
        <Background manager={manager} />
        <Extensions manager={manager} />
        <Delete id={id} manager={manager} />
      </>
    ),
    Image: (
      <>
        <ImageProperties manager={manager} />
        <Delete id={id} manager={manager} />
      </>
    ),
    Video: (
      <>
        <VideoProperties manager={manager} />
        <Delete id={id} manager={manager} />
      </>
    ),
    FlashCards: (
      <>
        <AddImages id={id} manager={manager} />
        <ImageProperties manager={manager} />
        <Delete id={id} manager={manager} />
      </>
    ),
    Slider: SliderProperties(manager, activeCompName),
  };
  return viewboxTypes[componentName];
};

/* -------------------------------------------------------------------------- */
/*                                SOMETHING NEW                               */
/* -------------------------------------------------------------------------- */

interface ViewBoxHandlerInterface {
  // Some other properties and methods
  manager: EditorialManagerInterface;
  setViewBoxStyle: Function;
}
export class ViewBoxHandler implements ViewBoxHandlerInterface {
  manager: EditorialManagerInterface;
  constructor(manager: EditorialManagerInterface) {
    this.manager = manager;
  }

  setViewBoxStyle(style: string, styleType: string) {
    const element = this.manager.canvasManager.activeComponentElement();
    if (!element) return;
    toggleWrapperStyle(element, style, styleType);
  }
}

export const resizeInputWidth = (input: HTMLInputElement) => {
  if (input) {
    const width = input.value.length * 8.5 + 20;
    input.style.width = `${width}px`;
  }
};
