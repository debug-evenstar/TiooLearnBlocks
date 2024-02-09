import { FC } from 'react';
interface ComponentSlides {
    slides: any[];
    back: Function;
    title?: string;
}
declare const RenderComponent: FC<ComponentSlides>;
export default RenderComponent;
