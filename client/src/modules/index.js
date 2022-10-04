import { combineReducers, applyMiddleware } from "redux";

import userReducer from "./userReducer";
import stockReducer from "./stockReducer";
import weatherReducer from "./weatherReducer";
const rootReducer = combineReducers({
  userReducer,
  stockReducer,
  weatherReducer,
});

export default rootReducer;
