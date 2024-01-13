import { EditorialManagerInterface } from "components/Editorial/Base/EditorialManager";
import { setFlashCardComponentData } from "components/Editorial/ViewBox/Boxtypes/Flashcard/handlers/dataHandler";
import { UploadIconProps } from "components/Editorial/ViewBox/Boxtypes/Image/Image";
import { uploadFile } from "components/Editorial/ViewBox/Boxtypes/Image/handler";
import React, { FC, useEffect, useRef, useState } from "react";
import { RiAddCircleLine } from "react-icons/ri";

interface Props {
  id: string;
  manager: EditorialManagerInterface;
}

const AddImages: FC<Props> = ({ id, manager }) => {
  const [images, setImages] = useState<any[]>([{ url: "" }]);
  const coreData = manager.sidebarManager.data.coreData;

  const [previewImage, setPreviewImage] = useState("");

  const handleAddImageFormer = (e: any) => {
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

  const handleAddImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const cards =
      manager.canvasManager.canvas.functions.getComponentData(id).cards;
    console.log(cards, "Cards");

    if (!e.target.files) return;
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const url = await uploadFile(473, selectedFile);
      console.log(url, "url");

      manager.canvasManager.canvas.functions.updateActiveComponentData(
        setFlashCardComponentData([...cards, { url, alternatives: [] }])
      );
      console.log(cards, "Updated Cards");
      console.log(coreData, "added");
    }
  };

  useEffect(() => {
    const flashCardComponentData =
      manager.canvasManager.canvas.functions.getComponentData(id);
    flashCardComponentData && setImages(flashCardComponentData.cards);
  }, []);

  return (
    <div className="w-full my-5 py-2">
      <UploadText handleUpload={handleAddImage} />
      {images.map((image: any, index) => (
        <div className="w-full py-2 text-[15px]">Image {index + 1}</div>
      ))}
    </div>
  );
};

export default AddImages;

const UploadText: FC<any> = ({ handleUpload }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  return (
    <div
      className="w-fit relative overflow-hidden cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex flex-col justify-center items-center h-full">
        <input
          ref={inputRef}
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
