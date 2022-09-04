import { Radio, RadioChangeEvent } from 'antd';
import React, { useState } from 'react';
import { useActions } from '../../../hooks/useActions';
import { GamePhase } from '../../../types/types';
import {generateRandomWords} from './utils';
import './styles.scss';

const Levels = () => {
  const [value, setValue] = useState();
  const { setPhaseAction, setGameWordsAction, setFetchedWordsAction } = useActions();
  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
    generateRandomWords({group: e.target.value, amount: 80})
    .then(({gameWords, fetchedWords}) => {
      setGameWordsAction(gameWords);
      setFetchedWordsAction(fetchedWords);
      setPhaseAction(GamePhase.STARTED);
    })
    .catch((error) => console.log(error));
  }; 
  return (
    <div className={'levels'}>
      <p className={'levels__title'}>Выбери уровень сложности</p>
      <Radio.Group onChange={onChange} value={value} className={'radio-group'}>
        <Radio value={0} className={'radio-value'}>Extra Easy</Radio>
        <Radio value={1} className={'radio-value'}>Easy</Radio>
        <Radio value={2} className={'radio-value'}>Medium</Radio>
        <Radio value={3} className={'radio-value'}>Medium+</Radio>
        <Radio value={4} className={'radio-value'}>Hard</Radio>
        <Radio value={5} className={'radio-value'}>Extra Hard</Radio>
      </Radio.Group>
    </div>
  );
};

export default Levels;