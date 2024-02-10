import {
  ComponentBaseDataInterface,
  QuestionInterface,
} from "components/interface";

interface ImageComponentDataInterface extends ComponentBaseDataInterface {
  url?: string;
}

interface ImageExtensions {
  type: "input";
  x: number;
  y: number;
  width: number;
  height: number;
  question?: QuestionInterface;
}

export const imageComponentData = (imageData: {
  url?: string;
  extensions?: ImageExtensions[];
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
      console.log(data, "data");
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
