import { padding } from "@mui/system";
import React, { useEffect, useImperativeHandle, useState } from "react";

interface ContentInputProps {
    className?: string;
    placeholder?: string;
    ref : any
}

const ContentInput: React.FC<ContentInputProps> = React.forwardRef(({
    className = "",
    placeholder = "",
}, ref) => {
    const [value, setValue] = useState<string>("");
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const valueIsEmpty = () => value == "";
    const defaultContainerStyle: any = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
        cursor : "text",
        paddingTop : "4px"
    };
    const editableContentStyle: any = {
        outline: "0px solid transparent",
    };
    const handleInput = (event: any) => {
        setValue(event.target.innerHTML);
    };

    const handleClickOutside = () => {
        setIsEditing(true);
        function handleListener (event : any) {
            let parent : HTMLElement | null = (event?.target as HTMLElement);
            let isInput = false;
            do{
                const elementClass : string = parent?.className ?? "";
                if ( (typeof elementClass  == "string") && elementClass.includes('content-input') ) {
                    isInput = true;
                    break;
                }
            }
            while( parent = parent.parentElement);
            if ( !isInput ) {
                setIsEditing(false);
            }
            document.body.removeEventListener("click",handleListener, true);
        }
        document.body.addEventListener("click", handleListener);
    }

    useImperativeHandle(ref, () => ({
        value
    }));

    return (
        <div className={className} style={defaultContainerStyle}>
            <div
                className="content-input w-full h-full whitespace-nowrap overflow-x-scroll hide-scroll"
                style={editableContentStyle}
                contentEditable={true}
                onInput={handleInput}
                onClick={handleClickOutside}
            ></div>
            {placeholder && !isEditing && valueIsEmpty() && (
                <p className="h-fit mt-auto mb-auto text-[#a9a9a9] absolute left-1">
                    {placeholder}
                </p>
            )}
        </div>
    );
});

export default ContentInput;
