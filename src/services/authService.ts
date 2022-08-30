import { ErrorsEnum, GetTokenResponse, IUserData, loginParams, SignInResponse, SignupValues } from '../types/types';
import { load } from './loader';

class AuthService {
  static async createUser(user: SignupValues): Promise<SignupValues> {
    return load<IUserData>({
      url: 'users',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then((response) => response)
    .catch((error: Error) => {
      if (error.message === ErrorsEnum.EMAIL_EXISTS){
        throw new Error(ErrorsEnum.EMAIL_EXISTS);
      }
      throw new Error(error.message);
    });
  };

  static async signin(user: loginParams): Promise<SignInResponse> {
    return load<SignInResponse>({
      url: 'signin',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
  };
  
  static async getToken(id: string, refreshToken: string ): Promise<GetTokenResponse> {
    return load<GetTokenResponse>({
      url: `users/${id}/tokens`,
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${refreshToken}`,
      },
    });
  };
}

export default AuthService;