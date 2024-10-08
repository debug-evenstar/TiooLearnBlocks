import react, { FC } from 'react';
import { ButtonGroupData as ButtonGroupData$1 } from 'components/ButtonGroup/handler';
import { FlashCardData as FlashCardData$1 } from 'components/FlashCards/handler';
import { GridStepsData as GridStepsData$1 } from 'components/GridSteps/handler';
import { OptionData as OptionData$1 } from 'components/Options/handler';
import { PostfaceData as PostfaceData$1 } from 'components/Postface/handler';
import { PrefaceData as PrefaceData$1 } from 'components/Preface/handler';
import { SliderData as SliderData$1 } from 'components/Slider/handler';
import { TextData as TextData$1 } from 'components/Text/handler';
import { VideoData as VideoData$1 } from 'components/Video/handler';
import { WordMatchData as WordMatchData$1 } from 'components/WordMatch/handler';
import { ImageData as ImageData$2 } from 'components/Image/handler';
import { ComponentBasePropsInterface, ComponentBaseDataInterface } from 'components/interface';
import { LessonSlideInterface as LessonSlideInterface$1 } from 'components/SlideManager/handler';

declare global {
    interface Window {
        SlideEventListener: any;
    }
}
type SlideData = (TextData$1 | ButtonGroupData$1 | SliderData$1 | ImageData | FlashCardData$1 | VideoData$1 | WordMatchData$1 | OptionData$1 | GridStepsData$1 | PrefaceData$1 | PostfaceData$1)[];
interface LessonSlideInterface {
    slide: any;
    options?: any[];
    answers?: any[];
    feedbacks?: any[];
    status?: boolean;
    complete?: boolean;
    parent: any;
    textFields?: any[];
    setAnswers: Function;
    setOptions: Function;
    setFeedbacks: Function;
    setStatus: Function;
    addFields: Function;
    selectAnswer: Function;
    setFunction: Function;
    setAttribute: Function;
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
    checkSlideCanProceed: Function;
}

interface SlideManagerProps {
    lessonSlides: SlideData[];
    canProceed: Function;
    canFeedbackProceed?: Function;
    handleFeedback: Function;
    updateActiveSlide: Function;
    ref: any;
    parent?: any;
    altHeaderStyle?: string;
    handleContinue?: Function;
    lessonTitle?: string;
}
declare const SlideManager: FC<SlideManagerProps>;

interface ButtonGroupData {
    answers: string[];
    options?: string[][];
    feedbacks?: any[];
}

interface ButtonGroupProps {
    data: ButtonGroupData;
    manager?: any;
    slide: LessonSlideInterface;
}
declare const ButtonGroupComponent: FC<ButtonGroupProps>;

interface ButtonProps {
    title: string | JSX.Element;
    onClick?: react.MouseEventHandler<HTMLButtonElement> | undefined;
    disabled?: boolean;
    index: number;
    status?: string;
}
declare const ButtonComponent: react.FC<ButtonProps>;

interface FlashCardData {
    component: string;
    cards: any[];
}
interface FlashCardComponentProps {
    data: FlashCardData;
    slide: LessonSlideInterface;
}

declare const FlashCardsComponent: FC<FlashCardComponentProps>;

interface ImageData$1 {
    component: string;
    url: string;
    extensions?: any[];
}
interface ImageComponentProps {
    data: ImageData$1;
    slide: LessonSlideInterface;
}

declare const ImageComponent: FC<ImageComponentProps>;

interface OptionData {
    component: string;
    options: string[];
    answers: string[];
}
interface OptionsComponentProps {
    data: OptionData;
    slide: LessonSlideInterface;
}

declare const OptionsComponent: react.FC<OptionsComponentProps>;

interface TextStyles {
    color?: string;
    fontSize?: string;
}
interface TextData extends ComponentBaseDataInterface {
    component: string;
    content: string;
    tips?: string[];
    answers?: any[];
    options?: string[][];
}
interface TextComponentProps extends ComponentBasePropsInterface {
    styles?: TextStyles;
    data: TextData;
    activeSlideIndex: number;
    altHeaderStyle: string;
}

interface SliderData {
    slides: (TextData | ButtonGroupData$1 | ImageData$2 | FlashCardData$1 | VideoData$1 | WordMatchData$1 | OptionData$1)[][];
}
interface SliderComponentProps {
    data: SliderData;
    slide: LessonSlideInterface;
}

declare const SliderComponent: FC<SliderComponentProps>;

declare const TextComponent: FC<TextComponentProps>;

interface VideoData {
    component: string;
    url: string;
}
interface VideoComponentProps {
    data: VideoData;
    slide: LessonSlideInterface;
}

declare global {
    interface Window {
        YT: any;
    }
}
declare const VideoComponent: FC<VideoComponentProps>;

interface WordMatchData {
    component: string;
    answers: string[];
    options: string[];
    feedbacks: any[];
}
interface WordMatchComponentProps {
    data: WordMatchData;
    slide: LessonSlideInterface;
}

declare const WordMatchComponent: FC<WordMatchComponentProps>;

interface UserProps {
    name: string;
    auth: string;
    base: string;
}
interface Props {
    data: any;
    user: UserProps;
    back: () => void;
    lessonList: any;
    refetch: () => void;
}
declare const Editorial: FC<Props>;

interface GridStepsData {
    size: string;
    start: string;
    end: string;
    steps: number;
    example?: boolean;
    theme?: string;
    answers?: any[];
}
interface GridStepsComponentProps {
    data: GridStepsData;
    slide: LessonSlideInterface$1;
}

declare const GridSteps: react.FC<GridStepsComponentProps>;

interface PrefaceData {
    component: string;
    objectives: string[];
}
interface PrefaceComponentProps {
    data: PrefaceData;
    slide: LessonSlideInterface$1;
}

declare const PrefaceComponent: FC<PrefaceComponentProps>;

interface PostfaceData {
    component: string;
    terms: string[];
}
interface PostfaceComponentProps {
    data: PostfaceData;
    slide: LessonSlideInterface$1;
}

declare const PostfaceComponent: FC<PostfaceComponentProps>;

interface LessonPageProps {
    textbook: any;
    chapters: any;
    retake?: boolean;
    lesson?: any;
    back?: Function;
}
declare const LessonPage: FC<LessonPageProps>;

interface ConfigurationOptions {
    baseUrl: string;
    token: string;
    authType: string;
}
declare const Configuration: {
    save(config: ConfigurationOptions): void;
    load(): ConfigurationOptions | null;
};

export { ButtonComponent as Button, ButtonGroupComponent as ButtonGroup, Configuration as ConfigureLibrary, Editorial, FlashCardsComponent as FlashCards, GridSteps, ImageComponent as Image, LessonPage, OptionsComponent as Options, PostfaceComponent as Postface, PrefaceComponent as Preface, SlideManager, SliderComponent as Slider, TextComponent as Text, VideoComponent as Video, WordMatchComponent as WordMatch };
