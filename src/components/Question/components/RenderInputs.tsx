import { _getManager } from "apps/Editorial/Base/Manager";
import {
    InputInterface,
    InputLinkedStates,
} from "apps/Editorial/Sidebars/RightSidebar/Questions/ActiveQuestion";
import LayoutComponent from "components/LayoutBox";
import { FC } from "react";

const RenderInputs: FC<{
    inputs: any[];
    answered: any[];
    questionIndex: number;
}> = ({ inputs, answered, questionIndex }) => {
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
                                    ${answered.length == questionIndex ? ' input-is-active' : ''}
                                `}
                            />
                        )}
                        {answered.length > questionIndex && (
                            <div className="w-full h-full relative z-[50] flex justify-center items-center">
                                <p className="font-bold text-[#409972] text-[18px]">
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
