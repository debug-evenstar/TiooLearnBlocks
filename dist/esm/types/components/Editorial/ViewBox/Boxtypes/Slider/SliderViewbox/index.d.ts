import { FC } from "react";
import "react-resizable/css/styles.css";
import { EditorialManagerInterface } from "components/Editorial/Base/EditorialManager";
interface Props {
    id: string;
    manager: EditorialManagerInterface;
    handleDelete: Function;
    data: any;
    currIndex: number;
    isFlashcardDraggable: boolean;
    setIsFlashcardDraggable: React.Dispatch<React.SetStateAction<boolean>>;
}
declare const FlashcardViewBox: FC<Props>;
export default FlashcardViewBox;
