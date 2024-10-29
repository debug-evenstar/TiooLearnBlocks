/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, useEffect, useState } from "react";
import { RiArrowDropDownFill, RiArrowDropUpFill } from "react-icons/ri";
import InputResize from "../InputResize";
import { ManagerInterface } from "apps/Editorial/Base/Manager";
import { Switch } from "@mui/material";
import { FaEllipsisH, FaImage } from "react-icons/fa";
import { handleSetOptionIndex } from "provider/feedbackSlice";
import { useSelector } from "react-redux";
import { OverlayActiveState } from "apps/Editorial/Base/StateInterface";

interface Props {
    manager: ManagerInterface;
}

const label = { inputProps: { "aria-label": "Switch Overlay" } };

const ImageProperties: FC<Props> = ({ manager }) => {
    const trigger = manager.states.trigger;

    const data: any[] = manager.canvasManager.activeComponent.data?.extensions;

    const [isActive, setIsActive] = useState(false);
    const [extensions, setExtensions] = useState<any[]>([]);

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const component = manager.canvasManager.activeComponent;
        manager.event.emit("imageChange", { id: component.data.id, event: e });
    };

    useEffect(() => {
        setExtensions(data);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [trigger]);

    return (
        <div className="w-full my-5 py-2">
            <div
                className={`w-full flex justify-between items-center cursor-pointer ${
                    isActive ? "bg-[#E6E6FA] p-2 rounded-sm" : ""
                }`}
                onClick={() => setIsActive(!isActive)}
            >
                <p className="text-[15px]">Image Properties</p>
                {isActive ? <RiArrowDropUpFill /> : <RiArrowDropDownFill />}
            </div>

            {isActive && (
                <main>
                    <div
                        className="w-full h-[40px] mt-2 flex justify-between items-center p-1 border-[1px] border-gray-100 rounded-[5px] cursor-pointer hover:bg-[#fafafa]"
                        onClick={() => {}}
                    >
                        <label className="text-[14px] pointer-events-none">
                            Change Image
                        </label>
                        <FaImage color="#c2c2c2" />
                        <input
                            className="w-full h-full absolute opacity-0"
                            type="file"
                            onChange={handleUpload}
                        />
                    </div>
                    <InputResize manager={manager} componentType="image" />
                </main>
            )}
        </div>
    );
};

export default ImageProperties;
