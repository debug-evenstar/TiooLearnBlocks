import Background from "./Background";
import Delete from "./Delete";
import Extensions from "./Extensions";
import TextProperties from "./TextProperties";
import ImageProperties from "./Image/ImageProperties";
import VideoProperties from "./VideoProperties";
import AddImages from "./FlashCard/AddImages";
import AddGrid from "./Grid/AddGrid";
import EditGrid from "./Grid/EditGrid";
import GridType from "./Grid/GridType/GridType";
import GridTheme from "./Grid/GridTheme/GridTheme";
import GridExtensions from "./Grid/GridExtensions";
import { ManagerInterface } from "apps/Editorial/Base/Manager";

// for editing in rightsidebar
export const EditProperties = (id: string, manager: ManagerInterface) => {
    const canvas = manager.canvasManager.canvas;
    const componentName = canvas.getOriginalName(id);
    
    const viewboxTypes: {
        [key: string]: JSX.Element;
    } = {
        Text: (
            <>
                <TextProperties manager={manager} />
                <Background manager={manager} />
                <Delete id={id} manager={manager} />
            </>
        ),
        Image: (
            <>
                <ImageProperties manager={manager} />
                <Delete id={id} manager={manager} />
            </>
        ),
        Video: (
            <>
                <VideoProperties manager={manager} />
                <Delete id={id} manager={manager} />
            </>
        ),
        FlashCards: (
            <>
                <AddImages id={id} manager={manager} />
                <ImageProperties manager={manager} />
                <Delete id={id} manager={manager} />
            </>
        ),
        Grid: (
            <>
                <AddGrid />
                <EditGrid manager={manager} />
                <GridType manager={manager} />
                <GridTheme />
                <GridExtensions manager={manager} />
            </>
        ),
    };
    return viewboxTypes[componentName];
};
