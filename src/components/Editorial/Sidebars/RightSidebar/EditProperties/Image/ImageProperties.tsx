/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, useEffect, useState } from "react";
import { RiArrowDropDownFill, RiArrowDropUpFill } from "react-icons/ri";
import InputResize from "../InputResize";
import { ManagerInterface } from "components/Editorial/Base/Manager";
import { Switch } from "@mui/material";
import { FaEllipsisH } from "react-icons/fa";
import ImageObjective from "components/Editorial/Sidebars/RightSidebar/EditProperties/Image/Overlay/ImageObjective";
import ImageSubjective from "components/Editorial/Sidebars/RightSidebar/EditProperties/Image/Overlay/ImageSubjective";
import { handleSetOptionIndex } from "provider/feedbackSlice";
import { useSelector } from "react-redux";

interface Props {
  manager: ManagerInterface;
}

const label = { inputProps: { "aria-label": "Switch Overlay" } };

const ImageProperties: FC<Props> = ({ manager }) => {
  const trigger = manager.states.trigger;

  const toggleOverlay = manager.canvasManager.canvas.functions?.toggleOverlay;
  const data: any[] = manager.canvasManager.activeComponent.data?.extensions;

  const [isActive, setIsActive] = useState(false);
  const [extensions, setExtensions] = useState<any[]>([]);

  const overlayActive = manager.states.overlayActive;

  const handleSwitchOverlay = () => {
    toggleOverlay();
  };

  useEffect(() => {
    setExtensions(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  return (
    <div className="w-full my-5 py-2">
      <div
        className={`w-full flex justify-between items-center cursor-pointer ${
          isActive ? "bg-[#E6E6FA] p-2 rounded-sm" : ""
        }`}
        onClick={() => setIsActive(!isActive)}
      >
        <p className="text-[15px]">Image Properties</p>
        {isActive ? <RiArrowDropUpFill /> : <RiArrowDropDownFill />}
      </div>

      {isActive && (
        <main>
          <div className="flex justify-between items-center my-4">
            <p className="text-[14px]">Overlay</p>
            <a href="javascript:void(0)">
              <Switch {...label} onChange={handleSwitchOverlay} />
            </a>
          </div>

          <section>
            {extensions &&
              extensions.length > 0 &&
              extensions.map((input, i) => (
                <main key={i} className="relative">
                  <ImageInputs manager={manager} index={i} input={input} />
                </main>
              ))}
          </section>
          <InputResize manager={manager} componentType="image" />
        </main>
      )}
    </div>
  );
};

export default ImageProperties;

interface ImageInputsProps {
  manager: ManagerInterface;
  index: number;
  input: any;
}

const ImageInputs: FC<ImageInputsProps> = ({ manager, index, input }) => {
  const [toggleQuestions, setToggleQuestions] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center my-2">
        <p className="text-[14px]">Input {index + 1}</p>
        <FaEllipsisH
          className="cursor-pointer"
          onClick={() => setToggleQuestions(!toggleQuestions)}
        />
      </div>
      {toggleQuestions && (
        <div className="h-fit bg-white">
          <div className="tiooBoxShadow p-2">
            {!input?.question[0] || input?.question[0]?.type === "OBJECTIVE" ? (
              <ImageObjective manager={manager} index={index} data={input} />
            ) : (
              <></>
            )}

            {!input?.question[0] ||
            input?.question[0]?.type === "SUBJECTIVE" ? (
              <ImageSubjective manager={manager} index={index} data={input} />
            ) : (
              <></>
            )}
          </div>
        </div>
      )}
    </>
  );
};
