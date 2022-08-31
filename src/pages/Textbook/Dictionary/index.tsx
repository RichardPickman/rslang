import React, { Dispatch, SetStateAction, useState } from 'react';
import { DisplayedWord } from '../../../types/types';
import { useSelectWord } from '../hooks/useSelectWord';
import WordCard from '../WordCard/index';
import WordDescription from '../WordDescription';
import styles from './styles.module.scss';
import { getDictActions } from './dictionaryActions';

interface DictionaryProps {
  words: DisplayedWord[],
}

const Dictionary = ({ words }: DictionaryProps) => {
  const [dictWords, setDictWords] = useState(words);
  const [selectedWord, setSelectedWord] = useState(dictWords[0]) as [DisplayedWord | null, Dispatch<SetStateAction<DisplayedWord | null>>];
  const { context, audioWord, audioExample, audioMeaning, imageSrc, isLoading, setIsLoading } = useSelectWord({ selectedWord });
  const [isProcessing, setIsProcessing] = useState(false);
  const dictActions = getDictActions({setIsProcessing, words: dictWords, setDictWords, setSelectedWord});
  const handleCardClick = (word: DisplayedWord) => {
    setSelectedWord(word);
    console.log('handleCardClick');
    setIsLoading(true);
  }
  console.log('RENDER DICTIONARY, selectedWord', selectedWord);
  console.log('RENDER DICTIONARY, isLoading', isLoading);
  return (
    <>
      <div className={styles.dictionary}>
        <div className={styles['word-collection']}>
          {
            dictWords && dictWords.map((w) => <WordCard
              key={w.word.id}
              word={w}
              onCardClick={handleCardClick}
              selected={!selectedWord ? false : w.word.word === (selectedWord as DisplayedWord).word.word}
              dictActions={dictActions}
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
