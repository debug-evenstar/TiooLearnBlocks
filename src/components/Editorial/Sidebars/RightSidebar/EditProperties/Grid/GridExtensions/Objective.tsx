import React, { FC, useEffect, useState } from "react";
import { RiAddCircleLine, RiDeleteBinLine } from "react-icons/ri";
import { EditorialManagerInterface } from "components/Editorial/Base/EditorialManager";
import { ObjectiveItemProp } from "components/Editorial/Sidebars/RightSidebar/EditProperties/Extensions/interfaces";
import { OptionInterface, QuestionInterface } from "components/interface";
import FeedbackIcon from "FigmaIcons/FeedbackIcon";
import ChatIcon from "FigmaIcons/ChatIcon";
import {
  FeedbackState,
  OptionsDataState,
} from "components/Editorial/Base/StateInterface";
import ImageIcon, { GridOptionImageIcon } from "FigmaIcons/ImageIcon";
import { uploadFile } from "components/Editorial/ViewBox/Boxtypes/Image/handler";

interface Props {
  manager: EditorialManagerInterface;
  index: number;
  data: any;
}

const Objective: FC<Props> = ({ manager, index, data }) => {
  const { identifier, correctOption, wrongOption } = manager.states.optionsData;
  const trigger = manager.states.trigger;

  const [isActive, setIsActive] = useState(false);

  const objectiveData: any = manager.canvasManager.activeComponent.data;
  const questionData: QuestionInterface = objectiveData.question;

  const [question, setQuestion] = useState<QuestionInterface>();

  useEffect(() => {
    if (questionData && questionData.type === "OBJECTIVE") {
      setQuestion(questionData);
      setIsActive(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionData, trigger]);

  const handleSetObjective = () => {
    if (question?.identifier) return;

    //replaceContent(questions, "OBJECTIVE", component);
    objectiveData.question = {
      type: "OBJECTIVE",
      identifier: `Input ${index + 1}`,
      options: [
        {
          answer: false,
          content: "Option 1",
          url: "",
        },
        {
          answer: false,
          content: "Option 2",
          url: "",
        },
      ],
      answers: [""],
    };

    setIsActive(true);
    manager.setState("showOptionsBox", (prev: any) => !prev);
    manager.setState("optionsData", {
      identifier: "",
      correctOption: "",
      wrongOption: "",
      objectiveIndex: 0,
    });
    manager.setState("optionsData", (prev: OptionsDataState) => {
      return { ...prev, ...({ objectiveIndex: index } as OptionsDataState) };
    });
    manager.setState("trigger", (prev: any) => !prev);
  };

  const handleDelete = (id: string, optionIndex: number) => {
    // Find the question to update

    if (!question?.options) return;
    const updatedQuestion = {
      ...question,
      options: [
        ...question.options.slice(0, optionIndex),
        ...question.options.slice(optionIndex + 1),
      ],
    };

    objectiveData.question.options = updatedQuestion.options;
    manager.setState("trigger", (prev: any) => !prev);
  };

  return (
    <div className="my-1 shadow-md">
      <div
        className="w-full flex justify-between items-center cursor-pointer"
        onClick={handleSetObjective}
      >
        <p className="text-[13px]">Set Objective</p>
      </div>

      {isActive && (
        <main className="w-full p-2">
          {question?.identifier && (
            <ObjectiveItem
              key={question.identifier}
              objective={question}
              index={index}
              data={data}
              handleDelete={handleDelete}
              manager={manager}
            />
          )}
        </main>
      )}
    </div>
  );
};

export default Objective;

export const ObjectiveItem: FC<ObjectiveItemProp> = ({
  objective,
  index,
  data,
  handleDelete,
  manager,
}) => {
  const { status: optionStatus, type } = manager.states.feedback;
  const [isActive, setIsActive] = useState(true);
  const [question, setQuestion] = useState<any>();
  const [addedOption, setAddedOption] = useState(false);

  const objectiveData: any = manager.canvasManager.activeComponent.data;
  const coreData = manager.canvasManager.activeComponent.data.question;

  useEffect(() => {
    setQuestion(coreData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addedOption]);

  const addOption = (data: OptionInterface) => {
    objectiveData.question.options = [...objectiveData.question.options, data];

    setAddedOption(!addedOption);
    manager.setState("feedback", (prev: FeedbackState) => {
      return {
        ...prev,
        ...({
          optionIndex: question.options ? question.options.length : 0,
        } as FeedbackState),
      };
    });
  };

  const deleteOption = (i: number) => {
    handleDelete(objective.identifier, i);
    setAddedOption(!addedOption);
  };

  const handleOpenObjective = () => {
    manager.setState("optionsData", (prev: OptionsDataState) => {
      return { ...prev, ...({ objectiveIndex: index } as OptionsDataState) };
    });
    setIsActive(!isActive);
  };

  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    e.preventDefault();
    if (!e.target.files) return;
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      //const imageUrl = URL.createObjectURL(selectedFile);
      const url = await uploadFile(473, selectedFile);
      objectiveData.question.options[index].url = url;
      manager.setState("trigger", (prev: any) => !prev);

      console.log(objectiveData.question.options, "url");
    }
  };

  return (
    <div className="py-1">
      <div
        className="w-full flex justify-between items-center cursor-pointer"
        onClick={handleOpenObjective}
      >
        <p className="text-[12px]">
          {isActive ? <b>Objective</b> : `Objective`}
        </p>
      </div>

      {isActive && (
        <main className="w-full p-2">
          {question &&
            question.options?.map((option: OptionInterface, i: any) => (
              <div key={i}>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <ChatIcon />
                    <p className="text-[12px] my-2 mr-2">{option.content}</p>
                  </div>
                  <div className="flex items-center gap-1 cursor-pointer">
                    <div>
                      {objectiveData.question.options[i].url?.length > 1 ? (
                        <img
                          src={objectiveData.question.options[i].url}
                          alt="placeholder"
                          className="w-4 h-4"
                          draggable={false}
                        />
                      ) : (
                        <GridOptionImageIcon
                          index={i}
                          handleChange={handleChange}
                        />
                      )}
                    </div>
                    <RiDeleteBinLine onClick={() => deleteOption(i)} />
                  </div>
                </div>
              </div>
            ))}

          <div
            className="flex justify-between py-2 items-center cursor-pointer"
            onClick={() =>
              addOption({
                answer: false,
                content: "",
                feedback: {
                  type: "",
                  content: "",
                },
              })
            }
          >
            <p className="text-[12px]">Add option</p>
            <RiAddCircleLine size={"13px"} color="grey" />
          </div>
        </main>
      )}
    </div>
  );
};
