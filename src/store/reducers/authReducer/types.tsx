import { IUser } from '../../../types/types';

export enum AuthActionsEnum {
  SET_AUTH = 'set_auth',
  SET_USER = 'set_user',
  SET_TOKEN = 'set_token',
}

export interface ISetAuthAction {
  type: AuthActionsEnum.SET_AUTH,
  payload: boolean,
}

export interface ISetUserAction {
  type: AuthActionsEnum.SET_USER,
  payload: IUser,
}

export interface ISetTokenAction {
  type: AuthActionsEnum.SET_TOKEN,
  payload: string,
}

export type AuthActions = ISetUserAction | ISetAuthAction | ISetTokenAction;