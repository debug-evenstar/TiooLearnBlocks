import { _getManager, setComponentLayout } from "apps/Editorial/Base/Manager";
import {
    ComponentBaseDataInterface,
    ComponentLayoutInterface,
    QuestionInterface,
} from "components/interface";

interface ImageComponentDataInterface extends ComponentBaseDataInterface {
    url?: string;
}

export enum ImageExtensionTypes {
    InputOverlay = "InputOverlay",
}
export interface ImageExtension {
    type: ImageExtensionTypes;
    layout?: ComponentLayoutInterface;
    data: any;
}

export const imageComponentData = (imageData: {
    url?: string;
    extensions?: ImageExtension[];
}) => {
    const data: ImageComponentDataInterface = {
        component: "Image",
        ...(imageData.url ? { url: imageData.url } : {}),
        ...(imageData.extensions ? { extensions: imageData.extensions } : {}),
        theme: "white",
    };
    return data;
};

export const uploadFile = async (lessonId: number, file: File) => {
    // Use File instead of FileList
    try {
        const formData = new FormData();
        formData.append("image", file);

        const response = await fetch(
            `https://beta.api.hellotioo.com/open/lesson/templateimage/${lessonId}`,
            {
                method: "PUT",
                body: formData,
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (!data.error) {
            const url = data.data[0];
            return url;
        } else {
            console.error("Upload failed:", data.error);
        }
    } catch (error) {
        console.error("Upload error:", error);
    }
};

// Color Validation Functions

export const toggleWrapperSize = (
    element: HTMLDivElement,
    style: string,
    styleType: string
) => {
    if (styleType === "height") {
        element.style.height = style + "px";
    } else element.style.width = style + "px";
};

// Handle extension Drop into Image component
export const handleDropIntoImage = (e: any, extensions : ImageExtension[]) => {
    const manager = _getManager();
    const data = JSON.parse(e.dataTransfer.getData("text/plain"));
    if (data.type === "question.input") {
        manager.event.emit("linkQuestionInput", {
            questionHash: data.question.hash,
            hash: data.input.hash,
        });
        const newInputExtension: ImageExtension = {
            type: ImageExtensionTypes.InputOverlay,
            layout: setComponentLayout(
                manager.canvasManager.canvas.getCanvasSize(),
                { size: { width: 50, height: 30 } }
            ),
            data: {
                hash: data.input.hash,
                questionHash: data.question.hash,
                questionType : data.question.type
            },
        };
        extensions = [...extensions, newInputExtension];
        manager.canvasManager.canvas.updateActiveComponentData(
            imageComponentData({ extensions })
        );
        return extensions;
    }
    return [];
};
