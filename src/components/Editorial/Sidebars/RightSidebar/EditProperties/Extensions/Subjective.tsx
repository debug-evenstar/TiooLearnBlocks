import { EditorialManagerInterface } from "components/Editorial/Base/EditorialManager";
import React, { FC, useState } from "react";

interface Props {
  manager: EditorialManagerInterface;
}

const Subjective: FC<Props> = () => {
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
