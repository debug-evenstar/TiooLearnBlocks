import React, { FC, useEffect, useState } from "react";
import { EditorialManagerInterface } from "components/Editorial/Base/EditorialManager";
import { useDispatch, useSelector } from "react-redux";
import { handleToggleShowOptionBox } from "provider/showOptionsBoxSlice";
import {
  handleSetCorrectOption,
  handleSetObjectiveIndex,
  handleSetWrongOption,
  refreshOptionsData,
} from "provider/optionsDataSlice";

interface Props {
  manager: EditorialManagerInterface;
}

const Subjective: FC<Props> = ({ manager }) => {
  const selector: any = useSelector(handleSetCorrectOption);
  const id = selector.payload.activeViewbox.value;

  const [questions, setQuestions] = useState<any[]>([]);
  const replaceContent =
    manager.canvasManager.activeComponent.functions?.replaceContent;

  const dispatch = useDispatch();
  const { identifier, correctOption, wrongOption } = selector.payload
    .optionsData.value as {
    identifier: string;
    correctOption: string;
    wrongOption: string;
  };

  const [isActive, setIsActive] = useState(false);
  const coreData = manager.canvasManager.activeComponent.data.coreData;

  const handleSetObjective = () => {
    console.log(questions, "in objective");
    replaceContent(questions, "SUBJECTIVE");
    setIsActive(true);
    dispatch(refreshOptionsData());
  };

  const handleClick = () => {
    console.log(
      manager.canvasManager.activeComponent.data.coreData,
      "changed data"
    );
    if (questions.length > 0) {
      replaceContent(questions, "SUBJECTIVE");
      setIsActive(true);
      dispatch(handleToggleShowOptionBox());
      dispatch(handleSetObjectiveIndex(questions.length));
    }
    dispatch(handleSetCorrectOption(""));
    dispatch(handleSetWrongOption(""));
  };

  useEffect(() => {
    console.log(identifier, correctOption, wrongOption, " - Options");
  }, [identifier]);

  useEffect(() => {
    coreData?.questions?.forEach((question: any) => {
      if (
        question?.type === "SUBJECTIVE" &&
        question?.identifier.includes(id)
      ) {
        setQuestions([...questions, question]);
        console.log(question);
      }
    });
  }, [coreData, identifier]);

  return (
    <div className="p-2 shadow-md">
      <div
        className="w-full flex justify-between items-center cursor-pointer"
        onClick={handleSetObjective}
      >
        <p className="text-[13px]">Set Subjective</p>
      </div>

      {isActive && (
        <main>
          <div
            className="w-full flex justify-between items-center cursor-pointer"
            onClick={() => setIsActive(!isActive)}
          >
            <p className="text-[12px]">
              {questions &&
                questions?.map((sub: any, index: number) => (
                  <div
                    className="w-full flex justify-between items-center cursor-pointer"
                    onClick={() => setIsActive(!isActive)}
                  >
                    <p className="text-[12px]">
                      {isActive ? (
                        <b>Subjective {index + 1}</b>
                      ) : (
                        `Subjective ${index + 1}`
                      )}
                    </p>
                  </div>
                ))}
            </p>
          </div>
        </main>
      )}
    </div>
  );
};

export default Subjective;
