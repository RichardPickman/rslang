import React from 'react';
import { DisplayedWord, IWord } from '../../../types/types';
import styles from './styles.module.scss';
import Audio from '../../../components/Audio';
import { useAppSelector } from './../../../hooks/useAppSelector';
import { Games } from '../../../data/constants';

interface WordDescriptionProps {
  selectedWord: DisplayedWord | null,
  context: AudioContext | null,
  imageSrc: string
  audioWord: AudioBuffer,
  audioMeaning: AudioBuffer,
  audioExample: AudioBuffer,
}

const WordDescription = ({
  selectedWord,
  context,
  imageSrc,
  audioWord,
  audioMeaning,
  audioExample
}: WordDescriptionProps) => {
  const { isAuth } = useAppSelector((state) => state.auth);
  if (!selectedWord) return null;
  return (
    <div className={styles['word-description']}>
      <div className={styles['img-container']}>
        <img src={imageSrc} />
      </div>
      <h4>{selectedWord.word.word}</h4>
      <p>{selectedWord.word.wordTranslate}</p>
      <p>{selectedWord.word.transcription}</p>
      <Audio buffer={audioWord} context={context} />
      <p>Значение</p>
      <p>{selectedWord.word.textMeaning}</p>
      <Audio buffer={audioMeaning} context={context} />
      <p>{selectedWord.word.textMeaningTranslate}</p>
      <p>Пример</p>
      <p>{selectedWord.word.textExample}</p>
      <Audio buffer={audioExample} context={context} />
      <p>{selectedWord.word.textExampleTranslate}</p>
      {isAuth && <>
        <p>Статистика по играм</p>
        {Games.map((game) => {
          return (<div key={game.id}>
            <p>{game.title}</p>
            {selectedWord.userWord?.optional?.statistics?.sprint.attempts ?
              <p>{selectedWord.userWord?.optional?.statistics?.sprint.guessedNum}
              /{selectedWord.userWord?.optional?.statistics?.sprint.attempts}</p> :
              <p>0/0</p>
            }
          </div>)
        })}
      </>}
    </div>
  );
};

export default WordDescription;