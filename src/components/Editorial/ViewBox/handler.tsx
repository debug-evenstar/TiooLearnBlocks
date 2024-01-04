import { EditorialManagerInterface } from "../Base/EditorialManager";
import Image from "./Boxtypes/Image/Image";
import Text from "./Boxtypes/Text/Text";
import Background from "../../RightSidebar/EditProperties/Background";
import Delete from "../../RightSidebar/EditProperties/Delete";
import TextProperties from "../../RightSidebar/EditProperties/TextProperties";
import Video from "./Boxtypes/Video/Video";
import VideoProperties from "components/RightSidebar/EditProperties/VideoProperties";
import ImageProperties from "components/RightSidebar/EditProperties/ImageProperties";
import Extensions from "components/RightSidebar/EditProperties/Extensions";

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
  viewBoxRef: React.MutableRefObject<HTMLDivElement | null>
) => {
  const componentName = getOriginalName(id);
  console.log(componentName);

  const viewboxTypes: {
    [key: string]: JSX.Element;
  } = {
    Text: <Text id={id} manager={manager} viewBoxRef={viewBoxRef} />,
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
        <Extensions />
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

  return viewboxTypes[componentName];
};
