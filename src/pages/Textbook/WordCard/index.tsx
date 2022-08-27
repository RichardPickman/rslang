import React from 'react';
import { IWord } from '../../../types/types';
import styles from './styles.module.scss';
import ControlBar from '../ControlBar';
import { useAppSelector } from '../../../hooks/useAppSelector';

interface WordCardProps {
  word: IWord,
  selected: boolean,
  onCardClick: (word: IWord) => void,
  addToDifficultWords: (id: string, word: string) => void,
  removeFromDifficultWords: (id: string, word: string) => void,
}
const WordCard = ({ word, onCardClick, selected, addToDifficultWords, removeFromDifficultWords }: WordCardProps) => {
  const { isAuth } = useAppSelector((state) => state.auth);
  return (
    <div 
    className={`
    ${styles.item} 
    ${selected && styles.item_selected}
    ${word.isDifficult && styles.item_difficult}`} 
    onClick={() => onCardClick(word)}>
      <p>{word.word}</p>
      <p>{word.wordTranslate}</p>
      {isAuth && <ControlBar
        word={word}
        onDifficultWordBtnClick={addToDifficultWords}
        removeFromDifficultWords={removeFromDifficultWords}
 />
      }
    </div>
  );
};

export default WordCard;