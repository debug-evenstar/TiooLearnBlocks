import React, { useRef, useState } from "react";
import { FaPlus, FaPlusCircle, FaTimes } from "react-icons/fa";
import { FiUploadCloud } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";

const CreateOverlaySlide = () => {
  const baseimg =
    "https://res.cloudinary.com/dic7regoe/image/upload/v1694805252/praxeum/noimage_cu02fq.jpg";
  const [bgImg, setBgImg] = useState<string>(baseimg);
  const [seletedImage, setSelectedImage] = useState();
  const handleUpload = (e: any) => {
    e.preventDefault();
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setSelectedImage(selectedFile);
      setBgImg(imageUrl);
    }
  };
  const delBgfile = () => {
    setBgImg(baseimg);
  };
  //   creating input fields
  const [inputFields, setInputFields] = useState<any[]>([]);

  const bgMain = useRef<HTMLInputElement>(null);
  const handleBackgroundClick = (e: any) => {
    const parentDiv = e.currentTarget;
    const bounds = parentDiv.getBoundingClientRect();
    const clickX = e.clientX - bounds.left;
    const clickY = e.clientY - bounds.top;
    // Create a new input field object with unique key
    const newInputField = {
      key: inputFields.length,
      x: clickX - 20,
      y: clickY - 20,
      value: "",
    };

    setInputFields([...inputFields, newInputField]);
  };
  console.log(inputFields);
  const closeThisInput = (e: any, val: any) => {
    e.stopPropagation();
    setInputFields(inputFields.filter((field) => field.key !== val.key));
  };
  const handleInputs = (e: any, val: any) => {
    e.stopPropagation();
    console.log(e.target.value);

    const newArr = [...inputFields];
    newArr[val.key] = {
      key: val.key,
      x: val.x,
      y: val.y,
      value: e.target.value,
    };
    setInputFields(newArr);
  };
  return (
    <>
      <div className="w-[600px] mx-auto">
        <div className="pb-6 flex gap-x-2 items-center cursor-pointer">
          <FaPlusCircle/>
          <p className="fw-500">Add Text</p>
        </div>
        <div className="flex justify-end gap-x-3 pb-3">
          <div className="w-6 relative overflow-hidden !cursor-pointer">
            <FiUploadCloud className="text-2xl" />
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="absolute top-0 -left-24 opacity-0"
            />
          </div>
          <RiDeleteBin5Line className="text-2xl" onClick={delBgfile} />
        </div>
        <div className="w-[600px] mx-auto h-[400px] relative p-2 dasheds">
          <div
            className="relative w-full h-full"
            ref={bgMain}
            onClick={handleBackgroundClick}
          >
            <img
              src={bgImg}
              alt="placeholder"
              className="w-full absolute z-0 w-full h-full top-0 left-0"
            />
            {inputFields.map((inputField) => (
              <>
                <input
                  key={inputField.key}
                  type="text"
                  style={{
                    position: "absolute",
                    left: inputField.x,
                    top: inputField.y,
                  }}
                  onClick={(e) => e.stopPropagation()}
                  className="z-10 absolute bg-gray-400 rounded-lg p-2 w-[85px] created-inputs"
                  onChange={(e) => handleInputs(e, inputField)}
                />
                <FaTimes
                  className="text-red-500 absolute cursor-pointer"
                  style={{
                    position: "absolute",
                    left: inputField.x + 85,
                    top: inputField.y,
                  }}
                  onClick={(e) => closeThisInput(e, inputField)}
                />
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateOverlaySlide;
