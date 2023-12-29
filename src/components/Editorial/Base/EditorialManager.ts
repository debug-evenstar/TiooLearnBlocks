
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

export interface EditorialManagerInterface {
    sidebarManager : DataGroupInterface;
    canvasManager : CanvasManagerInterface;
}


class EditorialManager implements EditorialManagerInterface {

    sidebarManager: DataGroupInterface = DataGroup;
    canvasManager: CanvasManagerInterface = CanvasManager;

    constructor() {
        console.log(this.canvasManager);
    }

}

export const CreateEditorialManager = () => (new EditorialManager());