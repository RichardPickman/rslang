import React from 'react';
import { Statistic } from 'antd';

interface TimerParams {
  time: number,
  onFinish: () => void,
}
const Timer = ({ time, onFinish }: TimerParams) => {
  const targetTime = new Date().getTime() + time;
  return (
    <Statistic.Countdown style={{ fontSize: 20 }} value={targetTime} format='ss' onFinish={onFinish} />
  );
};

export default React.memo(Timer);