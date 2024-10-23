import { ComponentBaseDataInterface } from "components/interface";

// Extract layout data from each slide component
const extractComponentLayouts = ( slide : ComponentBaseDataInterface[] ) => {
    const layouts = slide.map((cData : ComponentBaseDataInterface, index : number) => {
        let layout = cData.layout;
        return { index, layout}
    })
}
