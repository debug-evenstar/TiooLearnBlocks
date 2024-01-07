import React, { FC, useState } from "react";
import { RiArrowDropDownFill, RiArrowDropUpFill } from "react-icons/ri";
import InputResize from "./InputResize";
import { EditorialManagerInterface } from "components/Editorial/Base/EditorialManager";
import { BsToggle2Off } from "react-icons/bs";
import { Switch } from "@mui/material";

interface Props {
  manager: EditorialManagerInterface;
}

const label = { inputProps: { "aria-label": "Switch Overlay" } };

const ImageProperties: FC<Props> = ({ manager }) => {
  const toggleOverlay =
    manager.canvasManager.activeComponent.functions?.toggleOverlay;

  const [isActive, setIsActive] = useState(false);
  const [overlayActive, setOverlayActive] = useState(true);

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
          <InputResize manager={manager} componentType="image" />
        </main>
      )}
    </div>
  );
};

export default ImageProperties;
