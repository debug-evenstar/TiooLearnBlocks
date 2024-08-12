import { ManagerInterface } from "components/Editorial/Base/Manager";
import { FC } from "react";
interface Props {
    id: string;
    manager: ManagerInterface;
    viewBoxRef: any;
    image: any;
}
declare const Image: FC<Props>;
export default Image;
export interface UploadIconProps {
    handleChange: (e: any) => void;
    handleDrop: (e: any) => void;
    manager: ManagerInterface;
}
