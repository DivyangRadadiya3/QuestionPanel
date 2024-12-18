// import { useEffect } from "react";
import {
  legacy_createStore as createStore,
  compose,
  applyMiddleware,
} from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import rootReducer from "../reducers/index";
import loggerMiddleware from "../Middleware/Logger";
import monitorReducerEnhancer from "../Enhancer/MonitorReducer";

const middlewareEnhancer = applyMiddleware(loggerMiddleware, thunk);
const composedEnhancers = compose(middlewareEnhancer, monitorReducerEnhancer);

const loadDataFromStorage = () => {
  try {
    if (localStorage.getItem("classes")) {
      return JSON.parse(localStorage.getItem("classes"));
    } else {
      return undefined;
    }
  } catch (error) {
    console.warn(error.message);
  }
};

const Store = createStore(
  rootReducer,
  loadDataFromStorage(),
  composedEnhancers
);

export default Store;
