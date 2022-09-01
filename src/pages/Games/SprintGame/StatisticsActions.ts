import StatisticsService from "../../../services/statisticsService";
import { ISetDailyStatistics, ISetUsedWords } from "../../../store/reducers/gameReducer/types";
import { UserStatisticsBody, ErrorsEnum, IUser, StatItem, GameWord } from "../../../types/types";

interface getStatisticsActionsParams {
  user: IUser | null,
  date: string,
  dailyStats: StatItem,
  gameWords: GameWord[],
  setDailyStatistics: (payload: StatItem) => ISetDailyStatistics,
  setUsedWords: (payload: string[]) => ISetUsedWords,
}

const getStatisticsActions = ({
  user,
  date,
  dailyStats,
  gameWords,
  setDailyStatistics,
  setUsedWords,
}: getStatisticsActionsParams) => {
  return {

    init(): void {
      if (!user) return;
      StatisticsService.getStatistics({ userId: user.id, token: user.token })
        .then((stats) => {
          const usedWords = stats.optional?.sprint.usedWords;
          if (usedWords) {
            setUsedWords(usedWords);
          }
          const daily = stats.optional?.sprint?.daily;
          if (daily) {
            if (daily[date]) {  // if there is stats for current date
              setDailyStatistics(daily[date]); // set stats in redux
            } else { 
              // if there is no stats for current date, but there are records for other dates
              // push stats for current  date
              const body: UserStatisticsBody = {
                optional: {
                  sprint: {
                    usedWords: stats.optional?.sprint.usedWords || [],
                    daily: { ...daily, [date]: dailyStats }
                  }
                }
              }
              StatisticsService.putStatistics({ userId: user.id, token: user.token, body })
                .then((response) => response)
                .catch((error: Error) => console.log(error.message))
            }
          } else {
            throw new Error(ErrorsEnum.NOT_FOUND);
          }
        })
        .catch((error: Error) => {
          if (error.message === ErrorsEnum.NOT_FOUND) {
            this.initStatisticsForCurrentdate();
          }
        });
    },

    initStatisticsForCurrentdate(): void {
      if (user) {
        const body: UserStatisticsBody = {
          optional: {
            sprint: {
              usedWords: gameWords.map((w) => w.id),
              daily: {
                [date]: dailyStats,
              }
            }
          }
        }
        StatisticsService.putStatistics({ userId: user.id, token: user.token, body })
          .then((response) => response)
          .catch((error: Error) => console.log(error.message))
      }
    },

    async updateUserStatistics(stats: StatItem) {
      if (!user) return;
      const userStat = await StatisticsService.getStatistics({ userId: user.id, token: user.token });
      const usedWords = userStat.optional?.sprint.usedWords || [];
      const daily = userStat.optional?.sprint.daily || {};
      const todayStats = daily[date];
      const updatedTodayStats: StatItem = {
        gameWordsNum: todayStats.gameWordsNum + stats.gameWordsNum,
        guessedWordsNum: todayStats.guessedWordsNum + stats.guessedWordsNum,
        newWords: [...todayStats.newWords, ...stats.newWords],
        percentage: Math.floor(100 * (todayStats.guessedWordsNum + stats.guessedWordsNum) / (todayStats.gameWordsNum + stats.gameWordsNum)),
        sequence: Math.max(todayStats.sequence, stats.sequence),
      };
      const body: UserStatisticsBody = {
        optional: {
          sprint: {
            usedWords: [...usedWords, ...stats.newWords],
            daily: { ...daily, [date]: updatedTodayStats }
          }
        }
      }
      StatisticsService.putStatistics({ userId: user.id, token: user.token, body });
    },
  }
}

export default getStatisticsActions;