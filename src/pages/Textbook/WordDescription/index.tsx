import React from 'react';
import { IWord } from '../../../types/types';
import styles from './styles.module.scss';
import Audio from '../../../components/Audio';

interface WordDescriptionProps {
  selectedWord: IWord,
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
  return (
<div className={styles['word-description']}>
            <div className={styles['img-container']}>
              <img src={imageSrc} />
            </div>
            <h4>{selectedWord.word}</h4>
            <p>{selectedWord.wordTranslate}</p>
            <p>{selectedWord.transcription}</p>
            <Audio buffer={audioWord} context={context} />
            <p>Значенние</p>
            <p>{selectedWord.textMeaning}</p>
            <Audio buffer={audioMeaning} context={context} />
            <p>{selectedWord.textMeaningTranslate}</p>
            <p>Пример</p>
            <p>{selectedWord.textExample}</p>
            <Audio buffer={audioExample} context={context} />
            <p>{selectedWord.textExampleTranslate}</p>
          </div>
  );
};

export default WordDescription;