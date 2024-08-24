import { useState } from "react";

const SecondType = () => {
  const [isActive, setIsActive] = useState(false);
  return (
    <div className="p-2 shadow-md">
      <div className="w-full flex justify-between items-center cursor-pointer">
        <p className="text-[13px]">
          {isActive ? <b>Second type</b> : "Second type"}
        </p>
      </div>
    </div>
  );
};

export default SecondType;
