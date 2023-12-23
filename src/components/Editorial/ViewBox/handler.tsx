import Image from "./Boxtypes/Image";
import Text from "./Boxtypes/Text";
import Background from "./RightSidebar/EditProperties/Background";
import Delete from "./RightSidebar/EditProperties/Delete";
import Extensions from "./RightSidebar/EditProperties/Extensions";
import TextProperties from "./RightSidebar/EditProperties/TextProperties";

export function getOriginalName(str: string): string {
  const indexOfClone = str.indexOf("-clone-");

  if (indexOfClone !== -1) {
    return str.substring(0, indexOfClone);
  } else {
    return str;
  }
}

export const ViewBoxContent = (
  id: string,
  viewBoxRef: React.MutableRefObject<HTMLDivElement | null>
) => {
  const componentName = getOriginalName(id);

  const viewboxTypes: {
    [key: string]: JSX.Element;
  } = {
    Text: <Text id={id} viewBoxRef={viewBoxRef} />,
    Image: <Image id={id} />,
  };

  return viewboxTypes[componentName];
};

export const EditProperties = (id: string) => {
  const componentName = getOriginalName(id);

  const viewboxTypes: {
    [key: string]: JSX.Element;
  } = {
    Text: (
      <>
        <TextProperties />
        <Background />
        <Extensions />
        <Delete id={id} />
      </>
    ),
    Image: (
      <>
        <Background />
        <Extensions />
        <Delete id={id} />
      </>
    ),
  };

  return viewboxTypes[componentName];
};
