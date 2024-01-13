/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, useState } from "react";
import { RiArrowDropDownFill, RiArrowDropUpFill } from "react-icons/ri";
import InputResize from "./InputResize";
import { EditorialManagerInterface } from "components/Editorial/Base/EditorialManager";
import { Switch } from "@mui/material";
import { MdMore, MdOutlineRecommend } from "react-icons/md";
import { FaEllipsisH } from "react-icons/fa";
import Objective from "./Extensions/Objective";
import ImageObjective from "components/Editorial/ViewBox/Boxtypes/Image/ImageObjective";
import ImageSubjective from "components/Editorial/ViewBox/Boxtypes/Image/ImageSubjective";

interface Props {
  manager: EditorialManagerInterface;
}

const label = { inputProps: { "aria-label": "Switch Overlay" } };

const ImageProperties: FC<Props> = ({ manager }) => {
  const toggleOverlay =
    manager.canvasManager.activeComponent.functions?.toggleOverlay;
  const extensions: any[] =
    manager.canvasManager.activeComponent.data.coreData?.extensions;

  const [isActive, setIsActive] = useState(false);
  const [overlayActive, setOverlayActive] = useState(true);
  const [toggleQuestions, setToggleQuestions] = useState(false);

  const handleSwitchOverlay = () => {
    setOverlayActive(!overlayActive);
    toggleOverlay(overlayActive);
  };

  return (
    <div className="w-full my-5 py-2">
      <div
        className="w-full flex justify-between items-center cursor-pointer"
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
                  <div className="flex justify-between items-center my-2">
                    <p className="text-[14px]">Input {i + 1}</p>
                    <FaEllipsisH
                      className="cursor-pointer"
                      onClick={() => setToggleQuestions(!toggleQuestions)}
                    />
                  </div>
                  {toggleQuestions && (
                    <div className="flex justify-end absolute right-0 bg-white">
                      <div className="tiooBoxShadow p-2">
                        <ImageObjective
                          manager={manager}
                          index={i}
                          data={input}
                        />
                        <ImageSubjective
                          manager={manager}
                          index={i}
                          data={input}
                        />
                      </div>
                    </div>
                  )}
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
