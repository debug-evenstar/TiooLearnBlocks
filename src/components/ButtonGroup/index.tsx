import React, {FC, useEffect} from 'react'
import ButtonComponent from '../Button/index'
import { LessonSlideInterface } from '../SlideManager/handler';
import { ButtonGroupData } from './handler';

interface ButtonGroupProps{
    data: ButtonGroupData;
    manager?: any;
    slide : LessonSlideInterface
}
const ButtonGroupComponent:FC<ButtonGroupProps> = ({data, manager, slide}) => {
  useEffect(()=>{
    slide.setAnswers(data.answers);
  },[]);

  return (
    <>
        <div className='grid grid-cols-2 gap-6 w-5/12 mx-auto '>
        {
            !!data.answers.length && data.answers.map((item:any, index:number) => (
                <ButtonComponent onClick={() => slide.selectAnswer( index, item )} title={item} index={index}/>
            ))
        }
        </div>
    </>
  )
}

export default ButtonGroupComponent