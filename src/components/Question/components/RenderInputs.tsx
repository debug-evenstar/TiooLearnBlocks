import { _getManager } from "apps/Editorial/Base/Manager";
import {
    InputInterface,
    InputLinkedStates,
} from "apps/Editorial/Sidebars/RightSidebar/Questions/ActiveQuestion";
import LayoutComponent from "components/LayoutBox";
import { CSSProperties, FC, useEffect, useRef } from "react";

const RenderInputs: FC<{
    inputs: any[];
    answered: any[];
    questionIndex: number;
}> = ({ inputs, answered, questionIndex }) => {
    const textFillRef = useRef<HTMLParagraphElement>(null);
    const animationStyle: CSSProperties = {
        transition: "transform 0.4s, text-shadow 0.4s",
        transitionTimingFunction: "linear",
        textShadow : "0px 0px 0px #fff"
    };
    const animate = () => {
        if ( textFillRef?.current ) {
            textFillRef?.current.style.setProperty("transform", "scale(1.5)");
            textFillRef?.current.style.setProperty("text-shadow", "0px 0px 15px #ffb870");
            setTimeout(() => { 
                textFillRef?.current && textFillRef?.current.style.setProperty("transform", "scale(1)");
                textFillRef?.current && textFillRef?.current.style.setProperty("text-shadow", "0px 0px 0px #fff");
            }, 400)
        }
    };

    useEffect(() => {
        if ((answered.length - 1) == questionIndex) {
            setTimeout(() => {
                animate();
            },50)
        }
    }, [answered, questionIndex]);
    return (
        <>
            {inputs.map((input: InputInterface, inputIndex: number) => {
                return input.linkState !== InputLinkedStates.Linked ? (
                    <LayoutComponent
                        key={inputIndex + input.title}
                        layout={input.layout ?? {}}
                    >
                        {answered.length <= questionIndex && (
                            <input
                                disabled={true}
                                className={`w-full h-full relative bg-white text-[14px] border-[0.5px] border-[#E5E5E5] rounded-[8px] p-[3px] shadow-md z-[50] shadow-[inset_0_0_6px_2px_rgba(155,41,178,0.6)]
                                    ${
                                        answered.length == questionIndex
                                            ? " input-is-active"
                                            : ""
                                    }
                                `}
                            />
                        )}
                        {answered.length > questionIndex && (
                            <div className="w-full h-full relative z-[50] flex justify-center items-center">
                                <p
                                    style={animationStyle}
                                    ref={textFillRef}
                                    className="font-bold text-[#089c28] text-[18px] scale-100"
                                >
                                    {answered[questionIndex].title}
                                </p>
                            </div>
                        )}
                    </LayoutComponent>
                ) : (
                    <div key={inputIndex + input.title}></div>
                );
            })}
        </>
    );
};

export default RenderInputs;
