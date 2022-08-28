import { useState, useEffect, Dispatch, SetStateAction } from "react";
import TextbookService from "../../../services/textbookService";
import WordService from "../../../services/wordService";
import { IUser, IWord } from "../../../types/types";

interface fetchWordsProps {
  id: string,
  currentPage: number,
  isAuth: boolean,
  user: IUser,
}

const useFetchWords = ({id, currentPage, isAuth, user}: fetchWordsProps):{ words: IWord[], isLoading: boolean} => {
  const [words, setWords] = useState() as [IWord[], Dispatch<SetStateAction<IWord[]>>];
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isActualFetch = true;
    const fetchWords = async () => {
      setIsLoading(true);
      const wordsArr = await TextbookService.getWords({ 
        group: (Number(id) - 1).toString(), 
        page: (currentPage - 1).toString(),
      });

      if (isAuth) {
        const diffWordsArr = await WordService.getAggregatedWords({
          userId: (user as IUser).id,
          token: (user as IUser).token,
          filter: `{"$and":[{"userWord.difficulty":"difficult"}]}`,
          group: (Number(id) - 1).toString(), 
          page: (currentPage - 1).toString(),
        });
        wordsArr.forEach((w) => {
          if (diffWordsArr.find((dw) => dw._id === w.id)) { 
            w.isDifficult = true;
          }
          else { 
            w.isDifficult = false;
          }
        })
      }

      if (isActualFetch) {
        setWords(wordsArr);
        setIsLoading(false);
      }
    }
    fetchWords();
    return () => {
      isActualFetch = false;
    }
  }, [id, currentPage]);
  return {words, isLoading};
}

export default useFetchWords;