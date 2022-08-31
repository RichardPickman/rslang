import { IUnit, SectionEnum, UserDictNavItem } from '../types/types';

export const units: IUnit[] = [
  {
    id: '1',
    name: 'Extra easy',
    description: '',
    type: SectionEnum.UNIT,
  },
  {
    id: '2',
    name: 'Easy',
    description: '',
    type: SectionEnum.UNIT,
  },
  {
    id: '3',
    name: 'Medium',
    description: '',
    type: SectionEnum.UNIT,
  },
  {
    id: '4',
    name: 'Medium+',
    description: '',
    type: SectionEnum.UNIT,
  },
  {
    id: '5',
    name: 'Hard',
    description: '',
    type: SectionEnum.UNIT,
  },
  {
    id: '6',
    name: 'Extra Hard',
    description: '',
    type: SectionEnum.UNIT,
  }
];

export const difficultWordsUnit: IUnit = {
  id: '7',
  name: 'Сложные слова',
  description: '',
  type: SectionEnum.DIFFICULT_WORDS,
}

export const UserDictNavItems: UserDictNavItem[] = [
  {
    id: '0',
    name: 'Сложные слова',
    type: SectionEnum.DIFFICULT_WORDS,
  },
  {
    id: '1',
    name: 'Изученные слова',
    type: SectionEnum.LEARNED_WORDS,
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
    title: 'Спринт',
    description: '',
  }
]

export const gameTimer = 31000;
export const minWordsNumInSprintGame = 60;

export const diffWordsFilter = `{"$and":[{"userWord.optional.isDifficult":"true"}]}`;

export const thresholdForDiffWord = 5;
export const thresholdForSimpleWord = 3;

// export const learnedWordsFilter = `{"$and": [{"group": 0}, {"page": 0}, {"userWord.optional.isLearned": "true"}]}`;
