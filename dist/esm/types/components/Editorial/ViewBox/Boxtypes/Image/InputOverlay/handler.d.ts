export declare const createInputOverlay: (x: number, y: number, imageRef: any) => {
    type: string;
    layout: {
        position: {
            xAxis: {
                offset: number;
                offsetPercent: number;
            };
            yAxis: {
                offset: number;
                offsetPercent: number;
            };
        };
        size: {
            width: number;
            height: number;
            widthPercent: number;
            heightPercent: number;
        };
    };
    question: never[];
};
