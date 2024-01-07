import { configureStore, combineReducers } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";
import rightSidebarSlice from "./rightSidebarSlice";
import dragItemsSlice from "./dragItemsSlice";
import activeViewboxSlice from "./activeViewboxSlice";
import showOptionsBoxSlice from "./showOptionsBoxSlice";
import optionsDataSlice from "./optionsDataSlice";

const rootReducer = combineReducers({
  rightSidebarState: rightSidebarSlice,
  dragItems: dragItemsSlice,
  activeViewbox: activeViewboxSlice,
  showOptionsBox: showOptionsBoxSlice,
  optionsData: optionsDataSlice,
});

const persistedReducer = persistReducer(
  {
    key: "root",
    storage: AsyncStorage,
    version: 0,
    blacklist: ["rightSidebarState", "showOptionsBox", "optionsData"],
  },
  rootReducer
);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export default store;
