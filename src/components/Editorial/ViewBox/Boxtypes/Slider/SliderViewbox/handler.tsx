import { EditorialManagerInterface } from "components/Editorial/Base/EditorialManager";
import Image from "./Boxtypes/Image/Image";
import Text from "./Boxtypes/Text/Text";
import Background from "components/Editorial/Sidebars/RightSidebar/EditProperties/Background";
import Delete from "components/Editorial/Sidebars/RightSidebar/EditProperties/Delete";
import Extensions from "components/Editorial/Sidebars/RightSidebar/EditProperties/Extensions";
import TextProperties from "components/Editorial/Sidebars/RightSidebar/EditProperties/TextProperties";
import Video from "./Boxtypes/Video/Video";
import VideoProperties from "components/Editorial/Sidebars/RightSidebar/EditProperties/VideoProperties";
import AddImages from "components/Editorial/Sidebars/RightSidebar/EditProperties/FlashCard/AddImages";
import Objective from "components/Editorial/Sidebars/RightSidebar/EditProperties/Extensions/Objective";
import Subjective from "components/Editorial/Sidebars/RightSidebar/EditProperties/Extensions/Subjective";
import ImageProperties from "components/Editorial/Sidebars/RightSidebar/EditProperties/Image/ImageProperties";
import FlashcardObjective from "components/Editorial/Sidebars/RightSidebar/EditProperties/FlashCard/FlashcardObjective";
import SliderHeader from "components/Editorial/Sidebars/RightSidebar/EditProperties/Slider/SliderHeader";
import { toggleWrapperStyle } from "../../Text/handlers/stylesHandler";

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
  setIsEditable: React.Dispatch<React.SetStateAction<boolean>>,
  data: any,
  currIndex: number,
  isFlashcardDraggable: boolean
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
        data={data}
        currIndex={currIndex}
      />
    ),
    Image: (
      <Image
        id={id}
        manager={manager}
        viewBoxRef={viewBoxRef}
        data={data}
        isFlashcardDraggable={isFlashcardDraggable}
        currIndex={currIndex}
      />
    ),
    Video: (
      <Video
        id={id}
        manager={manager}
        viewBoxRef={viewBoxRef}
        data={data}
        currIndex={currIndex}
      />
    ),
  };

  return viewboxTypes[componentName];
};

// for editing in rightsidebar
export const EditProperties = (
  id: string,
  manager: EditorialManagerInterface
) => {
  const componentName = getOriginalName(id);
  console.log(componentName);
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
    Slider: <></>,
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
