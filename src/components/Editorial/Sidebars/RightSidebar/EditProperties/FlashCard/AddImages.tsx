import { EditorialManagerInterface } from "components/Editorial/Base/EditorialManager";
import { setFlashCardComponentData } from "components/Editorial/ViewBox/Boxtypes/Flashcard/handlers/dataHandler";
import { uploadFile } from "components/Editorial/ViewBox/Boxtypes/Image/handler";
import React, { FC, useEffect, useRef, useState } from "react";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { RiAddCircleLine } from "react-icons/ri";
import FlashcardObjective from "./FlashcardObjective";
import FlashcardSubjective from "./FlashcardSubjective";
import { useDispatch, useSelector } from "react-redux";
import { handleToggleTrigger } from "provider/triggerSlice";
import { QuestionInterface } from "components/interface";

interface Props {
  id: string;
  manager: EditorialManagerInterface;
}

const AddImages: FC<Props> = ({ id, manager }) => {
  const dispatch = useDispatch();
  const selector: any = useSelector(handleToggleTrigger);
  const trigger: boolean = selector.payload.trigger.value;
  const [images, setImages] = useState<any[]>([{ url: "" }]);
  const coreData = manager.sidebarManager.data.coreData;

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
      dispatch(handleToggleTrigger());
      console.log(cards, "Updated Cards");
      console.log(coreData, "added");
    }
  };

  useEffect(() => {
    const flashCardComponentData =
      manager.canvasManager.canvas.functions.getComponentData(id);
    flashCardComponentData && setImages(flashCardComponentData.cards);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  return (
    <div className="w-full my-5 py-2">
      <UploadText handleUpload={handleAddImage} />
      {images.map((image: any, index) => (
        <FlashcardImage key={index} index={index} manager={manager} />
      ))}
    </div>
  );
};

export default AddImages;

interface FlashcardImageProps {
  index: number;
  manager: EditorialManagerInterface;
}

const FlashcardImage: FC<FlashcardImageProps> = ({ index, manager }) => {
  const [isActive, setIsActive] = useState(false);

  const cardsIndex = manager.canvasManager.activeComponent.data.index;
  const question: QuestionInterface =
    manager.canvasManager.activeComponent.data.components[cardsIndex].cards[
      index
    ].question;

  return (
    <div>
      <div
        className="w-full flex justify-between items-center py-2 text-[14px] cursor-pointer"
        onClick={() => setIsActive(!isActive)}
      >
        <p>Image {index + 1}</p>
        {isActive ? <MdArrowDropUp /> : <MdArrowDropDown />}
      </div>
      {isActive && (
        <main>
          {!question || question?.type === "OBJECTIVE" ? (
            <FlashcardObjective
              index={index}
              manager={manager}
              data={{
                content: "",
              }}
            />
          ) : (
            <></>
          )}

          {!question || question?.type === "SUBJECTIVE" ? (
            <FlashcardSubjective
              index={index}
              manager={manager}
              data={{
                content: "",
              }}
            />
          ) : (
            <></>
          )}
        </main>
      )}
    </div>
  );
};

const UploadText: FC<any> = ({ handleUpload }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  return (
    <div
      className="w-full relative overflow-hidden cursor-pointer"
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
        <div className="w-full flex justify-between items-center py-2 text-[14px] text-[#4f46e5] font-medium">
          <p>Add image</p>
          <RiAddCircleLine />
        </div>
      </div>
    </div>
  );
};
