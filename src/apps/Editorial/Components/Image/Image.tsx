import {
    ManagerInterface,
    setComponentLayout,
} from "apps/Editorial/Base/Manager";
import { CanvasMedia } from "apps/Editorial/interfaces";
import React, { FC, createRef, useEffect, useRef, useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import {
    handleDropIntoImage,
    imageComponentData,
    ImageExtension,
    toggleWrapperSize,
    uploadFile,
} from "./handler";
import "react-resizable/css/styles.css";
import MovableResizer from "../MovableResizer";

const Image: FC<CanvasMedia> = ({ id, manager, viewBoxRef }) => {
    const activeId = manager.states.activeViewBox;

    const [previewImage, setPreviewImage] = useState("");
    const [data, setData] = useState<any>();
    const [inputList, setInputList] = useState<ImageExtension[]>([]);
    const [inputBoxDimensions, setInputBoxDimensions] = useState<any[]>([]);
    const imageRef = useRef<HTMLImageElement>(null);
    const [isDraggedOver, setIsDraggedOver] = useState<boolean>(false);
    const imageContainer: React.RefObject<HTMLDivElement> = createRef();

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (!e.target.files) return;
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const imageUrl = URL.createObjectURL(selectedFile);
            setPreviewImage(imageUrl);
            const url = await uploadFile(473, selectedFile);
            setPreviewImage(url);
            manager.canvasManager.canvas.updateActiveComponentData(
                imageComponentData({ url })
            );
        }
    };

    const handleImageDrop = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        const files: any = Array.from(e.dataTransfer.files);
        handleUpload(files);
    };

    const handleUpload = async (files: FileList) => {
        const file = files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreviewImage(imageUrl);
            const url = await uploadFile(473, file);
            setPreviewImage(url);
            manager.canvasManager.canvas.functions.updateActiveComponentData(
                imageComponentData(url)
            );
        }
    };

    useEffect(() => {
        manager.canvasManager.canvas.functions["toggleImageSize"] = (
            style: string = "",
            styleType: string
        ) => {
            const element = viewBoxRef.current;
            if (!element) return;
            toggleWrapperSize(element, style, styleType);
        };

        manager.canvasManager.canvas.functions["toggleOverlay"] = () => {
            manager.setState("overlayActive", (prev: any) => !prev);
        };
    }, [manager, viewBoxRef]);

    useEffect(() => {
        const imageComponentData =
            manager.canvasManager.canvas.functions.getComponentData(id);
        imageComponentData && setData(imageComponentData);
        setPreviewImage(imageComponentData.url);
        manager.event.listen("imageChange", (data: any) => {
            data.id == id && handleChange(data.event);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        setInputList(data.extensions);
    }, [data]);

    const updateLayout = (data: any, hash: string) => {
        const ext = inputList.find((i: any) => i.data.hash == hash);
        const layout = setComponentLayout(
            {
                width: imageContainer?.current?.clientWidth as number,
                height: imageContainer?.current?.clientHeight as number,
            },
            {
                size: {
                    width: data.width ?? ext?.layout?.size?.width ?? 0,
                    height: data.height ?? ext?.layout?.size?.height ?? 0,
                },
                position: {
                    xAxis: {
                        offset:
                            data.position?.x ??
                            ext?.layout?.position?.xAxis.offset ??
                            0,
                    },
                    yAxis: {
                        offset:
                            data.position?.y ??
                            ext?.layout?.position?.yAxis.offset ??
                            0,
                    },
                },
            }
        );
        const extensions = inputList.map((i: any) =>
            i.data.hash == hash ? { ...i, layout } : i
        );
        setInputList([...extensions]);
        manager.canvasManager.canvas.functions.updateActiveComponentData(
            imageComponentData({ extensions })
        );
    };

    const handleDragOver = (event: any, status: boolean) => {
        setIsDraggedOver(status);
    };

    const handleDrop = (e: any) => {
        const updatedExtensions = handleDropIntoImage(e, inputList);
        setInputList(updatedExtensions);
        setIsDraggedOver(false);
    };

    const loadPosition = (extension: ImageExtension) => {
        if (extension.layout && extension.layout.position) {
            return {
                x: extension.layout.position.xAxis.offset,
                y: extension.layout.position.yAxis.offset,
            };
        }
        return { x: 0, y: 0 };
    };

    return (
        <>
            <div
                id={id}
                className={`relative flex flex-col h-full w-full p-3 cursor-move justify-center items-center handle`}
                ref={imageContainer}
            >
                {!previewImage && (
                    <UploadIcon
                        handleChange={handleChange}
                        handleDrop={handleImageDrop}
                        isLinking={isDraggedOver}
                        manager={manager}
                    />
                )}

                {previewImage?.length > 1 && (
                    <div
                        className="w-full mx-auto my-6 rounded-lg overflow-hidden h-full absolute"
                        onClick={() => null}
                        onDragEnter={(e) => handleDragOver(e, true)}
                        onDragLeave={(e) => handleDragOver(e, false)}
                        onDrop={handleDrop}
                    >
                        <img
                            ref={imageRef}
                            src={previewImage}
                            alt="placeholder"
                            className="w-full h-full"
                            draggable={false}
                        />
                    </div>
                )}
                {isDraggedOver && (
                    <div className="w-full h-full border-[1px] border-gray-400 absolute z-10 -top-[0.5px] -left-[0.5px] rounded-[5px] flex justify-center items-center pointer-events-none">
                        <div className="bg-gray-100 opacity-[95%] w-full h-full rounded-[5px] absolute"></div>
                        <div className="text-[13px] text-gray-500 bg-gray-300 relative p-[5px] border-[1px] border-gray-200">
                            Link to Image
                        </div>
                    </div>
                )}
            </div>
            <div
                className="w-full h-full absolute top-0 left-0"
                onDragEnter={(e) => handleDragOver(e, true)}
                onDragLeave={(e) => handleDragOver(e, false)}
                onDrop={handleDrop}
            >
                {inputList.map((input: ImageExtension, index: number) => (
                    <MovableResizer
                        key={"Ext" + index}
                        draggableAxis="both"
                        layout={input.layout}
                        updateLayout={(data: any) =>
                            updateLayout(data, input.data.hash)
                        }
                        position={loadPosition(input)}
                    >
                        <input className="relative z-[51] bg-white text-[14px] border-[2px] border-[#E5E5E5] rounded-[10px] p-[5px] shadow-md" />
                    </MovableResizer>
                ))}
            </div>
        </>
    );
};

export default Image;

export interface UploadIconProps {
    handleChange: (e: any) => void;
    handleDrop: (e: any) => void;
    isLinking?: boolean;
    manager: ManagerInterface;
}

export const UploadIcon: FC<UploadIconProps> = ({
    handleChange,
    handleDrop,
    isLinking,
    manager,
}) => {
    const handleDragOver = (e: any) => {
        e.preventDefault();
        // Set the drop effect and effect allowed properties
        e.dataTransfer.dropEffect = "move";
        e.dataTransfer.effectAllowed = "move";
    };

    return (
        <div
            className={`w-fit relative overflow-hidden cursor-pointer dropzone ${
                isLinking && "pointer-events-none"
            }`}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            <div className="flex flex-col justify-center items-center h-full">
                <FiUploadCloud className="text-2xl cursor-pointer" />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                    className="w-full h-full absolute top-0 -left-24 opacity-0 z-50"
                />
                <p className="text-center text-[12px] mt-3">
                    Drag or upload from your computer
                </p>
                <p className="text-center text-[13px] text-[#4f46e5] font-bold">
                    Choose file
                </p>
            </div>
        </div>
    );
};
