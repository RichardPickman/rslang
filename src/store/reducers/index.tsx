import { combineReducers } from "redux";
import TextbookReducer from './textbookReducer/index';

export const rootReducer = combineReducers({
  textbook: TextbookReducer,
});