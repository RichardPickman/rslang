import { wordsPerPage, pagesNum, minWordsNumInSprintGame } from "../../../data/constants";
import TextbookService from "../../../services/textbookService";
import WordService from "../../../services/wordService";
import { ISetWordsAction } from "../../../store/reducers/gameReducer/types";
import { GameWord, IUser, IWord } from "../../../types/types";

const randomPageNum = 7;
const randomWordsNum = randomPageNum * wordsPerPage;

interface generatorParams {
  group: string,
  amount: number,
  page?: string,
  setWordsAction: (payload: IWord[]) => ISetWordsAction,
}

interface generateRandomWordsFromPage {
  unit: string,
  page: string,
  isAuth: boolean,
  user: IUser | null,
  setWordsAction: (payload: IWord[]) => ISetWordsAction,
}

const getPromise = (group: string, page: string) => {
  return TextbookService.getWords({ group, page });
}

const randomUnique = ({ max, min, count }: { max: number, min: number, count: number }) => {
  let nums = new Set<number>();
  while (nums.size < count) {
    nums.add(Math.floor(Math.random() * (max - min + 1) + min));
  }
  return Array.from(nums);
}

export const generateRandomWordsFromPage = async ({
  unit,
  page,
  setWordsAction,
  isAuth,
  user,
}: generateRandomWordsFromPage): Promise<GameWord[]> => {
  let fetchedWords: IWord[] = [];
  let gameWords: GameWord[] = [];
  let pageNum = Number(page);

  while (gameWords.length < minWordsNumInSprintGame && pageNum >=0) {
    const textbookWords = await TextbookService.getWords({ group: unit, page: pageNum.toString() });
    if (textbookWords) {
      let portion: GameWord[] = [];
      if (isAuth && user) {
        const learnedWords = await WordService.getAggregatedWords({ 
          userId: user.id, 
          token: user.token, 
          filter: `{"$and": [{"group": ${unit}}, {"page": ${pageNum.toString()}}, {"userWord.optional.isLearned": "true"}]}`,
         });
        const withoutLearnedWords = textbookWords.filter((tw) =>!learnedWords.find((lw) => lw._id === tw.id));
        fetchedWords.push(...withoutLearnedWords);
        portion = generateRandomPairs(withoutLearnedWords, withoutLearnedWords.length);
      } else {
        fetchedWords.push(...textbookWords);
        portion = generateRandomPairs(textbookWords, textbookWords.length);
      }
      gameWords.push(...portion);
    }
    pageNum--;
  }
  setWordsAction(fetchedWords)
  console.log('gameWords', gameWords);
  return gameWords;
}

function generateRandomPairs(words: IWord[], amount: number) {
  const wordsNum = words.length > amount ? amount : words.length;
  const rightAnswersNum = Number(randomUnique({
    max: wordsNum - Math.floor(wordsNum / 4),
    min: Math.floor(wordsNum / 2),
    count: 1,
  }));
  // get random number of wrong answers
  const randomIndexesRight = randomUnique({
    max: wordsNum - 1,
    min: 0,
    count: rightAnswersNum,
  });
  const rightPairs = generateRightPairs({ words, indexes: randomIndexesRight });
  // get random indexes of wrong answers  
  const randomIndexesWrong = words.reduce((acc, curr, currInd) => {
    if (!randomIndexesRight.includes(currInd)) {
      acc.push(currInd);
    }
    return acc;
  }, ([] as number[]));
  // generate wrong pairs word-translation
  const wrongPairs = generateWrongPairs({ words, indexes: randomIndexesWrong });
  // mix right and wrong pairs
  const gameWords = [...rightPairs, ...wrongPairs].sort(() => (Math.random() > .5) ? 1 : -1);
  return gameWords;
}

export const generateRandomWords = async ({ group, page, amount, setWordsAction }: generatorParams): Promise<GameWord[]> => {
  // get words from random pages
  const randomPages = randomUnique({ max: pagesNum - 1, min: 0, count: randomPageNum });
  const promiseArr = [] as Promise<IWord[]>[];
  randomPages.forEach((page) => {
    promiseArr.push(getPromise(group, page.toString()));
  });

  const words = [] as IWord[];
  await Promise.allSettled(promiseArr)
    .then((results) => {
      results.forEach((result) => {
        if (result.status === 'fulfilled') {
          words.push(...result.value);
        }
      });
      return words;
    })
  setWordsAction(words); // set all words that were fetched  
  const wordsNum = words.length > amount ? amount : words.length;
  // get random words
  const randomIndexes = randomUnique({
    max: randomWordsNum - 1,
    min: 0,
    count: wordsNum,
  });
  // words which are displayed in the game
  const limitedRandomWords = words.filter((word, index) => randomIndexes.includes(index));
  const gameWords = generateRandomPairs(limitedRandomWords, amount)
  return gameWords;
}

export const generateRightPairs = ({ words, indexes }: { words: IWord[], indexes: number[] }): GameWord[] => {
  const rightWords = words.filter((word, index) => indexes.includes(index));
  const rightPairs = rightWords.map((word) => {
    const gameWord: GameWord = {
      id: word.id,
      word: word.word,
      translation: word.wordTranslate,
      isRight: true,
    }
    return gameWord;
  });
  return rightPairs;
}

export const generateWrongPairs = ({ words, indexes }: { words: IWord[], indexes: number[] }): GameWord[] => {
  const selected = words.filter((word, index) => indexes.includes(index));
  const wrongPairs = [];
  for (let i = 0; i < selected.length; i++) {
    const nextIndex = (i + 1) % selected.length;
    const gameWord: GameWord = {
      id: selected[i].id,
      word: selected[i].word,
      translation: selected[nextIndex].wordTranslate,
      isRight: false,
    }
    wrongPairs.push(gameWord);
  }
  return wrongPairs;
}