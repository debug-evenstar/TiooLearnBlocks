import React, { useState } from "react";

const Theme = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="p-2 shadow-md">
      <div
        className="w-full flex justify-between items-center cursor-pointer"
        onClick={() => setIsActive(!isActive)}
      >
        <p className="text-[13px]">{isActive ? <b>Theme 1</b> : "Theme 1"}</p>
      </div>

      {isActive && <main className="w-full p-2"></main>}
    </div>
  );
};

export default Theme;
