import {MdArrowBack} from "react-icons/md";
import {FC} from "react";

const PreviewLayout :FC<{
    children : any,
    subject : any,
    title : any
}> = ({children, subject, title}) => {
    return (
        <div>
            <div className="lg:pt-8 w-full grow bg-orange-400 overflow-y-hidden">
                <p>Big preview screen</p>
                {children}
            </div>
        </div>
    );
}

export default PreviewLayout;