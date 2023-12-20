import React, { FC, useEffect, useState } from "react";
import {
  LessonSlideInterface,
  LessonSlideScope,
  loadComponent,
} from "components/SlideManager/handler";
import { RiDeleteBin5Line, RiShareForwardLine } from "react-icons/ri";
import { TiArrowBackOutline } from "react-icons/ti";
import { FiUploadCloud } from "react-icons/fi";
import { FaTimes } from "react-icons/fa";
import EditorialCanvas from "./Base/EditorialCanvas";

interface Props {
  active: number;
  slides: any;
  data: any;
  isBusy: boolean;
  showEdit: () => void;
  changeFile: (file: any, payload: any, id: any) => void;
  changeCard: (
    file: any,
    payload: any,
    id: any,
    length: number,
    changedIndex: any
  ) => void;
  changeSlide: (
    file: any,
    payload: any,
    id: any,
    length: number,
    changedIndex: any
  ) => void;
}
const ActiveEditSlide: FC<Props> = ({
  active,
  slides,
  data,
  showEdit,
  changeFile,
  changeCard,
  changeSlide,
  isBusy,
}) => {
  const [SlideScope] = useState<LessonSlideInterface>(LessonSlideScope());
  // const [checkText, setCheckText] = useState([]);
  const [checkFiles, setCheckFiles] = useState<any>();
  const [activeSlide, setActiveSlide] = useState<any[]>([]);
  const [slideId, setSlideId] = useState("");
  const [delFile, setDelFile] = useState(false);
  const [seletedImage, setSelectedImage] = useState<any>();
  const [previewImage, setPreviewImage] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [previewSlide, setPreviewSlide] = useState(false);

  useEffect(() => {
    if (slides) {
      setActiveSlide(slides[active]);
    }
  }, [active]);
  useEffect(() => {
    getId();
  }, []);
  const activeSlid = slides && slides[active];
  useEffect(() => {
    const flashComp =
      activeSlid &&
      activeSlid.filter(
        (where: any) =>
          where.component === "Image" || where.component === "Video"
      );
    setCheckFiles(flashComp[0]);
  }, [activeSlid]);
  const checkFile = (file: any) => {
    const textComp =
      activeSlid && activeSlid.filter((where: any) => where.component === file);
    if (!!textComp.length) {
      return true;
    } else return false;
  };
  const getId = () => {
    const parseSlides = slides.map((slide: any) => slide);
    setSlideId(parseSlides[active].id);
  };


  const RenderPreview = () => {
    const textComp =
      activeSlid &&
      activeSlid.filter((where: any) => where.component === "Text");
    const fileComp =
      activeSlid &&
      activeSlid.filter(
        (where: any) =>
          where.component === "Image" || where.component === "Video"
      );
    return (
      <>
        {textComp.map((component: any, index: number) => {
          const Component = loadComponent(component);
          return <Component key={index} data={component} slide={SlideScope} />;
        })}
        {!showPreview &&
          fileComp.map((component: any, index: number) => {
            const Component = loadComponent(component);
            return (
              <Component key={index} data={component} slide={SlideScope} />
            );
          })}
        {showPreview &&
          (checkFile("Image") ? (
            <div className="w-8/12 max-h-[300px] object-fit mx-auto my-6 rounded-[18px] overflow-hidden">
              <img src={previewImage} alt="placeholder" className="w-full" />
            </div>
          ) : (
            <video className="w-full" controls autoPlay={true}>
              <source src={previewImage} type="video/mp4"></source>
            </video>
          ))}
      </>
    );
  };
  const deleteFile = () => {
    setDelFile(true);
    setShowPreview(false);
  };
  const handleUpload = (e: any) => {
    e.preventDefault();
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setSelectedImage(selectedFile);
      setPreviewImage(imageUrl);
      setDelFile(false);
      setShowPreview(true);
    }
  };
  const editFile = () => {
    const payload = [...activeSlid];
  };
  return (
    <div>
      <div className="flex gap-x-4">
        <div className="w-full">
          {/* {!!checkText.length && ( */}
     
            <EditorialCanvas 
              slideData={activeSlide}
            />

          {/* )} */}
          {checkFiles && (<></>
            // <div className="mt-12 relative p-6 py-12 dasheds">
            //   <div className="flex absolute top-5 right-10 gap-x-4">
            //     {delFile && (
            //       <div className="w-6 relative overflow-hidden !cursor-pointer">
            //         <FiUploadCloud className="text-2xl cursor-pointer" />
            //         {checkFile("Video") && (
            //           <input
            //             type="file"
            //             accept="video/*"
            //             onChange={handleUpload}
            //             className="absolute top-0 -left-24 opacity-0"
            //           />
            //         )}
            //         {checkFile("Image") && (
            //           <input
            //             type="file"
            //             accept="image/*"
            //             onChange={handleUpload}
            //             className="absolute top-0 -left-24 opacity-0"
            //           />
            //         )}
            //       </div>
            //     )}
            //     {!delFile && (
            //       <RiDeleteBin5Line
            //         className="text-2xl cursor-pointer"
            //         onClick={deleteFile}
            //       />
            //     )}
            //   </div>
            //   {delFile && !showPreview && (
            //     <div className="w-6/12 mx-auto my-6 rounded-[18px] overflow-hidden">
            //       <img
            //         src="https://res.cloudinary.com/dic7regoe/image/upload/v1694805252/praxeum/noimage_cu02fq.jpg"
            //         alt="placeholder"
            //         className="w-full"
            //       />
            //     </div>
            //   )}
            //   {/* {!delFile && !showPreview && <RenderFile />} */}
            //   {showPreview &&
            //     (checkFile("Image") ? (
            //       <div className="w-8/12 max-h-[300px] object-fit mx-auto my-6 rounded-[18px] overflow-hidden">
            //         <img
            //           src={previewImage}
            //           alt="placeholder"
            //           className="w-full"
            //         />
            //       </div>
            //     ) : (
            //       <video className="w-full" controls autoPlay={true}>
            //         <source src={previewImage} type="video/mp4"></source>
            //       </video>
            //     ))}
            // </div>
          )}
        </div>
      </div>
      <div className="w-full mb-[40px] mt-[44px] bottom-0 z-50 relative px-[30px]">
        <div className="w-full h-[50px] flex items-center justify-between">
          <div
            className="w-[140px] rounded-[8px] border border-[#4F46E5] text-[#4F46E5] flex items-center justify-center py-3 cursor-pointer text-semibold"
            onClick={editFile}
          >
            {isBusy ? "Saving..." : "Save"}
          </div>
          <div
            className="w-[140px] rounded-[8px] border bg-[#4F46E5] text-white flex items-center justify-center py-3 cursor-pointer text-semibold"
            onClick={() => setPreviewSlide(true)}
          >
            Preview
          </div>
        </div>
        <div className="pb-16"></div>
      </div>
      {previewSlide && (
        <div className="fixed w-full h-screen flex justify-center items-center z-40 top-0 left-0 bg-preview">
          <div className="mt-4 w-6/12 bgcomps text-white bg-cover rounded-lg min-h-[70vh] px-5 flex justify-center items-center fw-600">
            <div>
              <RenderPreview />
            </div>
          </div>
          <FaTimes
            className="absolute text-[40px] top-10 right-10 text-blue-800 cursor-pointer hover:scale-110 duration-100"
            onClick={() => setPreviewSlide(false)}
          />
        </div>
      )}
    </div>
  );
};

export default ActiveEditSlide;
