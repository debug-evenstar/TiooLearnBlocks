import { FC, useState } from "react";
import { ImageComponentProps } from "./handler";

const ImageComponent: FC<ImageComponentProps> = ({ data, slide }) => {
    const [previewImage, setPreviewImage] = useState<boolean>(false);
    return (
        <>
            <img
                src={data.url}
                alt="images"
                className={
                    slide.parent 
                        ? "w-[350px] mx-auto rounded-lg cursor-pointer"
                        : "w-[320px] mx-auto rounded-lg cursor-pointer"
                }
                onClick={() => setPreviewImage(!previewImage)}
            />
            {previewImage && (
                <div className="w-screen h-screen top-0 left-0 fixed z-10 flex justify-center items-center bg-[rgb(0,0,0,0.8)]">
                    <div
                        className="absolute top-[15px] right-[30px] text-[35px] text-white cursor-pointer comic"
                        onClick={() => setPreviewImage(!previewImage)}
                    >
                        X
                    </div>
                    <img className="h-4/6" src={data.url} alt="images" />
                </div>
            )}
        </>
    );
};

export default ImageComponent;
