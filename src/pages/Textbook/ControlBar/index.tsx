import React from 'react';
import { DisplayedWord } from '../../../types/types';
import styles from './styles.module.scss';
import DifficultWordSVG from '../../../assets/img/words/graduation-cap.svg';
import DeleteSVG from '../../../assets/img/words/delete-icon.svg';
import { IUserWord } from './../../../types/types';

interface ControlBar {
  word: DisplayedWord,
  onDifficultWordBtnClick: (id: string, word: string) => void,
  removeFromDifficultWords: (id: string, word: string) => void,
}

const ControlBar = ({ word, onDifficultWordBtnClick, removeFromDifficultWords }: ControlBar) => {
  const isDifficultValue = word.userWord?.optional?.isDifficult;
  const isDifficult = isDifficultValue ? JSON.parse(isDifficultValue.toLowerCase()) : false;

  return (
    <div>
      {
        isDifficult ?
          <button
            type="button"
            className={`${styles['btn']} ${styles['btn_delete']}`}
            title='Убрать из раздела "Сложные слова"'
            onClick={(e) => {
              e.stopPropagation();
              removeFromDifficultWords(word.word.id, word.word.word);
            }}
          >
            <img src={DeleteSVG} alt='delete icon' />
          </button>
          :
          !isDifficult &&
          <button
            type="button"
            className={`${styles['btn']} ${styles['btn_add']}`}
            title='Добавить в раздел "Сложные слова"'
            onClick={() => onDifficultWordBtnClick(word.word.id, word.word.word)}
          >
            <img src={DifficultWordSVG} alt='graduation cap' />
          </button>
      }
    </div>
  );
};

export default ControlBar;