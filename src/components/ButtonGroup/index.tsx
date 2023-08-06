import React, {FC} from 'react'
import ButtonComponent from '../Button/index'
import { LessonSlideInterface } from '../SlideManager/handler';

interface ButtonGroupProps{
    data: any;
    manager?: any;
    slide : LessonSlideInterface
}
const ButtonGroupComponent:FC<ButtonGroupProps> = ({data, manager, slide}) => {
  slide.setAnswers(data);
  return (
    <>
        <div className='grid grid-cols-2 gap-6 w-5/12 mx-auto '>
        {
            !!data.length && data.map((item:any, index:number) => (
                <ButtonComponent onClick={() => false} title={item} index={index}/>
            ))
        }
        </div>
    </>
  )
}

export default ButtonGroupComponent