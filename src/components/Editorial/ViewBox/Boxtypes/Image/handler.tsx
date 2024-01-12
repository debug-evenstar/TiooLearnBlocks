import axios from "axios";
import { ComponentBaseDataInterface } from "components/interface";

interface ImageComponentDataInterface extends ComponentBaseDataInterface {
  url?: string;
}

export const setImageComponentData = (imageData : {
  url? : string;
  extensions? : any[]
}) => {
  const data: ImageComponentDataInterface = {
    component: "Image",
    ...(imageData.url ? {url : imageData.url} : {}),
    ...(imageData.extensions ? {extensions : imageData.extensions} : {}),
    theme: "white",
  };
  return data;
};

export const uploadFile = async (lessonId: number, file: File) => {
  // Use File instead of FileList
  try {
    const formData = new FormData();
    formData.append("image", file);

    const response = await axios.put(
      `https://beta.api.hellotioo.com/open/lesson/templateimage/${lessonId}`,
      formData
    );

    if (response.data && !response.data.error) {
      const url = response.data.data[0];
      console.log(response.data, "data");
      return url;
    } else {
      console.error("Upload failed:", response.data.error);
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
