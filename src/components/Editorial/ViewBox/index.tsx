import { FC, useState } from "react";
import { CanvasComponentViewBox } from "../interfaces";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FiUploadCloud } from "react-icons/fi";
import { Resizable } from "react-resizable";
import "react-resizable/css/styles.css";

const ViewBox: FC<CanvasComponentViewBox> = ({ id, handleDelete }) => {
  const [viewBoxSize, setViewBoxSize] = useState({
    width: 300,
    height: id.includes("Image") ? 200 : 100,
  });

  const [previewImage, setPreviewImage] = useState(
    "https://res.cloudinary.com/dic7regoe/image/upload/v1694805252/praxeum/noimage_cu02fq.jpg"
  );

  const handleUpload = (e: any) => {
    e.preventDefault();
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setPreviewImage(imageUrl);
    }
  };

  const onResize = (event: any, { node, size, handle }: any) => {
    setViewBoxSize({ width: size.width, height: size.height });
    console.log(size);
  };

  return (
    <Resizable
      width={viewBoxSize.width}
      height={viewBoxSize.height}
      onResize={onResize}
    >
      <div
        className="m-5 p-5 draggable dasheds rounded"
        style={{
          width: viewBoxSize.width + "px",
          height: viewBoxSize.height + "px",
        }}
      >
        <div className="w-full flex justify-end gap-2">
          {id.includes("Image") && (
            <div className="w-6 relative overflow-hidden !cursor-pointer">
              <FiUploadCloud className="text-2xl cursor-pointer" />
              <input
                type="file"
                accept="image/*"
                onChange={handleUpload}
                className="absolute top-0 -left-24 opacity-0"
              />
            </div>
          )}

          <RiDeleteBin5Line
            className="text-2xl cursor-pointer"
            onClick={() => handleDelete(id)}
          />
        </div>

        {id.includes("Text") && (
          <input
            className="handle w-full outline-none cursor-move"
            type="text"
            placeholder="Add text"
          />
        )}

        {id.includes("Image") && (
          <div className="handle w-6/12 mx-auto my-6 rounded-[18px] overflow-hidden cursor-move">
            <img src={previewImage} alt="placeholder" className="w-full" />
          </div>
        )}
      </div>
    </Resizable>
  );
};

export default ViewBox;
