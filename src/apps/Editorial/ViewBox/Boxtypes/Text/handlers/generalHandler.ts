import { ManagerInterface } from "apps/Editorial/Base/Manager";


export const checkAndReturnOptions = (type: "OBJECTIVE" | "SUBJECTIVE") => {
  if (type === "OBJECTIVE") {
    return [
      {
        answer: false,
        content: "",
        feedback: {
          type: "",
          content: "",
        },
      },
      {
        answer: false,
        content: "",
        feedback: {
          type: "",
          content: "",
        },
      },
    ];
  } else {
    return [
      {
        answer: false,
        content: "",
        feedback: {
          type: "correct",
          content: "",
        },
      },
    ];
  }
};




// export const toggleTextStyle = (
//   style: string = "",
//   styleType: string
// ) => {
//   const range = getRange();

//   if (
//       range &&
//       range.toString() &&
//       range.startOffset !== range.endOffset
//   ) {
//       toggleWrapper(range, "span", style, styleType, "");
//       const active =
//           manager.canvasManager.activeComponentElement()?.children[0];
//       console.log(active);
//       manager.canvasManager.canvas.functions.updateActiveComponentData(
//           textComponentData(active.innerHTML)
//       );
//       return;
//   }

//   const element = editableRef.current;
//   if (!element) return;
//   toggleWrapperStyle(element, style, styleType);
//   const active =
//       manager.canvasManager.activeComponentElement()?.children[0];
//   manager.canvasManager.canvas.functions.updateActiveComponentData(
//       textComponentData(active.innerHTML)
//   );
// };