import { ManagerInterface } from "components/Editorial/Base/Manager";
import { FC } from "react";
interface Props {
    manager: ManagerInterface;
    propertiesActiveState?: any;
    toggleTextPropertyActiveState?: any;
}
declare const TextProperties: FC<Props>;
export default TextProperties;
