import { EditorialManagerInterface } from "../Base/EditorialManager";
import Image from "./Boxtypes/Image/Image";
import Text from "./Boxtypes/Text/Text";
import Background from "../../RightSidebar/EditProperties/Background";
import Delete from "../../RightSidebar/EditProperties/Delete";
import Extensions from "../../RightSidebar/EditProperties/Extensions";
import TextProperties from "../../RightSidebar/EditProperties/TextProperties";
import Video from "./Boxtypes/Video/Video";

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
    Image: <Image id={id} />,
    Video: <Video id={id} />,
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
        <Delete id={id} />
      </>
    ),
    Video: (
      <>
        <Delete id={id} />
      </>
    ),
  };

  return viewboxTypes[componentName];
};
