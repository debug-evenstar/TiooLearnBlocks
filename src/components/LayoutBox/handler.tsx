import { ComponentLayoutInterface } from "components/interface";
import { ReactNode } from "react";

export interface LayoutComponentProps {
    layout: ComponentLayoutInterface;
    responsiveOptions?: any;
    children: ReactNode;
}

export const responsiveTopOffset = (offsetValue: number | undefined) => {
    const currentWidth = document.documentElement.clientWidth;
    return currentWidth < 640 ? 0 : offsetValue ?? 0;
};

export const responsiveLeftOffset = (offsetValue: number | undefined) => {
    const currentWidth = document.documentElement.clientWidth;
    return currentWidth < 640 ? 0 : offsetValue ?? 0;
};

export const responsiveStyles = (options: any) => {
    const currentWidth = document.documentElement.clientWidth;
    return currentWidth < 640 ? { ...options } : {};
};

// export const responsiveTopOffset = (offsetValue: number | undefined) => {
//     const currentHeight = document.documentElement.clientHeight;
//     const currentWidth = document.documentElement.clientWidth;
//     return currentWidth < 640 ? 0 : offsetValue ?? 0;
//     // Used to adjust vertical offset based off distance from the top
//     // In the format { percentOffset : multiplierValue }
//     // const responsivePointsByPercent: { [key: string]: number } = {
//     //     "20": 0.8,
//     //     "40": 1.1,
//     //     "60": 1.2,
//     //     "100": 1.2,
//     // };
//     // const heightReductionFraction = () => {
//     //     if (currentHeight <= 480) {
//     //         return 1.5;
//     //     }
//     //     if (currentHeight <= 520) {
//     //         return 1.4;
//     //     }
//     //     if (currentHeight <= 650) {
//     //         return 1.2;
//     //     }
//     //     return 1;
//     // };
//     // if (offsetValue && currentHeight < 700) {
//     //     const multiplierKey = Object.keys(responsivePointsByPercent).find(
//     //         (percent: string) => {
//     //             return offsetValue < parseFloat(percent);
//     //         }
//     //     ) as string;
//     //     const scaleFactor = responsivePointsByPercent[multiplierKey];
//     //     const multiplier = heightReductionFraction() * scaleFactor;
//     //     return offsetValue * multiplier;
//     // }
//     // return offsetValue;
// };
