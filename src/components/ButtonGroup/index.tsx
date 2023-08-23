import React, {FC, useEffect, useState} from 'react'
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
          },800)
        }else{
          setButtonStatus(index, "failure");
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
      }
    }
  }
  const setButtonStatus = (index: number, status : string) => {
    const previous = buttonStatuses;
    previous[index] = status; // Move to static class properties
    setButtonStatuses(() => [...previous]);
  }

  useEffect(()=>{
    initStatuses();
  },[])

  useEffect(()=>{
    slide.setAnswers(data.answers);
    slide.setOptions(data.options);
    slide.setFeedbacks(data.feedbacks);
    if (data.options && data.options.length > 0) {
      setButtonLabels(data.options[0]);
    }else{
      setButtonLabels(data.answers);
    }
  },[data]);



  return (
    <>
        <div className='grid grid-cols-2 gap-6 w-5/12 mx-auto mt-[30px]'>
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