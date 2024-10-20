import { FC, useEffect, useState } from "react";
import { ImageComponentProps, renderInputsAsOverlay } from "./handler";

const ImageComponent: FC<ImageComponentProps> = ({ data, slide }) => {
    const [previewImage, setPreviewImage] = useState<boolean>(false);
    const [extensions, setExtensions] = useState<any[]>(data.extensions ?? []);
    const [inputs , setInputs] = useState<any[]>([]);
    const [fieldItems, setFieldItems] = useState<any[]>([]);

    useEffect(()=>{
        setInputs(() => extensions.filter((ext : any) => ext.type === "input"));
    },[extensions]);
    
    useEffect(()=>{
        if(inputs.length) {
            renderInputsAsOverlay(inputs, slide, (fieldItems : any)=>{
                setFieldItems(() => fieldItems);
            }); 
        }
    },[inputs]);

    return (
        <>
            <div
                className={ "w-full h-auto sm:h-full mx-auto rounded-lg cursor-pointer relative"}
            >
                <img
                    src={data.url}
                    alt="images"
                    className={ "w-full h-full rounded-lg"}
                    onClick={() => setPreviewImage(!previewImage)}
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
