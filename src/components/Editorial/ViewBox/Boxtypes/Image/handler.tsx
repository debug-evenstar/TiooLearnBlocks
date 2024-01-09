import { ComponentBaseDataInterface} from "components/Editorial/Base/EditorialManager";

interface ImageComponentDataInterface extends ComponentBaseDataInterface{
    url : string;
}

export const setImageComponentData = (
    url : string = "",
) => {
    const data : ImageComponentDataInterface = {
        component :  "Image",
        url,
        theme : "white",
    }
    return data;
}


export const uploadFile = (lessonId : number, file : FileList) => {
    // Returns a url
    //   const formData = new FormData();
    //   formData.append(file);
    //  await axios
    //     .put(`https://beta.api.hellotioo.com/open/lesson/templateimage/${lessonId}`, formData)
    //     .then((res: any) => {
    //       if (!res.error) {
    //         const url = res.data.data[0];

    //       }
    //     });
}


// Color Validation Functions

export const toggleWrapperSize = (
  element: HTMLDivElement,
  style: string,
  styleType: string
) => {
  if (styleType === "height" && +style >= 280) {
    element.style.height = style + "px";
  } else element.style.width = style + "px";
};
