import { combineReducers } from "redux";

import userReducer from "./userReducer";
import stockReducer from "./stockReducer";
import weatherReducer from "./weatherReducer";
import busReducer from "./busReducer";
const rootReducer = combineReducers({
  userReducer,
  stockReducer,
  weatherReducer,
  busReducer,
});

export default rootReducer;
