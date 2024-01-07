/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { EditorialManagerInterface } from "components/Editorial/Base/EditorialManager";
import React, { FC, useState } from "react";
import { RiCloseLine } from "react-icons/ri";

interface Props {
  manager: EditorialManagerInterface;
}

const Tips: FC<Props> = ({ manager }) => {
  const [isActive, setIsActive] = useState(false);
  const [input, setInput] = useState("");

  const addTooltip =
    manager.canvasManager.activeComponent.functions?.addTooltip;

  const handleAddToolTip = (input: string) => {
    addTooltip(input);
    setInput("");
    setIsActive(false);
  };

  const handleClose = () => {
    setIsActive(!isActive);
    alert("closed");
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
            <textarea
              className="border h-20 w-full p-2"
              placeholder="Add tooltip"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
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
