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
  const [activeSlide, setActiveSlide] = useState<any[]>();
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
    const parseSlides = data.LessonSlides.map((slide: any) => slide);
    setSlideId(parseSlides[active].id);
  };

  const RenderText = () => {
    const textComp =
      activeSlid &&
      activeSlid.filter((where: any) => where.component === "Text");
    return (
      <>
        {textComp.map((component: any, index: number) => {
          const Component = loadComponent(component);
          return <Component key={index} data={component} slide={SlideScope} />;
        })}
      </>
    );
  };
  const RenderFile = () => {
    const textComp =
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
      </>
    );
  };
  // Flash card comps
  // Flash card components
  const [cards, setCards] = useState<any[]>([]);
  const [selectedCardImage, setSelectedCardImage] = useState<any>();
  const [cardPreviewImage, setCardPreviewImage] = useState<any>();
  const [currentCard, setCurrentCard] = useState(0);
  const [changedCards, setChangedCards] = useState<any[]>([]);
  const [changedIndex, setChangedIndex] = useState<any[]>([]);
  const nextCard = () => {
    setCurrentCard((prevCard) => (prevCard + 1) % cards.length);
  };

  const prevCard = () => {
    setCurrentCard((prevCard) =>
      prevCard === 0 ? cards.length - 1 : prevCard - 1
    );
  };
  useEffect(() => {
    const flashComp =
      activeSlid &&
      activeSlid.filter((where: any) => where.component === "FlashCards");
    setCards(flashComp[0]?.cards);
  }, [activeSlid]);

  const handleCardUpload = (e: any, index: number) => {
    e.preventDefault();
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setSelectedCardImage(selectedFile);
      setCardPreviewImage(imageUrl);
      setChangedCards([...changedCards, selectedFile]);
      setChangedIndex([...changedIndex, index]);
      const newArr = [...cards];
      newArr[index] = {
        url: imageUrl,
      };
      setCards(newArr);
    }
  };

  const delCardFile = (index: number) => {
    const newArr = [...cards];
    newArr[index] = {
      url: "https://res.cloudinary.com/dic7regoe/image/upload/v1694805252/praxeum/noimage_cu02fq.jpg",
    };
    setCards(newArr);
    // setShowDelCard()
  };
  const RenderCard = () => {
    return (
      <div className="relative pt-3">
        <p className="relative -top-7 left-2">
          {currentCard + 1} / {cards.length}
        </p>
        <div className="relative w-8/12 mx-auto h-[300px]">
          {cards &&
            !!cards.length &&
            cards?.map((item: any, index: number) => (
              <div
                className={`absolute top-0 w-full h-full ${
                  index === currentCard ? "active" : "hidden"
                }`}
                key={index}
              >
                <div className="absolute flex gap-x-2 right-0 -top-8">
                  <div className="w-6 relative overflow-hidden !cursor-pointer">
                    <FiUploadCloud className="text-2xl cursor-pointer" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleCardUpload(e, index)}
                      className="absolute top-0 -left-24 opacity-0"
                    />
                  </div>
                  <RiDeleteBin5Line
                    className="text-2xl cursor-pointer"
                    onClick={() => delCardFile(index)}
                  />
                </div>
                <img
                  src={item.url}
                  alt="card"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
        </div>
        <button
          onClick={prevCard}
          className="absolute top-[130px] slick-prev"
        ></button>
        <button
          onClick={nextCard}
          className="absolute right-0 top-[130px] slick-next"
        ></button>
      </div>
    );
  };
  const RenderCardPreview = () => {
    const textComp =
      activeSlid &&
      activeSlid.filter((where: any) => where.component === "Text");
    const fileComp =
      activeSlid &&
      activeSlid.filter((where: any) => where.component !== "Text");
    return (
      <div className="pt-12">
        <div>
          {textComp.map((component: any, index: number) => {
            const Component = loadComponent(component);
            return (
              <Component key={index} data={component} Card={SlideScope} />
            );
          })}
        </div>
        <div className="pt-">
          {!showPreview &&
            fileComp.map((component: any, index: number) => {
              const Component = loadComponent(component);
              return (
                <Component key={index} data={component} slide={SlideScope} />
              );
            })}
        </div>
        <div></div>
      </div>
    );
  };
  // end of flash cards
  // slider components
  // slider components
  const [slider, setSlider] = useState<any[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [changedSlides, setChangedSlides] = useState<any[]>([]);
  const [changedSlideIndex, setChangedSlideIndex] = useState<any[]>([]);
  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slider.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? slider.length - 1 : prevSlide - 1
    );
  };
  const handleSlideUpload = (e: any, index: number) => {
    e.preventDefault();
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      // setSelectedCardImage(selectedFile);
      // setCardPreviewImage(imageUrl);
      setChangedSlides([...changedSlides, selectedFile]);
      setChangedSlideIndex([...changedSlideIndex, index]);
      const newArr = [...slider];
      newArr[index] = [{
        url: imageUrl,
      }];
      setSlider(newArr);
    }
  };

  const delSlideFile = (index: number) => {
    const newArr = [...slider];
    newArr[index] = [{
      url: "https://res.cloudinary.com/dic7regoe/image/upload/v1694805252/praxeum/noimage_cu02fq.jpg",
    }];
    setSlider(newArr);
  };
  useEffect(() => {
    const flashComp =
      activeSlid &&
      activeSlid.filter((where: any) => where.component === "Slider");
    setSlider(flashComp[0]?.slides);
  }, [activeSlid]);
  const RenderSlides = () => {
    return (
      <div className="relative pt-3">
        <p className="relative -top-7 left-2">
          {currentSlide + 1} / {slider.length}
        </p>
        <div className="relative w-8/12 mx-auto h-[300px]">
          {slider &&
            !!slider.length &&
            slider?.map((item: any, index: number) => (
              <div
                className={`absolute top-0 w-full h-full ${
                  index === currentSlide ? "active" : "hidden"
                }`}
                key={index}
              >
                <div className="absolute flex gap-x-2 right-0 -top-8">
                  <div className="w-6 relative overflow-hidden !cursor-pointer">
                    <FiUploadCloud className="text-2xl cursor-pointer" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleSlideUpload(e, index)}
                      className="absolute top-0 -left-24 opacity-0"
                    />
                  </div>
                  <RiDeleteBin5Line
                    className="text-2xl cursor-pointer"
                    onClick={() => delSlideFile(index)}
                  />
                </div>
                <img
                  src={item[0].url}
                  alt="card"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
        </div>
        <button
          onClick={prevSlide}
          className="absolute top-[130px] slick-prev"
        ></button>
        <button
          onClick={nextSlide}
          className="absolute right-0 top-[130px] slick-next"
        ></button>
      </div>
    );
  };
  // end of slider components
  // end of slider components
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
    if (!!cards?.length) {
      changeCard(changedCards, payload, slideId, cards.length, changedIndex);
      setTimeout(() => {
        setChangedCards([]);
        setChangedIndex([])
      }, 400);
    } else if(!!slider?.length){
      changeSlide(changedSlides, payload, slideId, slider.length, changedSlideIndex);
      setTimeout(() => {
        setChangedSlides([]);
        setChangedSlideIndex([])
      }, 400);
    }else {
      changeFile(seletedImage, payload, slideId);
    }
  };
  return (
    <div>
      <div className="flex gap-x-4 px-6">
        <div className="flex gap-x-3">
          <TiArrowBackOutline
            className="text-2xl text-gray-500 cursor-pointer"
            onClick={showEdit}
          />
          <RiShareForwardLine
            className="text-2xl text-gray-500 mt-[1px] cursor-pointer"
            onClick={getId}
          />
        </div>
        <div className="w-full pr-5">
          {/* {!!checkText.length && ( */}
          <div className="p-6 py-12 dasheds">
            <RenderText />
          </div>
          {/* )} */}
          {checkFiles && (
            <div className="mt-12 relative p-6 py-12 dasheds">
              <div className="flex absolute top-5 right-10 gap-x-4">
                {delFile && (
                  <div className="w-6 relative overflow-hidden !cursor-pointer">
                    <FiUploadCloud className="text-2xl cursor-pointer" />
                    {checkFile("Video") && (
                      <input
                        type="file"
                        accept="video/*"
                        onChange={handleUpload}
                        className="absolute top-0 -left-24 opacity-0"
                      />
                    )}
                    {checkFile("Image") && (
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleUpload}
                        className="absolute top-0 -left-24 opacity-0"
                      />
                    )}
                  </div>
                )}
                {!delFile && (
                  <RiDeleteBin5Line
                    className="text-2xl cursor-pointer"
                    onClick={deleteFile}
                  />
                )}
              </div>
              {delFile && !showPreview && (
                <div className="w-6/12 mx-auto my-6 rounded-[18px] overflow-hidden">
                  <img
                    src="https://res.cloudinary.com/dic7regoe/image/upload/v1694805252/praxeum/noimage_cu02fq.jpg"
                    alt="placeholder"
                    className="w-full"
                  />
                </div>
              )}
              {!delFile && !showPreview && <RenderFile />}
              {showPreview &&
                (checkFile("Image") ? (
                  <div className="w-8/12 max-h-[300px] object-fit mx-auto my-6 rounded-[18px] overflow-hidden">
                    <img
                      src={previewImage}
                      alt="placeholder"
                      className="w-full"
                    />
                  </div>
                ) : (
                  <video className="w-full" controls autoPlay={true}>
                    <source src={previewImage} type="video/mp4"></source>
                  </video>
                ))}
            </div>
          )}
          {!!cards?.length && (
            <div className="mt-12 relative p-6 py-12 dasheds">
              <RenderCard />
            </div>
          )}
          {
            !!slider?.length && (
              <div className="mt-12 relative p-6 py-12 dasheds">
                <RenderSlides />
              </div>)
          }
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
              {!!cards?.length ? <RenderCardPreview /> : <RenderPreview />}
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
