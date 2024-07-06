import { FC } from "react";
import "react-resizable/css/styles.css";
import { ManagerInterface } from "components/Editorial/Base/Manager";
interface Props {
    id: string;
    manager: ManagerInterface;
    handleDelete: Function;
    data: any;
    currIndex: number;
    isFlashcardDraggable: boolean;
    setIsFlashcardDraggable: React.Dispatch<React.SetStateAction<boolean>>;
}
declare const FlashcardViewBox: FC<Props>;
export default FlashcardViewBox;
