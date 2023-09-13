import React, { FC,  useEffect,  useState } from "react";
import { TextFieldsInterface } from ".";
import { SlideEvents } from "components/SlideManager/events";
import { formatTextColor } from "components/SlideManager/handler";
interface TextFieldProps {
  id?: string;
  manager?: TextFieldsInterface;
  allowInput? : boolean;
  answer? : any;
}

const TextFieldComponent: FC<TextFieldProps> = ({id, manager, allowInput = true, answer}) => {
  const [slideScopeIndex, setSlideScopeIndex] = useState<number>(
    manager?.slideScopeIndex(answer)
  );

  const [inputIsDisabled, setInputIsDisabled] = useState<boolean>(!allowInput);
  const handleChange = (e: any) => {
    // Handle color change
    if( answer ) {
      formatTextColor(
        e.target,
        manager?.inputAnswerMatch(e.target.value, answer)
      );
    }
    // Set value
    manager?.setFieldValue(id, e.target.value)
  };

  const setInitialInputWidth = () => {
    if ( id && answer ) {
      const element : any =  document.getElementById(id);
      const width = manager?.simulateAnswerWidth(answer);
      element.style.width = `${width}px`;
    }
  }

  const changeInputActiveState = () => {
    if( answer ){
      setInputIsDisabled(() => (
        allowInput 
          ? manager?.slide.progress !== slideScopeIndex
          : false
      ));
    }
  }

  useEffect(()=>{
    setInitialInputWidth();
    changeInputActiveState();
    manager?.slide.on(SlideEvents.PROGRESS_UPDATE,(data : any)=>{
      changeInputActiveState();
    });
  },[]);


  return (
    <>
      <input
        type="text"
        name="value"
        id={id}
        className="bg-white text-center text-black h-[22px] border border-[#4F46E5] px-3 mx-2 input-style w-20 rounded-[20px]"
        onChange={handleChange}
        disabled={inputIsDisabled}
      />
    </>
  );
};

export default TextFieldComponent;
