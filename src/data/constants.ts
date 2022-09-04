import { RouteNames } from '../router';
import { IUnit, SectionEnum, UserDictNavItem } from '../types/types';

export const units: IUnit[] = [
  {
    id: '1',
    name: 'Extra easy',
    description: ``,
    type: SectionEnum.UNIT,
    wordsNum: '600',
  },
  {
    id: '2',
    name: 'Easy',
    description: '',
    type: SectionEnum.UNIT,
    wordsNum: '600',
  },
  {
    id: '3',
    name: 'Medium',
    description: '',
    type: SectionEnum.UNIT,
    wordsNum: '600',
  },
  {
    id: '4',
    name: 'Medium+',
    description: '',
    type: SectionEnum.UNIT,
    wordsNum: '600',
  },
  {
    id: '5',
    name: 'Hard',
    description: '',
    type: SectionEnum.UNIT,
    wordsNum: '600',
  },
  {
    id: '6',
    name: 'Extra Hard',
    description: '',
    type: SectionEnum.UNIT,
    wordsNum: '600',
  }
];

export const difficultWordsUnit: IUnit = {
  id: '7',
  name: 'Мои сложные слова',
  description: '',
  type: SectionEnum.DIFFICULT_WORDS,
  wordsNum: '',
}

export const UserDictNavItems: UserDictNavItem[] = [
  {
    id: '0',
    name: 'Мои сложные слова',
    type: SectionEnum.DIFFICULT_WORDS,
    route: RouteNames.DIFFICULT_WORDS,
  },
  {
    id: '1',
    name: 'Мои изученные слова',
    type: SectionEnum.LEARNED_WORDS,
    route: RouteNames.LEARNED_WORDS,
  },
];

export const unitsNum = 6;
export const wordsPerPage = 20;
export const wordsPerUnit = 600;
export const pagesNum = 30;

export const MIN_PASSWORD_LENGTH = 8;

export const pointsPerWord = 10;

export const Games = [
  {
    id: 0,
    title: 'Аудиовызов',
    description: 'Развиваем словарный запас.', 
    rules: '',
    link: `${RouteNames.GAMES}/${RouteNames.AUDIOCALL_GAME}`,
  },
  {
    id: 1,
    title: 'Спринт',
    description: 'Проверь насколько хорошо ты знаешь перевод английских слов. За ограниченный период времени тебе необходимо дать как можно больше правильных ответов.',
    rules: 'Твоя задача - определить правильность перевода английского слова.',
    link: `${RouteNames.GAMES}/${RouteNames.SPRINT_GAME}`,
  }
]

export const gameTimer = 31000;
export const minWordsNumInSprintGame = 60;

export const diffWordsFilter = `{"$and":[{"userWord.optional.isDifficult":"true"}]}`;
export const learnedWordsFilter = `{"$and":[{"userWord.optional.isLearned":"true"}]}`;

export const thresholdForDiffWord = 5;
export const thresholdForSimpleWord = 3;
