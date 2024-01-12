import { EditorialManagerInterface } from "components/Editorial/Base/EditorialManager";
import { setFlashCardComponentData } from "components/Editorial/ViewBox/Boxtypes/Flashcard/handlers/dataHandler";
import { UploadIconProps } from "components/Editorial/ViewBox/Boxtypes/Image/Image";
import React, { FC, useEffect, useState } from "react";
import { RiAddCircleLine } from "react-icons/ri";

interface Props {
  id: string;
  manager: EditorialManagerInterface;
}

const AddImages: FC<Props> = ({ id, manager }) => {
  const [images, setImages] = useState<any[]>([{ url: "" }]);
  const coreData = manager.sidebarManager.data.coreData;

  const [previewImage, setPreviewImage] = useState("");

  const handleAddImage = (e: any) => {
    e.preventDefault();
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setPreviewImage(imageUrl);
    }
    manager.canvasManager.canvas.functions.updateActiveComponentData(
      setFlashCardComponentData([
        {
          url: "",
          alternatives: [],
        },
      ])
    );
    console.log(coreData, "added");
  };

  useEffect(() => {
    const flashCardComponentData =
      manager.canvasManager.canvas.functions.getComponentData(id);
    flashCardComponentData && setImages(flashCardComponentData.cards);
  }, []);

  return (
    <div className="w-full my-5 py-2">
      <main>
        <UploadText handleUpload={handleAddImage} />
        {images.map((image: any, index) => (
          <div className="w-full py-2 text-[15px]">Image {index + 1}</div>
        ))}
      </main>
    </div>
  );
};

export default AddImages;

const UploadText: FC<any> = ({ handleUpload }) => {
  return (
    <div
      className="w-fit relative overflow-hidden cursor-pointer"
      onClick={handleUpload}
    >
      <div className="flex flex-col justify-center items-center h-full">
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="w-full h-full absolute top-0 -left-24 opacity-0 z-500"
        />
        <div className="w-full flex justify-between items-center py-2 text-[15px] text-[#4f46e5]">
          <p>Add image</p> <RiAddCircleLine />
        </div>
      </div>
    </div>
  );
};
