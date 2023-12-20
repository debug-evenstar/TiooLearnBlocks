import { FC, useState } from "react";
import { CanvasComponentViewBox } from "../interfaces";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FiUploadCloud } from "react-icons/fi";

const ViewBox: FC<CanvasComponentViewBox> = ({ id, handleDelete }) => {
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

  return (
    <div className=" m-5 p-5 draggable dasheds rounded">
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
          className="w-full outline-none"
          type="text"
          placeholder="Add text"
        />
      )}

      {id.includes("Image") && (
        <div className="w-6/12 mx-auto my-6 rounded-[18px] overflow-hidden">
          <img src={previewImage} alt="placeholder" className="w-full" />
        </div>
      )}
    </div>
  );
};

export default ViewBox;
