import { Progress } from 'antd';
import React from 'react';
import { useAppSelector } from '../../../hooks/useAppSelector';

const ResultCard = () => {
  const { points, learnedWords, failedWords } = useAppSelector((state) => state.game);
  const percent = Math.floor((learnedWords.length * 100) / (learnedWords.length + failedWords.length))

  return (
    <div>
      <p>Твой Результат</p>
      <span>{points} баллов</span>
      <div>
        <Progress
          type="circle"
          strokeColor={{
            '0%': '#108ee9',
            '100%': '#87d068',
          }}
          percent={percent}
          format={(percent) => `${percent}%`}
        /></div>
    </div>
  );
};

export default ResultCard;