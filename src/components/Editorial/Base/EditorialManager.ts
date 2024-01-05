
/* -------------------------------------------------------------------------- */
/*                          COMPONENT DATA INTERFACES                         */
/* -------------------------------------------------------------------------- */

interface PositionProperties {
    offset : number;
    offsetPercent? : number;
}


interface ComponentPositionInterface {
    xAxis : PositionProperties;
    yAxis : PositionProperties;

}

interface ComponentSizeInterface {
    width : number;
    widthPercent? : number;
    height : number;
    heightPercent? : number;
}

interface ComponentLayoutInterface {
    position? : ComponentPositionInterface;
    size : ComponentSizeInterface;
}

export const setComponentLayout = (
    canvasProps : { width : number, height : number },
    layoutData? : ComponentLayoutInterface,
) => {
    const percentValue = (value: number, base : number) => value/base * 100;
    return {
        position : {
            xAxis : { 
                offset : layoutData?.position?.xAxis.offset ?? 0 ,
                offsetPercent : percentValue(layoutData?.position?.xAxis.offset ?? 0 , canvasProps.width)
            },
            yAxis : { 
                offset : layoutData?.position?.xAxis.offset ?? 0 ,
                offsetPercent : percentValue(layoutData?.position?.yAxis.offset ?? 0 , canvasProps.height)
            } 
        },
        size : {
            width : layoutData?.size.width ?? 0,
            widthPercent : percentValue(layoutData?.size.width ?? 0 , canvasProps.width),
            height : layoutData?.size.height ?? 0,
            heightPercent : percentValue(layoutData?.size.height ?? 0 , canvasProps.height)
        }
    }
};

// Experimental styles interface
interface ComponentStylesInterface {
    backgroundColor? : string;
    borderProperties? : {
        radius : string;
        stroke : number;
    }
}

export interface ComponentBaseDataInterface {
    component : string; // Component Name
    theme : string | any; // Allow theme configuration basic implementation for now
    extensions? : any[] // Allow multiple extension types ... To be defined clearly later
    layout? : ComponentLayoutInterface; // Manage viewbox layout
    styles? : ComponentStylesInterface; // Manage optional styles for component view box or global per-component styles
}



/* -------------------------------------------------------------------------- */
/*                    EDITORIAL & CANVAS MANAGER INTERFACES                   */
/* -------------------------------------------------------------------------- */


// Data Group is used when data and function types are not clearly defined
// It is to be replaced with the actual types and interfaces when clearly defined

export interface DataGroupInterface {
    data : {[key: string]: any}
    functions : {[key: string]: Function}
}

const DataGroup : DataGroupInterface = {
    data : {},
    functions : {}
};

export interface CanvasManagerInterface {
    canvas : DataGroupInterface;
    activeComponent : DataGroupInterface;
}

const CanvasManager : CanvasManagerInterface = {
    canvas : DataGroup,
    activeComponent : DataGroup
};

interface EditorialSlideManager { 
    slides : any[];
    activeSlide : number;
}

const SlideManager : EditorialSlideManager = {
    slides : [],
    activeSlide : 0
};

export interface EditorialManagerInterface {
    sidebarManager : DataGroupInterface;
    canvasManager : CanvasManagerInterface;
    slideManager : EditorialSlideManager
}

class EditorialManager implements EditorialManagerInterface {

    sidebarManager: DataGroupInterface = DataGroup;
    canvasManager: CanvasManagerInterface = CanvasManager;
    slideManager: EditorialSlideManager = SlideManager; 

    constructor(slides : any[]) {
        this.slideManager.slides = slides;
        this.initCanvasManager();
    }

    initCanvasManager(){
        const componentData = this.canvasManager.activeComponent.data ?? {
            styleData : {}, // Store component styles
            layoutData : {}, // Store layout configuration for the active component
            coreData : {} // Core data of the active component
        };
        this.canvasManager.activeComponent.data = componentData;
        this.canvasManager.canvas.functions["getCanvasSize"] = () => this.getCanvasSize();
        this.canvasManager.canvas.functions["saveActiveComponentData"] = () => this.saveComponentData();
        this.canvasManager.canvas.functions["parseSlideToCanvas"] = (slide :any[]) => this.parseSlideToCanvas(slide);
        this.canvasManager.canvas.functions["getComponentData"] = (id: string) => this.getComponentData(id);
    }

    getCanvasSize(){
        const canvas = document.getElementById("editorial-canvas");
        return { width : canvas?.offsetWidth, height : canvas?.offsetHeight };
    }

    getComponentData(id : string){
        return this.canvasManager.canvas.data.components.filter((component : any) => component.id === id)[0];
    }

    saveComponentData(){
        const slides : any[] = this.slideManager.slides;
        const activeSlide = slides[this.slideManager.activeSlide];
        const activeComponent = this.canvasManager.activeComponent;
        activeSlide[activeComponent.data.index] = {
            ...activeComponent.data.coreData,
            ...{ layout : activeComponent.data.layoutData },
            ...{ styles :activeComponent.data.styleData }
        }
        slides[this.slideManager.activeSlide] = activeSlide;
        this.slideManager.slides = slides;
    }

    parseSlideToCanvas(slide : any[]){
        const parsed = slide.map((item, index) => {
            const itemId = item.component + "-clone-" + Date.now() + index;
            console.log(itemId);
            return {
                ...item,
                id : itemId,
            }
        });
        this.canvasManager.canvas.data.components = parsed;
        return parsed;
    }
}

export const CreateEditorialManager = (slides : any[]) => (new EditorialManager(slides));