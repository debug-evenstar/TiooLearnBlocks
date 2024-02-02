import React, { FC, useEffect, useRef, useState } from "react";
import Image from "./Image";
import { Resizable } from "react-resizable";
import { toggleWrapperStyle } from "../Text/handlers/stylesHandler";
import { setComponentLayout } from "components/Editorial/Base/EditorialManager";
import {
  ComponentBaseDataInterface,
  QuestionInterface,
} from "components/interface";
import { useDispatch, useSelector } from "react-redux";
import { refreshToggleSidebarState } from "provider/rightSidebarSlice";
import FlashcardObjectivesInputs from "components/Editorial/Sidebars/RightSidebar/EditProperties/FlashCard/ObjectiveInputs";
import { handleSetObjectiveIndex } from "provider/optionsDataSlice";
import { getOriginalName } from "../../handler";
import { OptionsDataState } from "components/Editorial/Base/StateInterface";

const Flashcard: FC<any> = ({ id, manager, image, index }) => {
  const activeId = manager.states.activeViewBox;
  const showOptionsBox = manager.states.showOptionsBox;

  const [viewBoxSize, setViewBoxSize] = useState({
    width: 300,
    height: id.includes("Text") ? 65 : 280,
  });

  //const [isEditable, setIsEditable] = useState(false);

  const viewBoxRef = useRef<HTMLDivElement | null>(null);

  const updateComponentLayout = (width: number, height: number) => {
    manager.canvasManager.activeComponent.data.layoutData = setComponentLayout(
      manager.canvasManager.canvas.functions?.getCanvasSize(),
      {
        ...manager.canvasManager.getComponentData(id).layout,
        size: { width, height },
      }
    );
    manager.canvasManager.canvas.functions.saveActiveComponentData();
  };

  const onResize = (event: any, { node, size, handle }: any) => {
    setViewBoxSize({ width: size.width, height: size.height });
    updateComponentLayout(size.width, size.height);
  };

  const loadSize = (component: ComponentBaseDataInterface) => {
    if (component.layout && component.layout.size) {
      setViewBoxSize({
        height: component.layout.size.height,
        width: component.layout.size.width,
      });
    }
  };

  const height = id.includes("Text") ? 60 : 65;

  useEffect(() => {
    manager.canvasManager.activeComponent.functions["toggleViewboxStyle"] = (
      style: string = "",
      styleType: string
    ) => {
      const element = viewBoxRef.current;
      if (!element) return;
      toggleWrapperStyle(element, style, styleType);
    };
  }, [manager]);

  useEffect(() => {
    const component = manager.canvasManager.getComponentData(id);

    if (!component.layout?.size) {
      // Default Layout
      const layout = setComponentLayout(
        manager.canvasManager.canvas.functions?.getCanvasSize(),
        { size: { width: 300, height } }
      );
      manager.slideManager.saveComponentData(
        manager.canvasManager.getComponentIndex(id),
        { layout }
      );
    }
  }, []);

  useEffect(() => {
    const component = manager.canvasManager.getComponentData(id);
    loadSize(component);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const trigger = manager.states.trigger;
  const cardsIndex = manager.canvasManager.activeComponent.data.index;
  const cardData =
    getOriginalName(id) === "Flash Card"
      ? manager.canvasManager.activeComponent.data.components[cardsIndex]
          ?.cards[index]
      : {
          question: [],
        };

  const [card, setCard] = useState<any>(null);
  const [question, setQuestion] = useState<QuestionInterface | null>(null);

  useEffect(() => {
    manager.setState("optionsData", (prev: OptionsDataState) => {
      return { ...prev, ...({ objectiveIndex: index } as OptionsDataState) };
    });
    const question: QuestionInterface | null = cardData?.question
      ? cardData.question
      : null;
    setQuestion(question);

    if (question && question.type === "OBJECTIVE") {
      setCard(cardData);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardData, trigger, index]);

  return (
    <>
      <Resizable
        width={viewBoxSize.width}
        height={viewBoxSize.height}
        minConstraints={[280, height]}
        onResize={onResize}
        resizeHandles={["s", "e", "se"]}
      >
        <div
          ref={viewBoxRef}
          className={`border-dotted m-5 p-2 border-2 border-slate-500 rounded`}
          style={{
            width: viewBoxSize.width + "px",
            height: viewBoxSize.height + "px",
          }}
        >
          <Image
            id={id}
            manager={manager}
            viewBoxRef={viewBoxRef}
            image={image}
          />
        </div>
      </Resizable>

      {activeId === id && question && (
        <div className="z-[500]">
          <FlashcardObjectivesInputs manager={manager} />
        </div>
      )}
    </>
  );
};

export default Flashcard;
