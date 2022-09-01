import { Progress } from 'antd';
import React from 'react';
import { useAppSelector } from '../../../hooks/useAppSelector';

const ResultCard = () => {
  const { points, percentage } = useAppSelector((state) => state.game);
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
          percent={percentage}
          format={(percent) => `${percent}%`}
        /></div>
    </div>
  );
};

export default ResultCard;