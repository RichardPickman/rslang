import React, { Dispatch, SetStateAction, useState } from 'react';
import { IUser, IWord } from '../../../types/types';
import { useSelectWord } from '../hooks/useSelectWord';
import WordCard from '../WordCard/index';
import WordDescription from '../WordDescription';
import styles from './styles.module.scss';
import { useAppSelector } from '../../../hooks/useAppSelector';
import DictionaryActions from './dictionaryActions';

interface DictionaryProps {
  words: IWord[],
}

const Dictionary = ({ words }: DictionaryProps) => {
  const [dictWords, setDictWords] = useState(words);
  const { user } = useAppSelector((state) => state.auth);
  const [selectedWord, setSelectedWord] = useState(dictWords[0]) as [IWord | null, Dispatch<SetStateAction<IWord | null>>];
  const { context, audioWord, audioExample, audioMeaning, imageSrc, isLoading, setIsLoading } = useSelectWord({ selectedWord });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCardClick = (word: IWord) => {
    setSelectedWord(word);
    setIsLoading(true);
  }
  const addToDifficultWords = (id: string, word: string) => {
    DictionaryActions.addToDifficultWords({ id, word, user: (user as IUser), setIsProcessing, words: dictWords })
  }

  const removeFromDifficultWords = (id: string, word: string) => {
    DictionaryActions.removeFromDifficultWords({
      id,
      word,
      user: (user as IUser),
      setIsProcessing,
      words: dictWords,
      setDictWords,
      setSelectedWord,
    });
  }

  return (
    <>
      <div className={styles.dictionary}>
        <div className={styles['word-collection']}>
          {
            dictWords && dictWords.map((w) => <WordCard
              key={w.id ? w.id : w._id}
              word={w}
              onCardClick={handleCardClick}
              selected={!selectedWord ? false : w.word === (selectedWord as IWord).word}
              addToDifficultWords={addToDifficultWords}
              removeFromDifficultWords={removeFromDifficultWords}
            />)
          }
        </div>
        {!isLoading &&
          selectedWord &&
          <WordDescription
            selectedWord={selectedWord}
            context={context}
            imageSrc={imageSrc as string}
            audioWord={audioWord as AudioBuffer}
            audioMeaning={audioMeaning as AudioBuffer}
            audioExample={audioExample as AudioBuffer} />
        }
      </div>
    </>
  );
};

export default Dictionary;