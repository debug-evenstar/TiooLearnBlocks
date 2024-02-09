import { EditorialManagerInterface } from "components/Editorial/Base/EditorialManager";
import { FC } from "react";
interface Props {
    id: string;
    manager: EditorialManagerInterface;
    viewBoxRef: any;
    image: any;
}
declare const Image: FC<Props>;
export default Image;
export interface UploadIconProps {
    handleChange: (e: any) => void;
    handleDrop: (e: any) => void;
    manager: EditorialManagerInterface;
}
