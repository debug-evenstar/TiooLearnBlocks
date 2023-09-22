import React, { FC } from 'react';

declare global {
    interface Window {
        SlideEventListener: any;
    }
}
interface LessonSlideInterface {
    options?: any[];
    answers?: any[];
    feedbacks?: any[];
    status?: boolean;
    complete?: boolean;
    textFields?: any[];
    setAnswers: Function;
    setOptions: Function;
    setFeedbacks: Function;
    setStatus: Function;
    addFields: Function;
    selectAnswer: Function;
    setFunction: Function;
    triggerFeedback: Function;
    updateProgress: Function;
    functions?: {
        [key: string]: Function;
    };
    attributes: {
        [key: string]: any;
    };
    progress: number;
    video: any;
    setVideo: Function;
    resetData: Function;
    on: Function;
    dispatch: Function;
    fillWithHint: Function;
    verifySubjectiveAnswer: Function;
    registerSlideData: Function;
}

interface TextStyles {
    color?: string;
}
interface TextData {
    content: string;
    tips?: string[];
    answers?: any[];
    options?: string[];
}
interface TextComponentProps {
    styles?: TextStyles;
    data: TextData;
    slide: LessonSlideInterface;
    altHeaderStyle: string;
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
    feedbacks: any[];
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
    updateActiveSlide: Function;
    ref: any;
    altHeaderStyle?: string;
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
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    disabled?: boolean;
    index: number;
    status?: string;
}
declare const ButtonComponent: React.FC<ButtonProps>;

declare const FlashCardsComponent: FC<FlashCardComponentProps>;

declare const ImageComponent: FC<ImageComponentProps>;

declare const OptionsComponent: React.FC<OptionsComponentProps>;

declare const SliderComponent: FC<SliderComponentProps>;

declare const TextComponent: FC<TextComponentProps>;

declare global {
    interface Window {
        YT: any;
    }
}
declare const VideoComponent: FC<VideoComponentProps>;

declare const WordMatchComponent: FC<WordMatchComponentProps>;

interface Props {
    data?: any;
    lessons?: any;
    changeFile: (file: any, payload: any, id: any) => void;
    changeCard: (file: any, payload: any, id: any, length: number, changedIndex: any) => void;
    back: () => void;
    lessonlist: any;
    name: string;
    isBusy: boolean;
}
declare const Editorial: FC<Props>;

export { ButtonComponent as Button, ButtonGroupComponent as ButtonGroup, Editorial, FlashCardsComponent as FlashCards, ImageComponent as Image, OptionsComponent as Options, SlideManager, SliderComponent as Slider, TextComponent as Text, VideoComponent as Video, WordMatchComponent as WordMatch };
