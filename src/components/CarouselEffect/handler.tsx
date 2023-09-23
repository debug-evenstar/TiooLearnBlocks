import { PropsWithChildren } from "react";

export interface CarouselProps {
    props : PropsWithChildren;
}
export const generateCarouselStyle = (index : number) => {
    const base = "w-auto h-full overflow-x-visible relative whitespace-nowrap";
    const offset = `left-[-${index * 500}px]`;
    const style = `${base} ${offset}`;
    return style;
}

