import { Segmented } from 'antd';
import Card from 'antd/lib/card/Card';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useActions } from '../../../hooks/useActions';
import { RouteNames } from '../../../router';
import { GamePhase, StatItem } from '../../../types/types';
import LearnedWords from './WordsStatistics';
import ResultCard from './ResultCard';
import { handleUserWords } from './handleUserWords';
import { useAppSelector } from '../../../hooks/useAppSelector';
import getStatisticsActions from './StatisticsActions';

const GameStatistics = () => {
  const [value, setValue] = useState<string | number>('Результат');
  const navigate = useNavigate();
  const { phase, maxsequence, gameWords, usedWords, date, dailyStats,
    learnedWords, failedWords } = useAppSelector((state) => state.game);
    const { isAuth, user } = useAppSelector((state) => state.auth);
    const { setPhaseAction, setDailyStatistics, setUsedWords, setPercentageAction } = useActions();
  const statsActions = getStatisticsActions({ user, gameWords, date, dailyStats, setDailyStatistics, setUsedWords });
  const displayedWords = [...learnedWords, ...failedWords];
  const percent = Math.floor((learnedWords.length * 100) / (learnedWords.length + failedWords.length));

  useEffect(() => {
    handleUserWords({ phase, isAuth, displayedWords, user, learnedWords });
    setPercentageAction(percent);
    const newWords = displayedWords.filter((gw) => !usedWords.includes(gw.id)).map((w) => w.id);
    const gameStat: StatItem = {
      gameWordsNum: displayedWords.length,
      guessedWordsNum: learnedWords.length,
      newWords,
      percentage: percent,
      sequence: maxsequence,
    };
    statsActions.updateUserStatistics(gameStat);
  }, []);

  const changePage = (value: string | number) => setValue(value);
  const startNewGame = () => setPhaseAction(GamePhase.INIT);
  const redirectToTextbook = () => navigate(`${RouteNames.TEXTBOOK}`);

  return (
    <div>
      <Card style={{ margin: '0 auto', width: '60%' }}>
        <Segmented options={['Результат', 'Посмотреть слова']} value={value} onChange={(value) => changePage(value)} />
        {value === 'Результат' && <ResultCard />}
        {value === 'Посмотреть слова' && <LearnedWords />}
        <div>
          <button type="button" onClick={startNewGame}>Новая игра</button>
          <button type="button" onClick={redirectToTextbook}>Перейти в учебник</button>
        </div>
      </Card>
    </div>
  );
};

export default GameStatistics;