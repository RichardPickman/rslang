import { ErrorsEnum, UserStatistics, UserStatisticsBody } from "../types/types";
import { load } from "./loader";
interface getStatisticsParams {
  userId: string,
  token: string,
}

interface putStatisticsParams {
  userId: string,
  token: string,
  body: UserStatisticsBody,
}


class StatisticsService {
  static async getStatistics({ userId, token } : getStatisticsParams): Promise<UserStatistics> {
    return load<UserStatistics>({
      url: `users/${userId}/statistics`,
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
    .then((response) => response)
    .catch((error: Error) => {
        throw new Error(error.message);
    });
  };

  static async putStatistics({ userId, token, body } : putStatisticsParams): Promise<UserStatistics> {
    return load<UserStatistics>({
      url: `users/${userId}/statistics`,
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    .then((response) => response)
    .catch((error: Error) => {
      if (error.message === ErrorsEnum.NOT_FOUND) { 
        throw new Error(ErrorsEnum.NOT_FOUND);
      } else {
        throw new Error(error.message);
      }
    });
  };
}

export default StatisticsService;