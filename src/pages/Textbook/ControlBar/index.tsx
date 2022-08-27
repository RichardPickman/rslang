import React from 'react';
import { IWord } from '../../../types/types';
import styles from './styles.module.scss';
import DifficultWordSVG from '../../../assets/img/words/graduation-cap.svg';
import DeleteSVG from '../../../assets/img/words/delete-icon.svg';

interface ControlBar {
  word: IWord,
  onDifficultWordBtnClick: (id: string, word: string) => void,
  removeFromDifficultWords: (id: string, word: string) => void,
}

const ControlBar = ({ word, onDifficultWordBtnClick, removeFromDifficultWords }: ControlBar) => {
  return (
    <div>
      {word.isDifficult ?
        <button
          type="button"
          className={`${styles['btn']} ${styles['btn_delete']}`}
          title='Убрать из раздела "Сложные слова"'
          onClick={(e) => {
            e.stopPropagation();
            removeFromDifficultWords(word._id as string || word.id, word.word);
          }}
        >
          <img src={DeleteSVG} alt='delete icon' />
        </button> :
        <button
          type="button"
          className={`${styles['btn']} ${styles['btn_add']}`}
          title='Добавить в раздел "Сложные слова"'
          onClick={() => onDifficultWordBtnClick(word.id, word.word)}
        >
          <img src={DifficultWordSVG} alt='graduation cap' />
        </button>
      }
    </div>
  );
};

export default ControlBar;