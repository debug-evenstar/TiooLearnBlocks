import { configureStore, combineReducers } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";
import rightSidebarSlice from "./rightSidebarSlice";
import dragItemsSlice from "./dragItemsSlice";
import activeViewboxSlice from "./activeViewboxSlice";
import showOptionsBoxSlice from "./showOptionsBoxSlice";
import optionsDataSlice from "./optionsDataSlice";
import feedbackSlice from "./feedbackSlice";

const rootReducer = combineReducers({
  rightSidebarState: rightSidebarSlice,
  dragItems: dragItemsSlice,
  activeViewbox: activeViewboxSlice,
  showOptionsBox: showOptionsBoxSlice,
  optionsData: optionsDataSlice,
  feedback: feedbackSlice,
});

const persistedReducer = persistReducer(
  {
    key: "root",
    storage: AsyncStorage,
    version: 0,
    blacklist: [
      "rightSidebarState",
      "showOptionsBox",
      "optionsData",
      "feedback",
    ],
  },
  rootReducer
);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export default store;
