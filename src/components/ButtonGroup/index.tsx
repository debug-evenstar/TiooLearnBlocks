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

  const selectAnswer = (index : number, item : string) => {
    slide.selectAnswer( index, item, () => {
      if ( data.options && data.options.length > 0) {
        if(data.options.length > activeOptionGroupIndex + 1 ) {
          setButtonLabels( data.options[ activeOptionGroupIndex + 1] );
          setActiveOptionGroupIndex(activeOptionGroupIndex + 1);
        }
      }
    })
  }

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
            !!buttonLabels.length && buttonLabels.map((item:any, index:number) => (
                <ButtonComponent key={index} onClick={() => selectAnswer(index , item)} title={item} index={index}/>
            ))
        }
        </div>
    </>
  )
}

export default ButtonGroupComponent