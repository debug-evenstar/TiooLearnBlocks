import { FC } from 'react';
interface ComponentSlides {
    slides: any[];
    back: Function;
}
declare const RenderComponent: FC<ComponentSlides>;
export default RenderComponent;
