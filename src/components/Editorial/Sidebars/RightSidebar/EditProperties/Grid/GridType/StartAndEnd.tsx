import { useState } from "react";

const StartAndEnd = () => {
  const [isActive, setIsActive] = useState(false);

  const handleToggleDropdown = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="p-2 shadow-md">
      <div
        className="w-full flex justify-between items-center cursor-pointer"
        onClick={handleToggleDropdown}
      >
        <p className="text-[13px]">
          {isActive ? <b>Start and end</b> : "Start and end"}
        </p>
      </div>

      {isActive && (
        <main className="w-full p-2">
          <p className="text-[13px]">Specify number of steps</p>
          <div className="w-full my-2">
            <p className="text-[12px]">Steps</p>
            <input className="border border-black" type="text" />
          </div>
        </main>
      )}
    </div>
  );
};

export default StartAndEnd;
