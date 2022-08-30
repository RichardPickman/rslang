import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useAppSelector } from "../../../hooks/useAppSelector";
import TextbookService from "../../../services/textbookService";
import WordService from "../../../services/wordService";
import { DisplayedWord, IUser, IWord } from "../../../types/types";
import { IUserWord } from './../../../types/types';

interface fetchWordsProps {
  id: string,
  currentPage: number,
  user: IUser,
}

const useFetchWords = ({ id, currentPage, user }: fetchWordsProps): { words: DisplayedWord[], isLoading: boolean } => {
  const [words, setWords] = useState() as [DisplayedWord[], Dispatch<SetStateAction<DisplayedWord[]>>];
  const [isLoading, setIsLoading] = useState(true);
  const { isAuth } = useAppSelector((state) => state.auth);
  useEffect(() => {
    let isActualFetch = true;
    const fetchWords = async () => {
      setIsLoading(true);
      const textbookWords = await TextbookService.getWords({
        group: (Number(id) - 1).toString(),
        page: (currentPage - 1).toString(),
      });
      let displayedWords: DisplayedWord[] = textbookWords.map((tx) => ({word: tx}));
      if (isAuth) {
        const userWords = await WordService.getUserWords({
          userId: (user as IUser).id,
          token: (user as IUser).token,
        });
        displayedWords = createDisplayedWords({ textbookWords, userWords });
      }

      if (isActualFetch) {
        setWords(displayedWords);
        setIsLoading(false);
      }
    }
    fetchWords();
    return () => {
      isActualFetch = false;
    }
  }, [id, currentPage]);
  return { words, isLoading };
}

const createDisplayedWords = ({ textbookWords, userWords }: { textbookWords: IWord[], userWords: IUserWord[] }): DisplayedWord[] => {
  const displayedWords = textbookWords.map((tw) => {
    const uw = userWords.find((uw) => uw.wordId === tw.id);
    if (uw) {
      return {word: tw, userWord: {wordId: uw.wordId, difficulty: uw.difficulty, optional: uw.optional}}
    }
    return {word: tw};
  });
  return displayedWords;
}

export default useFetchWords;