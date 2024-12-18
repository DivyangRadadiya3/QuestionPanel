import { combineReducers } from "redux";
import DataProvider from "./DataProvider";
import Authentication from "./Authentication";

const rootReducer = combineReducers({
  authConfig: Authentication,
  userConfig: DataProvider,
});

export default rootReducer;
