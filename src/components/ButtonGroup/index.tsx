import React, {FC, useEffect, useRef, useState} from 'react'
import ButtonComponent from '../Button/index'
import { LessonSlideInterface } from '../SlideManager/handler';
import { ButtonGroupData } from './handler';

interface ButtonGroupProps{
    data: ButtonGroupData;
    manager?: any;
    slide : LessonSlideInterface
}
const ButtonGroupComponent:FC<ButtonGroupProps> = ({data, manager, slide}) => {
  const [buttonLabels , setButtonLabels]  = useState<string[]>([]);
  const [activeOptionGroupIndex , setActiveOptionGroupIndex] = useState<number>(0);
  const [buttonStatuses, setButtonStatuses] = useState<string[]>([]);
  const buttonContainerRef = useRef<any>(null);

  const selectAnswer = (index : number, item : string) => {
    if( !data.options || data.options.length === 0){
      setButtonStatus(index,"success");
    }
    slide.selectAnswer( index, item, (success : boolean) => {
      if ( data.options && data.options.length > 0) {
        if(success){
          setButtonStatus(index,"success");
          setTimeout(()=>{
            nextButtonGroup();
          },600)
        }else{
          if(slide.answers && slide.progress < slide.answers.length){
            setButtonStatus(index, "failure");
            setTimeout(()=>{
              setButtonStatus(index, "default");
            },800);
          }
        }
      }
    })
  }

  const initStatuses = () => {
    const statuses : string[] = [];
    const opts = data.options && data.options.length 
      ? data.options[activeOptionGroupIndex]
      : data.answers;
    opts.forEach((option, index) => {
      statuses[index] = "default"; // Move to static class properties
    });
    setButtonStatuses(statuses);
  }

  


  const nextButtonGroup = () => {
    if(data.options){
      if(data.options.length > activeOptionGroupIndex + 1 ) {
        setButtonLabels( data.options[ activeOptionGroupIndex + 1] );
        setActiveOptionGroupIndex(activeOptionGroupIndex + 1);
        initStatuses();
      }else{
        setActiveOptionGroupIndex(0);
      }
    }
  }

  const setButtonStatus = (index: number, status : string) => {
    const previous = buttonStatuses;
    previous[index] = status; // Move to static class properties
    setButtonStatuses(() => [...previous]);
  }

  const hideButton = () => {
    buttonContainerRef.current.style.display = "none";
  }

  const restartButtonGroup = () => {
    buttonContainerRef.current.style.display = "flex";
    initStatuses();
    setActiveOptionGroupIndex(0);
    if (data.options && data.options.length > 0) {
      setButtonLabels(data.options[0]);
    }else{
      setButtonLabels(data.answers);
    }
    slide.progress = 0;
  }

  useEffect(()=>{
    initStatuses();
  },[data, slide])

  useEffect(()=>{
    if (data.options && data.options.length > 0) {
      setButtonLabels(data.options[0]);
    }else{
      setButtonLabels(data.answers);
    }
    slide.setFunction('initButtonStatuses', initStatuses);
    slide.setFunction('hideButtonGroup', hideButton);
    slide.setFunction('restartButtonGroup', restartButtonGroup);
  },[data, slide]);



  return (
    <>
        <div className='flex gap-6 mx-auto mt-[30px]' ref={buttonContainerRef}>
        {
            (!!buttonLabels.length && !!buttonStatuses.length) && buttonLabels.map((item:any, index:number) => (
                <ButtonComponent key={index} status={buttonStatuses[index]} onClick={() => selectAnswer(index , item)} title={item} index={index}/>
            ))
        }
        </div>
    </>
  )
}

export default ButtonGroupComponent