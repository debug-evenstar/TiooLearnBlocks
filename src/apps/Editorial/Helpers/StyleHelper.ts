
export const pixelsToCanvasRatio = (value : number) => {
    const viewWidth = document.getElementById('editorial-canvas')?.clientWidth as number;
    return value/viewWidth * 100;
}