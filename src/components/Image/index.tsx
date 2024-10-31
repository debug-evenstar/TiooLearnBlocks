import { createRef, FC, useEffect, useRef, useState } from "react";
import { ImageComponentProps, renderInputsAsOverlay } from "./handler";
import {
    attachTextInputHandler,
    handleAnswerQuestion,
} from "components/Question/handler";

const ImageComponent: FC<ImageComponentProps> = ({ data, slide }) => {
    const [previewImage, setPreviewImage] = useState<boolean>(false);
    const [extensions, setExtensions] = useState<any[]>(data.extensions ?? []);
    const [inputs, setInputs] = useState<any[]>([]);
    const [fieldItems, setFieldItems] = useState<any[]>([]);
    const imageContainer: any = useRef();

    useEffect(() => {
        setInputs(() => [
            ...extensions.filter((ext: any) => ext.type === "InputOverlay"),
        ]);
    }, [extensions]);

    useEffect(() => {
        if (inputs.length) {
            renderInputsAsOverlay(inputs, slide, (fieldItems: any) => {
                setFieldItems(() => fieldItems);
            });
        }
        setTimeout(() => {
            attachTextInputHandler(
                imageContainer?.current,
                slide.slide,
                (data: any) => {
                    handleAnswerQuestion(data, {
                        parentType: "image",
                    });
                    slide.dispatch("answerQuestion", data);
                }
            );
        }, 1000);
    }, [inputs]);

    return (
        <>
            <div
                className={
                    "w-full h-auto sm:h-full mx-auto rounded-lg cursor-pointer relative image-render"
                }
                ref={imageContainer}
            >
                <img
                    src={data.url}
                    alt="images"
                    className={"w-full h-full rounded-lg"}
                    onClick={() =>
                        !inputs.length && setPreviewImage(!previewImage)
                    }
                />
                {fieldItems}
            </div>
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
