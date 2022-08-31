import { Dispatch } from "redux";
import { ErrorsEnum, IUser, LoginValues, SignupValues } from "../../../types/types"
import { AuthActions, AuthActionsEnum, ISetAuthAction, ISetTokenAction, ISetUserAction } from "./types"
import LocalStorage from '../../../services/localStorage';
import { RouteNames } from "../../../router";
import AuthService from "../../../services/authService";
import UserService from "../../../services/userService";
import { NavigateFunction } from 'react-router-dom';

const setAuthAction = (payload: boolean): ISetAuthAction => {
  return { type: AuthActionsEnum.SET_AUTH, payload };
}

const setUserAction = (payload: IUser): ISetUserAction => {
  return { type: AuthActionsEnum.SET_USER, payload };
}

const setTokenAction = (payload: string): ISetTokenAction => {
  return { type: AuthActionsEnum.SET_TOKEN, payload };
}
interface signupParams {
  values: SignupValues,
  navigate: NavigateFunction,
  onSignupSuccess: () => void,
  onSignupFailed: () => void,
}
const signup =
  ({ values, onSignupSuccess, onSignupFailed }: signupParams) => {
    return async function thunk(dispatch: Dispatch<AuthActions>): Promise<SignupValues | void> {
      return AuthService.createUser(values)
        .then((response) => {
          onSignupSuccess();
          return response;
        })
        .catch((error: Error) => {
          if (error.message === ErrorsEnum.EMAIL_EXISTS) {
            onSignupFailed();
          }
        });
    }
  };

const login = (values: LoginValues, navigate: NavigateFunction, onLoginFailed: () => void, location: string) => {
  return (dispatch: Dispatch<AuthActions>) => {
    AuthService.signin(values)
      .then((response) => {
        UserService.getUser({ userId: response.userId, token: response.token })
          .then((res) => {
            dispatch(setAuthAction(true));
            const newUser: IUser = {
              id: response.userId,
              token: response.token,
              refreshToken: response.refreshToken,
              email: res.email,
              name: res.name,
            }
            dispatch(setUserAction(newUser));
            LocalStorage.setItem('user', newUser);
            navigate(location || RouteNames.HOMEPAGE, { replace: true });
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
