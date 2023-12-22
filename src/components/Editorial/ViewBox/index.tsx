import { FC, useState } from "react";
import { CanvasComponentViewBox } from "../interfaces";
import { Resizable } from "react-resizable";
import "react-resizable/css/styles.css";
import Image from "./Boxtypes/Image";
import Text from "./Boxtypes/Text";

const ViewBox: FC<CanvasComponentViewBox> = ({ id, handleDelete }) => {
  const [viewBoxSize, setViewBoxSize] = useState({
    width: 300,
    height: id.includes("Image") ? 200 : 120,
  });

  const onResize = (event: any, { node, size, handle }: any) => {
    setViewBoxSize({ width: size.width, height: size.height });

    console.log(size);
  };

  const height = id.includes("Image") ? 200 : 120;

  return (
    <Resizable
      width={viewBoxSize.width}
      height={viewBoxSize.height}
      minConstraints={[280, height]}
      onResize={onResize}
    >
      <div
        className="m-5 p-2 dasheds rounded"
        style={{
          width: viewBoxSize.width + "px",
          height: viewBoxSize.height + "px",
          maxHeight: "fit-content",
        }}
      >
        {id.includes("Text") && <Text id={id} handleDelete={handleDelete} />}

        {id.includes("Image") && <Image id={id} handleDelete={handleDelete} />}
      </div>
    </Resizable>
  );
};

export default ViewBox;
