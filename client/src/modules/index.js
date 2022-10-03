import { combineReducers, applyMiddleware } from "redux";

import userReducer from "./userReducer";
import stockReducer from "./stockReducer";
const rootReducer = combineReducers({
  userReducer,
  stockReducer,
});

export default rootReducer;
