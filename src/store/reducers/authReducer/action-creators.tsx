import { Action, Dispatch } from "redux";
import { ErrorsEnum, IUser, LoginValues, SignupValues } from "../../../types/types"
import { AuthActions, AuthActionsEnum, ISetAuthAction, ISetTokenAction, ISetUserAction } from "./types"
import LocalStorage from '../../../services/localStorage';
import { RouteNames } from "../../../router";
import AuthService from "../../../services/authService";
import UserService from "../../../services/userService";
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { ThunkAction } from "redux-thunk";
import { RootState } from "../..";

const setAuthAction = (payload: boolean): ISetAuthAction => {
  return { type: AuthActionsEnum.SET_AUTH, payload };
}

const setUserAction = (payload: IUser): ISetUserAction => {
  return { type: AuthActionsEnum.SET_USER, payload };
}

const setTokenAction = (payload: string): ISetTokenAction => {
  return { type: AuthActionsEnum.SET_TOKEN, payload };
}

const signup =
  (values: SignupValues, navigate: NavigateFunction, onSignupFailed: () => void) => {
    return async function thunk(dispatch: Dispatch<AuthActions>): Promise<SignupValues | void> {
      return AuthService.createUser(values)
        .then((response) => {
          dispatch(setUserAction({ email: response.email, name: response.name }));
          dispatch(setAuthAction(true));
          navigate(RouteNames.HOMEPAGE, { replace: true });
          return response;
        })
        .catch((error: Error) => {
          console.log(error.message);
          if (error.message === ErrorsEnum.EMAIL_EXISTS) {
            onSignupFailed();
          }
        });
    }
  };

const login = (values: LoginValues, navigate: NavigateFunction, onLoginFailed: () => void) => {
  return (dispatch: Dispatch<AuthActions>) => {
    AuthService.signin(values)
      .then((response) => {
        UserService.getUser({ userId: response.userId, token: response.token })
          .then((response) => {
            dispatch(setAuthAction(true));
            dispatch(setUserAction({ email: response.email, name: response.name }));
            LocalStorage.setItem('userEmail', response.email);
            LocalStorage.setItem('userName', response.name);
            navigate(RouteNames.HOMEPAGE, { replace: true });
          })
      })
      .catch((error: Error) => {
        if (error.message === ErrorsEnum.INCORRECT_VALUES) {
          onLoginFailed();
        }
      });
  };
}

const logout = () => {
  return (dispatch: Dispatch<AuthActions>) => {
    LocalStorage.clear();
    dispatch(setAuthAction(false));
    dispatch(setUserAction({} as IUser))
  };
}

export const AuthActionCreators = {
  setAuthAction,
  setUserAction,
  setTokenAction,
  login,
  logout,
  signup,
}
