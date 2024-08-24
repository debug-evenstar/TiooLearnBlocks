import { FC } from "react";
interface UserProps {
    name: string;
    auth: string;
    base: string;
}
interface Props {
    data: any;
    user: UserProps;
    back: () => void;
    lessonList: any;
    refetch: () => void;
}
declare const Editorial: FC<Props>;
export default Editorial;
