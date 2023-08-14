/// <reference types="react" />
import React$1, { FC } from 'react';

interface TextFieldsInterface {
    data: (string | React.ReactElement)[];
    fieldIds: string[];
    fieldData: {
        [key: string]: string;
    };
    fieldReplacementFill: Function;
}

interface LessonSlideInterface {
    options?: any[];
    answers?: string[];
    feedbacks?: any[];
    status?: boolean;
    complete?: boolean;
    textFields?: TextFieldsInterface[];
    setAnswers: Function;
    setOptions: Function;
    setFeedbacks: Function;
    setStatus: Function;
    addFields: Function;
    selectAnswer: Function;
    setFunction: Function;
    triggerFeedback: Function;
    functions?: {
        [key: string]: Function;
    };
    progress: number;
}

interface TextStyles {
    color?: string;
}
interface TextData {
    content: string;
    tips?: string[];
    answers?: string[];
    options?: string[];
}
interface TextComponentProps {
    styles?: TextStyles;
    data: TextData;
    slide: LessonSlideInterface;
}

interface ButtonGroupData {
    answers: string[];
    options?: string[][];
    feedbacks?: any[];
}

interface SliderData {
    slides: (TextData)[];
}
interface SliderComponentProps {
    data: SliderData;
    slide: LessonSlideInterface;
}

interface ImageData {
    url: string;
}
interface ImageComponentProps {
    data: ImageData;
    slide: LessonSlideInterface;
}

interface FlashCardData {
    cards: any[];
}
interface FlashCardComponentProps {
    data: FlashCardData;
    slide: LessonSlideInterface;
}

interface VideoData {
    url: string;
}
interface VideoComponentProps {
    data: VideoData;
    slide: LessonSlideInterface;
}

interface WordMatchData {
    answers: string[];
    options: string[];
}
interface WordMatchComponentProps {
    data: WordMatchData;
    slide: LessonSlideInterface;
}

interface OptionData {
    options: string[];
    answers: string[];
}
interface OptionsComponentProps {
    data: OptionData;
    slide: LessonSlideInterface;
}

interface SlideManagerProps {
    lessonSlides: (TextData | ButtonGroupData | SliderData | ImageData | FlashCardData | VideoData | WordMatchData | OptionData)[][];
    canProceed: Function;
    handleFeedback: Function;
    ref: any;
}
declare const SlideManager: FC<SlideManagerProps>;

interface ButtonGroupProps {
    data: ButtonGroupData;
    manager?: any;
    slide: LessonSlideInterface;
}
declare const ButtonGroupComponent: FC<ButtonGroupProps>;

interface ButtonProps {
    title: string | JSX.Element;
    onClick?: React$1.MouseEventHandler<HTMLButtonElement> | undefined;
    disabled?: boolean;
    index: number;
}
declare const ButtonComponent: React$1.FC<ButtonProps>;

declare const FlashCardsComponent: FC<FlashCardComponentProps>;

declare const ImageComponent: FC<ImageComponentProps>;

declare const OptionsComponent: React$1.FC<OptionsComponentProps>;

declare const SliderComponent: FC<SliderComponentProps>;

declare const TextComponent: FC<TextComponentProps>;

declare const VideoComponent: FC<VideoComponentProps>;

declare const WordMatchComponent: FC<WordMatchComponentProps>;

export { ButtonComponent as Button, ButtonGroupComponent as ButtonGroup, FlashCardsComponent as FlashCards, ImageComponent as Image, OptionsComponent as Options, SlideManager, SliderComponent as Slider, TextComponent as Text, VideoComponent as Video, WordMatchComponent as WordMatch };
