import { padding } from "@mui/system";
import React, {
    createRef,
    KeyboardEventHandler,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from "react";

interface ContentInputProps {
    className?: string;
    placeholder?: string;
    disabled?: boolean;
    onChange?: Function;
    content?: any;
    ref: any;
    onKeyDown?: KeyboardEventHandler;
}

const ContentInput: React.FC<ContentInputProps> = React.forwardRef(
    (
        {
            className = "",
            placeholder = "",
            disabled = false,
            content = "",
            onChange,
            onKeyDown,
        },
        ref
    ) => {
        const [value, setValue] = useState<string>("");
        const [isEditing, setIsEditing] = useState<boolean>(false);
        const valueIsEmpty = () => value === "";
        const containerRef = createRef<any>();
        const defaultContainerStyle: any = {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            position: "relative",
            cursor: disabled ? "default" : "text",
            paddingTop: "4px",
        };
        const editableContentStyle: any = {
            outline: "0px solid transparent",
        };
        const handleInput = (event: any) => {
            setValue(event.target.innerHTML);
            onChange && onChange(event.target.innerHTML);
        };

        const handleClickOutside = () => {
            function handleListener(event: any) {
                let parent: HTMLElement | null = event?.target as HTMLElement;
                let isInput = false;
                do {
                    const elementClass: string = parent?.className ?? "";
                    if (
                        typeof elementClass === "string" &&
                        elementClass.includes("content-input")
                    ) {
                        isInput = true;
                        break;
                    }
                } while ((parent = parent.parentElement));
                if (!isInput) {
                    setIsEditing(false);
                }
                document.body.removeEventListener(
                    "click",
                    handleListener,
                    true
                );
            }
            if (!disabled) {
                setIsEditing(true);
                document.body.addEventListener("click", handleListener);
            }
        };

        const updateValue = (newValue: string, isMath = false) => {
            let valueToUpdate = "";
            let currentValue = containerRef.current.innerHTML;
            if (containerRef?.current) {
                valueToUpdate = isMath
                    ? currentValue +
                      `<span contenteditable="false">${newValue}</span>`
                    : currentValue + newValue;
                containerRef.current.innerHTML = valueToUpdate;
            }
            setValue(valueToUpdate);
            onChange && onChange(valueToUpdate);
        };

        useEffect(() => {
            content && setValue(content);
        }, [content]);

        useImperativeHandle(ref, () => ({
            ...(containerRef ?? {}),
            updateValue,
            value,
        }));

        useEffect(() => {
            if (!disabled) {
                setIsEditing(true);
            }
        }, [disabled]);

        return (
            <div
                className={
                    className + `${disabled && " bg-gray-100 cursor-default"}`
                }
                style={defaultContainerStyle}
            >
                <div
                    className={`content-input w-full h-full whitespace-nowrap overflow-x-scroll hide-scroll`}
                    style={editableContentStyle}
                    ref={containerRef}
                    contentEditable={!disabled}
                    onInput={handleInput}
                    onClick={handleClickOutside}
                    dangerouslySetInnerHTML={{ __html: content ?? "" }}
                    onKeyDown={onKeyDown}
                ></div>
                {placeholder && !isEditing && valueIsEmpty() && (
                    <p className="h-fit mt-auto mb-auto text-[#a9a9a9] absolute left-1 cursor-text">
                        {placeholder}
                    </p>
                )}
            </div>
        );
    }
);

export default ContentInput;
