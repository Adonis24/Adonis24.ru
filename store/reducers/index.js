import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import session from "redux-persist/lib/storage/session"; // defaults to localStorage for web
//import AsyncStorage from "@react-native-community/async-storage";
//import { CookieStorage } from "redux-persist-cookie-storage";
//import Cookies from "cookies-js";

import cartSlice from "../cartSlice";
import DialogSlice from "../DialogSlice";
import ExpandSlice from "../ExpandSlice";
// WHITELIST
const persistConfig = {
  key: "root",
  // storage: new CookieStorage(Cookies), //session,
  storage: session,
  whitelist: ["cartSlice","DialogSlice","ExpandSlice"] // only card will be persisted
};

const rootReducer = combineReducers({
cartSlice,
DialogSlice,ExpandSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
