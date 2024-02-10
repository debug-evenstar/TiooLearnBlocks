import React, { FC, useEffect, useState } from "react";
import { RiAddCircleLine, RiDeleteBinLine } from "react-icons/ri";
import { ManagerInterface } from "components/Editorial/Base/Manager";
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
  manager: ManagerInterface;
  index: number;
  data: any;
}

const Objective: FC<Props> = ({ manager, index, data }) => {
  const { identifier, correctOption, wrongOption } = manager.states.optionsData;
  const trigger = manager.states.trigger;

  const [isActive, setIsActive] = useState(false);

  const objectiveData: any = manager.canvasManager.activeComponent.data;
  const buttonsData: QuestionInterface = objectiveData.buttons;

  const [buttons, setButtons] = useState<QuestionInterface>();

  useEffect(() => {
    setButtons(buttonsData);
    setIsActive(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buttonsData, trigger]);

  const handleSetObjective = () => {
    if (buttons?.identifier) return;

    //replaceContent(questions, "OBJECTIVE", component);
    objectiveData.buttons = {
      identifier: `Input ${index + 1}`,
      options: [
        {
          answer: false,
          content: "",
          url: "",
        },
        {
          answer: false,
          content: "",
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

    if (!buttons?.options) return;
    const updatedQuestion = {
      ...buttons,
      options: [
        ...buttons.options.slice(0, optionIndex),
        ...buttons.options.slice(optionIndex + 1),
      ],
    };

    objectiveData.buttons.options = updatedQuestion.options;
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
          {buttons?.identifier && (
            <ObjectiveItem
              key={buttons.identifier}
              objective={buttons}
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
  const [buttons, setButtons] = useState<any>();
  const [addedOption, setAddedOption] = useState(false);

  const buttonsData: any = manager.canvasManager.activeComponent.data;
  const coreData = manager.canvasManager.activeComponent.data.buttons;

  useEffect(() => {
    setButtons(coreData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addedOption]);

  const addOption = (data: OptionInterface) => {
    buttonsData.buttons.options = [...buttonsData.buttons.options, data];

    setAddedOption(!addedOption);
    manager.setState("feedback", (prev: FeedbackState) => {
      return {
        ...prev,
        ...({
          optionIndex: buttons.options ? buttons.options.length : 0,
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
      buttonsData.buttons.options[index].url = url;
      manager.setState("trigger", (prev: any) => !prev);

      console.log(buttonsData.buttons.options, "url");
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
          {buttons &&
            buttons.options?.map((option: OptionInterface, i: any) => (
              <div key={i}>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <ChatIcon />
                    <p className="text-[12px] my-2 mr-2">{option.content}</p>
                  </div>
                  <div className="flex items-center gap-1 cursor-pointer">
                    <div>
                      {buttonsData.buttons.options[i].url?.length > 1 ? (
                        <img
                          src={buttonsData.buttons.options[i].url}
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
