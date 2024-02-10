import { ManagerInterface } from "components/Editorial/Base/Manager";
import { FC } from "react";

interface Props {
  manager: ManagerInterface;
  componentType: string;
}

const InputResize: FC<Props> = ({ manager, componentType }) => {
  const toggleImageSize =
    manager.canvasManager.activeComponent.functions?.toggleImageSize;

  const toggleVideoSize =
    manager.canvasManager.activeComponent.functions?.toggleVideoSize;

  const handleChangeSize = (e: any, styleType: string) => {
    if (componentType === "image") toggleImageSize(e.target.value, styleType);
    else toggleVideoSize(e.target.value, styleType);
  };

  return (
    <div className="w-full my-4">
      <div className="w-full flex gap-4">
        <div className="grid w-fit">
          <label className="text-[14px]">Width</label>
          <input
            className="w-[100%] border rounded p-1 text-[13px]"
            type="number"
            name="width"
            placeholder="280"
            onChange={(e) => handleChangeSize(e, "width")}
            defaultValue={280}
          />
        </div>
        <div className="grid w-fit">
          <label className="text-[14px]">Height</label>
          <input
            className="w-[100%] border rounded p-1 text-[13px]"
            type="number"
            name="height"
            placeholder="280"
            onChange={(e) => handleChangeSize(e, "height")}
            defaultValue={280}
          />
        </div>
      </div>
    </div>
  );
};

export default InputResize;
