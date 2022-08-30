import { combineReducers } from "redux";
import AuthReducer from "./authReducer";
import GameReducer from "./gameReducer";
import TextbookReducer from './textbookReducer/index';

export const rootReducer = combineReducers({
  textbook: TextbookReducer,
  auth: AuthReducer,
  game: GameReducer,
});