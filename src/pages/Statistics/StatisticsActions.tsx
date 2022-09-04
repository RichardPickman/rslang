import { IUser } from '../../types/types';
import StatisticsService from './../../services/statisticsService';

const getStatisticsActions = (user: IUser) => {
  return {
    getSprinStatistics() {
      return StatisticsService.getStatistics({userId: user.id, token: user.token})
      .then((stats) => stats.optional?.sprint)
      .catch((error) => {});
    }
  }
}

export default getStatisticsActions;