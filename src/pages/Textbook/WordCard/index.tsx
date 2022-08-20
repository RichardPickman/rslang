import React from 'react';
import { IWord } from './../../../types/types';
import styles from './styles.module.scss';

interface WordCardProps {
  word: IWord,
  onCardClick: (word: IWord) => void,
  selected: boolean,
}
const WordCard = ({ word, onCardClick, selected }: WordCardProps) => {
  return (
    <div className={`${styles.item} ${selected && styles.item_selected}`} onClick={() => onCardClick(word)}>
      <p>{word.word}</p>
      <p>{word.wordTranslate}</p>
    </div>
  );
};

export default WordCard;