/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { ManagerInterface } from "components/Editorial/Base/Manager";
import EmojiTextArea from "components/Editorial/ViewBox/Boxtypes/Text/EmojiTextArea";
import React, { FC, useState } from "react";
import { RiCloseLine } from "react-icons/ri";

interface Props {
  manager: ManagerInterface;
}

const Tips: FC<Props> = ({ manager }) => {
  const [isActive, setIsActive] = useState(false);
  const [input, setInput] = useState("");

  const addTooltip = manager.canvasManager.canvas.functions?.addTooltip;

  const handleAddToolTip = (input: string) => {
    addTooltip(input);
    setInput("");
    setIsActive(false);
  };

  const handleClose = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.stopPropagation();
    setIsActive(false);
  };

  const handleOnChange = (updatedMessage: string) => {
    setInput(updatedMessage);
  };

  return (
    <div
      className="p-2 text-[13px] shadow-md cursor-pointer"
      onClick={() => setIsActive(true)}
    >
      <p>Add a tip</p>

      {isActive && (
        <section className="border shadow-xl">
          <header className="flex justify-between border-b p-2">
            <p>Tip</p>
            <RiCloseLine onClick={handleClose} />
          </header>
          <div className="p-2">
            <EmojiTextArea value={input} onChange={handleOnChange} />
          </div>
          <div className="p-2">
            <a href="javascript:void(0)">
              <button
                className="w-full p-2 bg-[#4f46e5] text-white"
                onClick={() => handleAddToolTip(input)}
              >
                Save
              </button>
            </a>
          </div>
        </section>
      )}
    </div>
  );
};

export default Tips;
