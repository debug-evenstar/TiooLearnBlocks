import React, { useState } from "react";

const Subjective = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="p-2 shadow-md">
      <div
        className="w-full flex justify-between items-center cursor-pointer"
        onClick={() => setIsActive(!isActive)}
      >
        <p className="text-[13px]">Set Subjective</p>
      </div>

      {isActive && <main>MAIN</main>}
    </div>
  );
};

export default Subjective;
