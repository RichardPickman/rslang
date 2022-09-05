import { Progress } from 'antd';
import React from 'react';
import { useAppSelector } from '../../../hooks/useAppSelector';

const ResultCard = () => {
  const { points, percentage } = useAppSelector((state) => state.game);
  return (
    <div className='results'>
      <p className='results__text'>Твой результат:</p>
      <span className='results__points'>{points} баллов</span>
      <div className='results__progress'>
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