import { combineReducers } from "redux";
import AuthReducer from "./authReducer";
import TextbookReducer from './textbookReducer/index';

export const rootReducer = combineReducers({
  textbook: TextbookReducer,
  auth: AuthReducer,
});