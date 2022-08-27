import { IUser } from "../../../types/types";
import { AuthActions, AuthActionsEnum } from "./types";

export interface AuthState {
  isAuth: boolean,
  user: IUser | null,
  token: string,
}

const initialState: AuthState = {
  isAuth: false,
  user: null,
  token: ''
};

const AuthReducer = (state: AuthState = initialState, action: AuthActions) => {
  switch (action.type) {
    case (AuthActionsEnum.SET_AUTH): {
      return { ...state, isAuth: action.payload }
    }
    case (AuthActionsEnum.SET_USER): {
      return { ...state, user: action.payload }
    }
    case (AuthActionsEnum.SET_TOKEN): {
      return { ...state, token: action.payload }
    }
    default:
      return state;
  }
}

export default AuthReducer;