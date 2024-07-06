import { createContext, useContext } from "react";

// Some type updates here later
export const LessonContext : any = createContext(null);
export const useLessonContext : any = () => {
  return useContext(LessonContext);
};
