import { EditorialManagerInterface } from "../Base/EditorialManager";
import Image from "./Boxtypes/Image/Image";
import Text from "./Boxtypes/Text/Text";
import Background from "../Sidebars/RightSidebar/EditProperties/Background";
import Delete from "../Sidebars/RightSidebar/EditProperties/Delete";
import Extensions from "../Sidebars/RightSidebar/EditProperties/Extensions";
import TextProperties from "../Sidebars/RightSidebar/EditProperties/TextProperties";
import Video from "./Boxtypes/Video/Video";
import VideoProperties from "components/Editorial/Sidebars/RightSidebar/EditProperties/VideoProperties";
import ImageProperties from "components/Editorial/Sidebars/RightSidebar/EditProperties/ImageProperties";

export function getOriginalName(str: string): string {
  const indexOfClone = str.indexOf("-clone-");

  if (indexOfClone !== -1) {
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
  const viewboxTypes: {
    [key: string]: JSX.Element;
  } = {
    Text: (
      <>
        <TextProperties manager={manager} />
        <Background manager={manager} />
        <Extensions manager={manager} />
        <Delete id={id} />
      </>
    ),
    Image: (
      <>
        <ImageProperties manager={manager} />
        <Delete id={id} />
      </>
    ),
    Video: (
      <>
        <VideoProperties manager={manager} />
        <Delete id={id} />
      </>
    ),
  };
  console.log(componentName);
  return viewboxTypes[componentName];
};
