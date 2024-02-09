import { FC } from 'react';
import { LessonSlideInterface } from '../SlideManager/handler';
import { ButtonGroupData } from './handler';
interface ButtonGroupProps {
    data: ButtonGroupData;
    manager?: any;
    slide: LessonSlideInterface;
}
declare const ButtonGroupComponent: FC<ButtonGroupProps>;
export default ButtonGroupComponent;
