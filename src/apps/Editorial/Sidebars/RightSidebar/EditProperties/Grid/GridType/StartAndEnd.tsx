import { ManagerInterface } from "apps/Editorial/Base/Manager";
import { FC, useState } from "react";

interface Props {
  manager: ManagerInterface;
}

const StartAndEnd: FC<Props> = ({ manager }) => {
  const data = manager.canvasManager.activeComponent.data;
  const [isActive, setIsActive] = useState(false);
  const [steps, setSteps] = useState<number>(data.steps);

  const handleToggleDropdown = () => {
    setIsActive(!isActive);
  };

  const handleSetSteps = () => {
    if (steps && steps < 1) return;
    data.steps = steps;
    setSteps(0);
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
            <p className="text-[11px]">Steps</p>
            <input
              className="mt-1 p-1 px-2 border border-gray-400 w-full rounded text-[11px]"
              type="number"
              value={steps}
              onChange={(e) => setSteps(+e.target.value)}
            />
          </div>
          <div className="w-full flex justify-end">
            <button
              onClick={handleSetSteps}
              className="w-[30%] bg-[#4f46e5] text-[12px] text-white rounded-xl px-1 py-0.5"
            >
              Save
            </button>
          </div>
        </main>
      )}
    </div>
  );
};

export default StartAndEnd;
