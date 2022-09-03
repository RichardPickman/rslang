import { GetUserRequest, GetUserResponse } from "../types/types";
import { load } from "./loader";

class UserService {
  static async getUser({ userId, token }: GetUserRequest): Promise<GetUserResponse> {
    return load<GetUserResponse>({
      url: `users/${userId}`,
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => response)
      .catch((error: Error) => { throw new Error(error.message) });
  };
}

export default UserService;