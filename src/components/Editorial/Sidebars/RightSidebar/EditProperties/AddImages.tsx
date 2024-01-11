import { EditorialManagerInterface } from "components/Editorial/Base/EditorialManager";
import { setFlashCardComponentData } from "components/Editorial/ViewBox/Boxtypes/Flashcard/handlers/dataHandler";
import React, { FC, useEffect, useState } from "react";
import { RiAddCircleLine } from "react-icons/ri";

interface Props {
  id: string;
  manager: EditorialManagerInterface;
}

const AddImages: FC<Props> = ({ id, manager }) => {
  const [images, setImages] = useState<any[]>([{ url: "" }]);
  const coreData = manager.canvasManager.activeComponent.data.coreData;

  const handleAddImage = () => {
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
        <div
          className="w-full flex justify-between items-center py-2 text-[15px] text-[#4f46e5]"
          onClick={handleAddImage}
        >
          <p>Add image</p> <RiAddCircleLine />
        </div>
        {images.map((image: any, index) => (
          <div className="w-full py-2 text-[15px]">Image {index + 1}</div>
        ))}
      </main>
    </div>
  );
};

export default AddImages;
