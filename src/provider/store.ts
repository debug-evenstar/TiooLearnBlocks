import { configureStore, combineReducers } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";
import rightSidebarSlice from "./rightSidebarSlice";
import dragItemsSlice from "./dragItemsSlice";
import activeViewboxSlice from "./activeViewboxSlice";

const rootReducer = combineReducers({
  rightSidebarState: rightSidebarSlice,
  dragItems: dragItemsSlice,
  activeViewbox: activeViewboxSlice,
});

const persistedReducer = persistReducer(
  {
    key: "root",
    storage: AsyncStorage,
    version: 0,
    //whitelist: ["rightSidebarState"],
  },
  rootReducer
);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export default store;
