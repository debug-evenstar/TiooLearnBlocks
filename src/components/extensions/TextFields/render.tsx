import React, { FC,  useEffect,  useState } from "react";
import { TextFieldsInterface } from ".";
import { SlideEvents } from "components/SlideManager/events";
import { formatTextColor } from "components/SlideManager/handler";
interface TextFieldProps {
  id?: string;
  manager?: TextFieldsInterface;
  allowInput? : boolean;
  answer? : any;
  styles? : React.CSSProperties;
}

const TextFieldComponent: FC<TextFieldProps> = ({id, manager, allowInput = true, answer, styles}) => {
  const [slideScopeIndex, setSlideScopeIndex] = useState<number>(
    manager?.slideScopeIndex(id, answer)
  );
  const [inputIsDisabled, setInputIsDisabled] = useState<boolean>(!allowInput);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [filled, setFilled] = useState<any>(null);
  const handleChange = (e: any) => {
    // Handle color change
    if( answer ) {
      formatTextColor(
        e.target,
        manager?.inputAnswerMatch(e.target.value, answer)
      );

    }
    // Set value
    let answered = false;
    manager?.setFieldValue(id, e.target.value, ()=>{
      setFilled(manager.fieldReplacementFill(e.target.value));
      setIsAnswered(true);
      answered = true;
    });

    if( !answered ) {
      setInputWidth();
    }
  };

  const setInputWidth = () => {
    if ( id && answer && allowInput ) {
      const element : any =  document.getElementById(id);
      const width = manager?.simulateAnswerWidth(answer);
      const setWidth = (element.value.length/answer.length * width) + 30;
      element.style.width = `${setWidth}px`;
    }
  }

  const changeInputActiveState = () => {
    if( answer ){
      setInputIsDisabled(() => (
        allowInput 
          ? manager?.slide.progress !== slideScopeIndex
          : true
      ));
    }
  }

  useEffect(()=>{
    // setInitialInputWidth();
    changeInputActiveState();
    manager?.slide.on(SlideEvents.PROGRESS_UPDATE,(data : any)=>{
      changeInputActiveState();
    });
  },[manager]);

  useEffect(()=>{
    if( manager && manager.fieldData && id) {
      manager.setFiller(id, (value : any) => {
        setFilled(manager.fieldReplacementFill(value));
        setIsAnswered(true);
      });
    }
  },[])


  return (
    <>
      {!isAnswered && 
        <input
          type="text"
          name="value"
          id={id}
          style={styles ?? {}}
          className={`bg-white text-center text-black h-[22px] border border-[#4F46E5] px-3 mx-2 input-style w-20 rounded-[20px]`}
          onChange={handleChange}
          disabled={inputIsDisabled}
        />
      }
      {isAnswered && filled}
    </>
  );
};

export default TextFieldComponent;
