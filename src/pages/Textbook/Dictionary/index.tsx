import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { IWord } from '../../../types/types';
import { useSelectWord } from '../hooks/useSelectWord';
import WordCard from '../WordCard/index';
import WordDescription from '../WordDescription';
import styles from './styles.module.scss';

interface DictionaryProps {
  words: IWord[],
}

const Dictionary = ({ words }: DictionaryProps) => {
  const [selectedWord, setSelectedWord] = useState(words[0]) as [IWord, Dispatch<SetStateAction<IWord>>];
  // const contextRef = useRef(new AudioContext());
 const { context, audioWord, audioExample, audioMeaning, imageSrc, isLoading } = useSelectWord({ selectedWord });

  const handleCardClick = (word: IWord) => {
    setSelectedWord(word);
  }
  return (
    <>
      <div className={styles.dictionary}>
        <div className={styles['word-collection']}>
          {
            words && words.map((w) => <WordCard
              key={w.id}
              word={w}
              onCardClick={handleCardClick}
              selected={w.word === selectedWord.word}
            />)
          }
        </div>
        {!isLoading && <WordDescription
          selectedWord={selectedWord}
          context={context}
          imageSrc={imageSrc}
          audioWord={audioWord}
          audioMeaning={audioMeaning}
          audioExample={audioExample} />
        }
      </div>
    </>
  );
};

export default Dictionary;